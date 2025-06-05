const { mkdirSync, existsSync, writeFileSync } = require("fs");
const sharp = require("sharp");
const toICO = require("to-ico");
const { manifest } = require("./manifest.js");

const DIMENSIONS = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];
const MASKABLE_DIMENSIONS = [192, 512];

async function GenerateFavicon(source_path, dest_path) {
  try {
    const buffer = await sharp(source_path).resize(16).png().toBuffer();
    const ico_buffer = await toICO(buffer);
    writeFileSync(dest_path, ico_buffer);
  } catch (error) {
    console.error(`Error generating favicon: ${error.message}`);
    throw error;
  }
}

async function GenerateIcon(source_path, dimension, output_path) {
  try {
    await sharp(source_path)
      .resize(dimension, dimension)
      .png()
      .toFile(output_path);
  } catch (error) {
    console.error(`Error generating icon ${dimension}x${dimension}: ${error.message}`);
    throw error;
  }
}

async function GenerateMaskableIcon(source_path, dimension, output_path) {
  try {
    // สร้าง maskable icon โดยเพิ่ม padding 20% เพื่อให้เหมาะกับการ mask
    const padding = Math.floor(dimension * 0.2);
    const icon_size = dimension - (padding * 2);
    
    await sharp({
      create: {
        width: dimension,
        height: dimension,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([{
      input: await sharp(source_path)
        .resize(icon_size, icon_size)
        .png()
        .toBuffer(),
      top: padding,
      left: padding
    }])
    .png()
    .toFile(output_path);
  } catch (error) {
    console.error(`Error generating maskable icon ${dimension}x${dimension}: ${error.message}`);
    throw error;
  }
}

(async () => {
  try {
    // สร้างโฟลเดอร์ icons หากไม่มี
    if (!existsSync("icons")) {
      mkdirSync("icons");
    }

    console.log("Generating favicon...");
    await GenerateFavicon("favicon.svg", "icons/favicon.ico");

    console.log("Generating regular icons...");
    const icon_promises = DIMENSIONS.map(async (dimension) => {
      const output_path = `icons/icon-${dimension}x${dimension}.png`;
      await GenerateIcon("favicon.svg", dimension, output_path);
      console.log(`Generated: ${output_path}`);
    });

    console.log("Generating maskable icons...");
    const maskable_promises = MASKABLE_DIMENSIONS.map(async (dimension) => {
      const output_path = `icons/maskable-icon-${dimension}x${dimension}.png`;
      await GenerateMaskableIcon("favicon.svg", dimension, output_path);
      console.log(`Generated: ${output_path}`);
    });

    // รอให้ทุก icon สร้างเสร็จ
    await Promise.all([...icon_promises, ...maskable_promises]);

    // สร้าง manifest.json
    writeFileSync("icons/manifest.json", JSON.stringify(manifest, null, 2));
    console.log("Generated: icons/manifest.json");
    
    console.log("All icons generated successfully!");

  } catch (error) {
    console.error(`Fatal error: ${error.message}`);
    process.exit(1);
  }
})();