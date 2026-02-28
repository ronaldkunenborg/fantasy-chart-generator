#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const OUTPUT_DIR = path.resolve(process.cwd(), "textures");
const SIZE = 64;

const BIOMES = [
    "desert",
    "shrubland",
    "grassland",
    "plains",
    "temperate_forest",
    "forest",
    "rainforest",
    "taiga",
    "tundra",
    "mountain",
    "alpine",
    "alpine_tundra",
    "snow"
];

const TEMP_BANDS = ["cold", "temperate", "hot"];
const MOIST_BANDS = ["dry", "normal", "wet"];

const BASE_COLORS = {
    desert: [204, 182, 120],
    shrubland: [142, 160, 104],
    grassland: [107, 157, 72],
    plains: [151, 173, 105],
    temperate_forest: [74, 120, 82],
    forest: [66, 112, 78],
    rainforest: [44, 96, 64],
    taiga: [98, 123, 100],
    tundra: [145, 150, 132],
    mountain: [144, 142, 136],
    alpine: [173, 172, 165],
    alpine_tundra: [162, 164, 154],
    snow: [237, 240, 243]
};

function clamp255(v) {
    return Math.max(0, Math.min(255, Math.round(v)));
}

function xfnv1a(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i += 1) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function mulberry32(seed) {
    return function rand() {
        let t = (seed += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function adjustForClimate(base, tempBand, moistureBand) {
    let [r, g, b] = base;

    if (tempBand === "cold") {
        r -= 14; g -= 10; b += 14;
    } else if (tempBand === "hot") {
        r += 12; g += 4; b -= 12;
    }

    if (moistureBand === "dry") {
        r += 8; g -= 8; b -= 8;
    } else if (moistureBand === "wet") {
        r -= 10; g += 12; b += 2;
    }

    return [clamp255(r), clamp255(g), clamp255(b)];
}

function writeTexturePng(filePath, biome, tempBand, moistureBand) {
    const base = BASE_COLORS[biome] || [128, 128, 128];
    const [cr, cg, cb] = adjustForClimate(base, tempBand, moistureBand);
    const png = new PNG({ width: SIZE, height: SIZE });
    const rand = mulberry32(xfnv1a(`${biome}|${tempBand}|${moistureBand}`));

    for (let y = 0; y < SIZE; y += 1) {
        for (let x = 0; x < SIZE; x += 1) {
            const idx = (SIZE * y + x) << 2;

            // Layered grain so the tile has repeatable material feel.
            const n1 = (rand() * 2 - 1) * 14;
            const n2 = (rand() * 2 - 1) * 9;
            const dist = ((x - SIZE / 2) ** 2 + (y - SIZE / 2) ** 2) / (SIZE * SIZE);
            const vignette = 1 - (dist * 0.12);

            let r = (cr + n1 + n2) * vignette;
            let g = (cg + n1 + (n2 * 0.6)) * vignette;
            let b = (cb + n1 + (n2 * 0.35)) * vignette;

            // Sparse pebbles/crust patches.
            if (rand() < 0.03) {
                const delta = rand() < 0.5 ? -28 : 24;
                r += delta; g += delta; b += delta;
            }

            png.data[idx] = clamp255(r);
            png.data[idx + 1] = clamp255(g);
            png.data[idx + 2] = clamp255(b);
            png.data[idx + 3] = 255;
        }
    }

    fs.writeFileSync(filePath, PNG.sync.write(png));
}

function main() {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    let count = 0;

    for (const biome of BIOMES) {
        for (const tempBand of TEMP_BANDS) {
            for (const moistureBand of MOIST_BANDS) {
                const filename = `${biome}_${tempBand}_${moistureBand}.png`;
                const filePath = path.join(OUTPUT_DIR, filename);
                writeTexturePng(filePath, biome, tempBand, moistureBand);
                count += 1;
            }
        }
    }

    console.log(`Generated ${count} textures in ${OUTPUT_DIR}`);
}

main();
