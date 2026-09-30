import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// The header and favicon use this same mark. Embed it into the share card so
// the exported PNG retains the outline without depending on external assets.
const mark = (await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8'))
  .replace('<svg ', '<svg x="76" y="70" width="76" height="76" ')
  .trim();
const cardFile = new URL('../public/social-card.svg', import.meta.url);
const card = (await readFile(cardFile, 'utf8')).replace(
  /<!-- brand-mark:start -->[\s\S]*?<!-- brand-mark:end -->/,
  `<!-- brand-mark:start -->\n  ${mark}\n  <!-- brand-mark:end -->`,
);
await writeFile(cardFile, card);
await sharp(Buffer.from(card)).png().toFile(fileURLToPath(new URL('../public/social-card.png', import.meta.url)));
