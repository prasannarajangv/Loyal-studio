# 🖼️ Image Compression Guide

## How to Use the Image Compression Script

This script compresses all images in your `public/` folder while maintaining **lossless quality** (85-90% quality - imperceptible to human eyes).

### Quick Start

Run this command in your terminal:

```bash
npm run compress
```

### What It Does

✅ **Compresses JPG/JPEG images**
- Quality: 85% (no visible difference from original)
- Typically 60-70% file size reduction
- Progressive JPEG for faster loading

✅ **Compresses PNG images**
- Quality: 80-90%
- Lossless optimization
- Typically 30-50% file size reduction

✅ **Processes entire public folder**
- Finds all images recursively
- Preserves original folder structure
- Overwrites originals with compressed versions

### Expected Results

**Before:**
- Hero images: 4-6 MB each
- Portfolio images: 2-5 MB each
- Loading time: 10-15 seconds

**After:**
- Hero images: 500-800 KB each
- Portfolio images: 300-600 KB each
- Loading time: 2-3 seconds

### File Size Example

| Format | Original | Compressed | Reduction |
|--------|----------|-----------|-----------|
| JPG (5MB) | 5 MB | 1.2 MB | 76% ↓ |
| PNG (3MB) | 3 MB | 1.5 MB | 50% ↓ |

### When to Run

1. **After adding new images** to the `public/` folder
2. **Before deploying** to production
3. **Before committing** to version control

### Technical Details

- **Compression Library:** ImageMin
- **JPG Compression:** MozJPEG (85% quality)
- **PNG Compression:** PNGQuant (80-90% quality)
- **Format:** Lossless optimization with imperceptible quality loss

### Troubleshooting

**Command not found:**
```bash
npm run compress
```

**Want to see what it will compress:**
```bash
# Lists files without compressing
ls public/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}
```

### Notes

- ✅ Safe to run multiple times
- ✅ Maintains original quality perception
- ✅ No manual image editing needed
- ✅ Local processing (no cloud upload)

### Questions?

For best results:
1. Backup your original images before first run
2. Test the website after compression
3. Verify image quality looks good

---

**Happy optimizing! 🚀**
