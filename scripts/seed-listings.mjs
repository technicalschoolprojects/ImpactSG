import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const outputPath = fileURLToPath(new URL("../src/data/listings.json", import.meta.url));

// Assumption: placehold.co is an acceptable placeholder-image service for this demo.
const listings = JSON.parse(await readFile(outputPath, "utf8"));

if (!Array.isArray(listings) || listings.length !== 24) {
  throw new Error("The catalog must contain exactly 24 seed listings.");
}

await writeFile(outputPath, `${JSON.stringify(listings, null, 2)}\n`);
console.log(`Seeded ${listings.length} listings.`);
