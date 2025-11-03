/*
  Render high-fidelity transparent PNG favicons from the original SVG using
  headless Chromium (Puppeteer), rasterized at higher scale and downsampled
  with Lanczos to preserve detail, color, and edges.
*/
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execFileSync } = require('child_process');

async function renderFavicons() {
  const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024, 2048];
  const root = path.join(__dirname, '..');
  const svgPath = path.join(root, 'public', 'favicon.svg');
  const outDir = path.join(root, 'public', 'favicons');

  if (!fs.existsSync(svgPath)) {
    console.error(`SVG not found at ${svgPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const originalSvg = fs.readFileSync(svgPath, 'utf8');

  // Lazily import puppeteer so this file can be required without dev dep installed
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const background = 'transparent'; // render with transparency
  for (const size of sizes) {
    // Use ultra-high render scale for premium quality
    const renderScale = size <= 16 ? 16 : size <= 32 ? 12 : size <= 64 ? 8 : size <= 256 ? 6 : 4;
    const sizedSvg = ensureSvgSize(stripBackground(originalSvg), size, size);
    await page.setViewport({ width: size, height: size, deviceScaleFactor: renderScale });

    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            html, body { margin:0; padding:0; background: transparent; }
            #wrap { width:${size}px; height:${size}px; display:flex; align-items:center; justify-content:center; }
            svg { display:block; }
          </style>
        </head>
        <body>
          <div id="wrap">${sizedSvg}</div>
        </body>
      </html>`;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    // Capture full-resolution buffer, then Lanczos downscale to exact size
    const buffer = await page.screenshot({
      type: 'png',
      omitBackground: true
    });
    const outPath = path.join(outDir, `favicon-${size}.png`);
    let pipeline = sharp(buffer)
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
      .resize(size, size, {
        fit: 'contain',
        kernel: sharp.kernel.lanczos3,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });
    // Aggressive sharpening for ultra-crisp output at all sizes
    if (size <= 48) {
      pipeline = pipeline.sharpen(1.2);
    } else if (size <= 128) {
      pipeline = pipeline.sharpen(0.8);
    } else if (size <= 512) {
      pipeline = pipeline.sharpen(0.4);
    } else {
      pipeline = pipeline.sharpen(0.2);
    }
    await pipeline.toFile(outPath);
    // Ensure PNG32 (TrueColor + Alpha) encoding to avoid palette/banding at tiny sizes
    try {
      const magick = fs.existsSync('/opt/homebrew/bin/magick') ? '/opt/homebrew/bin/magick' : 'magick';
      execFileSync(magick, [outPath, '-define', 'png:color-type=6', `PNG32:${outPath}`], { stdio: 'ignore' });
    } catch (_) {
      // If ImageMagick is unavailable, keep sharp output
    }
    console.log(`Wrote ${outPath}`);
  }

  await browser.close();
}

function ensureSvgSize(svg, width, height) {
  // Insert or replace width/height attributes on the root <svg> element
  return svg.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
    let a = attrs
      .replace(/\swidth="[^"]*"/i, '')
      .replace(/\sheight="[^"]*"/i, '')
      .trim();
    a = a.length ? ' ' + a : '';
    return `<svg width="${width}" height="${height}"${a}>`;
  });
}

function stripBackground(svg) {
  // Don't strip anything - render the full SVG with all gradients, gloss, and effects
  // We only want transparent background, not to remove visual elements
  return svg;
}

renderFavicons().catch((err) => {
  console.error(err);
  process.exit(1);
});
