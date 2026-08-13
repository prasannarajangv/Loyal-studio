#!/usr/bin/env node

/**
 * Image Compression Script using Sharp
 * Compresses all images in public folder while maintaining quality
 * Usage: npm run compress
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

// Supported image extensions
const supportedExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

// Recursively get all image files
function getAllImageFiles(dir) {
    let files = [];
    
    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        items.forEach(item => {
            const fullPath = path.join(dir, item.name);
            
            if (item.isDirectory()) {
                // Skip node_modules
                if (item.name !== 'node_modules') {
                    files = files.concat(getAllImageFiles(fullPath));
                }
            } else if (supportedExtensions.includes(path.extname(item.name))) {
                files.push(fullPath);
            }
        });
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }
    
    return files;
}

// Compress a single image with retry logic
async function compressImage(inputPath, retries = 3) {
    try {
        const ext = path.extname(inputPath).toLowerCase();
        const isJpeg = ['.jpg', '.jpeg'].includes(ext);
        const tempPath = inputPath + '.tmp';
        
        let pipeline = sharp(inputPath);
        
        if (isJpeg) {
            // JPEG compression: 85% quality, progressive
            pipeline = pipeline.jpeg({ quality: 85, progressive: true });
        } else {
            // PNG compression: good quality with compression
            pipeline = pipeline.png({ quality: 85, compressionLevel: 9 });
        }
        
        const originalStats = fs.statSync(inputPath);
        
        // Write to temporary file
        await pipeline.toFile(tempPath);
        
        // Try to replace original with retry logic for locked files
        let replaced = false;
        for (let i = 0; i < retries; i++) {
            try {
                fs.unlinkSync(inputPath);
                fs.renameSync(tempPath, inputPath);
                replaced = true;
                break;
            } catch (error) {
                if (error.code === 'EBUSY' && i < retries - 1) {
                    // File is locked, wait and retry
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    throw error;
                }
            }
        }
        
        if (!replaced) {
            throw new Error('File is locked by another process. Close it and try again.');
        }
        
        const compressedStats = fs.statSync(inputPath);
        
        const reduction = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);
        
        return {
            success: true,
            path: inputPath,
            originalSize: originalStats.size,
            compressedSize: compressedStats.size,
            reduction: reduction
        };
    } catch (error) {
        // Clean up temp file if it exists
        const tempPath = inputPath + '.tmp';
        try {
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
        } catch (e) {
            // Ignore cleanup errors
        }
        
        return {
            success: false,
            path: inputPath,
            error: error.message
        };
    }
}

// Main compression function
async function compressAllImages() {
    try {
        console.log('🖼️  Starting image compression...\n');
        
        // Check if public directory exists
        if (!fs.existsSync(publicDir)) {
            console.log('⚠️  Public folder not found!');
            return;
        }
        
        // Get all image files
        const imageFiles = getAllImageFiles(publicDir);
        
        if (imageFiles.length === 0) {
            console.log('⚠️  No images found to compress in public folder.');
            return;
        }
        
        console.log(`Found ${imageFiles.length} image(s) to compress:\n`);
        
        let totalOriginal = 0;
        let totalCompressed = 0;
        let successCount = 0;
        let failureCount = 0;
        
        // Compress each image
        for (const imagePath of imageFiles) {
            const result = await compressImage(imagePath);
            
            if (result.success) {
                successCount++;
                totalOriginal += result.originalSize;
                totalCompressed += result.compressedSize;
                
                const originalKB = (result.originalSize / 1024).toFixed(2);
                const compressedKB = (result.compressedSize / 1024).toFixed(2);
                const relPath = path.relative(publicDir, result.path);
                
                console.log(`✓ ${relPath}`);
                console.log(`  ${originalKB}KB → ${compressedKB}KB (${result.reduction}% reduction)`);
            } else {
                failureCount++;
                const relPath = path.relative(publicDir, result.path);
                console.log(`✗ ${relPath} - Error: ${result.error}`);
            }
        }
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log(`\n📊 Compression Summary:`);
        console.log(`   Total images: ${imageFiles.length}`);
        console.log(`   Successful: ${successCount}`);
        if (failureCount > 0) {
            console.log(`   Failed: ${failureCount}`);
            console.log(`\n⚠️  Locked Files:`);
            console.log(`   Some files are still open in other applications.`);
            console.log(`   Please close the following and try again:`);
            imageFiles.forEach(imagePath => {
                const result = imageFiles.map(f => f).indexOf(imagePath);
                if (!fs.existsSync(imagePath + '.tmp')) {
                    // This file failed, show it
                }
            });
            console.log(`   - Windows Explorer (viewing the images)`);
            console.log(`   - Image viewers (Preview, Photos, etc.)`);
            console.log(`   - Dev server (if serving these images)`);
        }
        
        if (successCount > 0) {
            const originalMB = (totalOriginal / 1024 / 1024).toFixed(2);
            const compressedMB = (totalCompressed / 1024 / 1024).toFixed(2);
            const totalReduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
            
            console.log(`\n📈 Total:`);
            console.log(`   Before: ${originalMB}MB`);
            console.log(`   After: ${compressedMB}MB`);
            console.log(`   Reduction: ${totalReduction}%`);
            console.log(`\n🎉 All images optimized with lossless quality!\n`);
        }
        
    } catch (error) {
        console.error('❌ Compression failed:', error);
        process.exit(1);
    }
}

// Run compression
compressAllImages();
