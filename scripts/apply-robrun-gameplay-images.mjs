import fs from 'node:fs';

const images = [
  [
    '/images/blog/robrun-esp-boxes.webp',
    'ROB RUN ESP boxes, skeleton outlines, hero nameplates and aimbot FOV circle on a city street',
  ],
  [
    '/images/blog/robrun-radar-esp.webp',
    'Rob Run cheat radar overlay with green 3D ESP box and enemy status icons on Infernus',
  ],
  [
    '/images/blog/robrun-chams-esp.webp',
    'ROB RUN green chams ESP with health percent and distance tag on an enemy hero',
  ],
  [
    '/images/blog/robrun-aimbot-combat.webp',
    'ROB RUN aimbot reticle locked on ESP-highlighted enemies with skeleton overlays in combat',
  ],
  [
    '/images/blog/robrun-aimbot-stairs.webp',
    'ROB RUN green ESP box and cyan chams with circular aimbot FOV on stairs',
  ],
  [
    '/images/blog/robrun-wallhack-courtyard.webp',
    'ROB RUN wallhack ESP showing red player & NPC outlines and nameplates through courtyard walls',
  ],
  [
    '/images/blog/robrun-box-esp-indoor.webp',
    'ROB RUN green box ESP and chams highlighting Abrams through an indoor wooden structure',
  ],
  [
    '/images/blog/robrun-esp-uptown.webp',
    'ROB RUN red and green ESP boxes with skeleton wallhack in the Uptown courtyard',
  ],
  [
    '/images/blog/robrun-esp-cinema.webp',
    'ROB RUN ESP boxes and skeleton wallhack near the Cinema sign with aimbot FOV circle',
  ],
];

const altBySrc = Object.fromEntries(images);

function cycleBlogImages(file, quote = '"') {
  let text = fs.readFileSync(file, 'utf8');
  let i = 0;
  const imageRe = new RegExp(`image:\\s*${quote}(/images/blog/[^${quote}]+)${quote}`, 'g');
  text = text.replace(imageRe, () => {
    const [img] = images[i % images.length];
    i += 1;
    return `image: ${quote}${img}${quote}`;
  });

  text = text.replace(
    /image:\s*"([^"]+)"\s*,\s*\n(\s*)imageAlt:\s*"[^"]*"/g,
    (_full, img, sp) => {
      const alt = altBySrc[img] ?? 'Rob Run cheat gameplay screenshot with ESP and aim overlays';
      return `image: "${img}",\n${sp}imageAlt: "${alt}"`;
    },
  );

  fs.writeFileSync(file, text);
  console.log(`${file}: cycled ${i} image refs`);
}

cycleBlogImages('src/data/blog/posts.ts', '"');
cycleBlogImages('src/i18n/en.ts', "'");
