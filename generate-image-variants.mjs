#!/usr/bin/env node

/**
 * Generates responsive width tiers (webp) for every master photo in
 * image-sources/, writing them into public/<category>/ under the
 * `{basename}-{width}w.webp` naming convention. Run automatically via the
 * predev/prebuild npm scripts; safe to re-run any time (always regenerates
 * fresh from the untouched masters, never reads its own output).
 *
 * Usage: node generate-image-variants.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcesDir = path.join(__dirname, 'image-sources');
const publicDir = path.join(__dirname, 'public');

// Maps each master (without extension) to the public/ subfolder it belongs
// in. Empty string means the root of public/.
const DESTINATIONS = {
    'wedding-1': 'wedding',
    'wedding-2': 'wedding',
    'candid-1': 'candid',
    'candid-2': 'candid',
    'baby-1': 'baby shoot',
    'baby-2': 'baby shoot',
    'model-1': 'Model shoot',
    'model-2': 'Model shoot',
    'commercial-1': 'commercial',
    'commercial-2': 'commercial',
    'IMG_E8926': '',
};

const TIERS = [
    { width: 480, quality: 78 },
    { width: 800, quality: 78 },
    { width: 1200, quality: 80 },
    { width: 1920, quality: 80 },
    { width: 2400, quality: 82 },
];

async function generateVariant(inputPath, outputPath, width, quality) {
    await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toFile(outputPath);
    return fs.statSync(outputPath).size;
}

async function run() {
    if (!fs.existsSync(sourcesDir)) {
        console.log('⚠️  image-sources/ folder not found — nothing to generate.');
        return;
    }

    console.log('🖼️  Generating responsive image variants...\n');

    let totalBytes = 0;
    let totalFiles = 0;

    for (const [basename, destSubdir] of Object.entries(DESTINATIONS)) {
        const inputPath = path.join(sourcesDir, `${basename}.webp`);
        if (!fs.existsSync(inputPath)) {
            console.log(`✗ Missing source: ${basename}.webp — skipping`);
            continue;
        }

        const destDir = path.join(publicDir, destSubdir);
        fs.mkdirSync(destDir, { recursive: true });

        const sizes = [];
        for (const { width, quality } of TIERS) {
            const outputPath = path.join(destDir, `${basename}-${width}w.webp`);
            const bytes = await generateVariant(inputPath, outputPath, width, quality);
            sizes.push(`${width}w: ${(bytes / 1024).toFixed(0)}KB`);
            totalBytes += bytes;
            totalFiles += 1;
        }

        console.log(`✓ ${basename} → ${sizes.join(', ')}`);
    }

    console.log(`\n📊 Generated ${totalFiles} files, ${(totalBytes / 1024 / 1024).toFixed(2)}MB total.\n`);
}

run().catch((error) => {
    console.error('❌ Image variant generation failed:', error);
    process.exit(1);
});
