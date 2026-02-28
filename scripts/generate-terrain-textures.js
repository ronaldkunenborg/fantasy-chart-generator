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

function clamp01(v) {
    return Math.max(0, Math.min(1, v));
}

function lerp(a, b, t) {
    return a + ((b - a) * t);
}

function smoothstep01(t) {
    const x = clamp01(t);
    return x * x * (3 - (2 * x));
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

function fract(v) {
    return v - Math.floor(v);
}

function wrap(i, size) {
    return ((i % size) + size) % size;
}

function hash2D(ix, iy, seed) {
    let h = seed >>> 0;
    h ^= Math.imul(ix, 374761393);
    h ^= Math.imul(iy, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function rotate2D(x, y, angle) {
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    return {
        x: (x * ca) - (y * sa),
        y: (x * sa) + (y * ca)
    };
}

function valueNoisePeriodic(x, y, frequency, seed) {
    const fx = (x / SIZE) * frequency;
    const fy = (y / SIZE) * frequency;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    const tx = smoothstep01(fract(fx));
    const ty = smoothstep01(fract(fy));
    const n00 = hash2D(wrap(x0, frequency), wrap(y0, frequency), seed);
    const n10 = hash2D(wrap(x1, frequency), wrap(y0, frequency), seed);
    const n01 = hash2D(wrap(x0, frequency), wrap(y1, frequency), seed);
    const n11 = hash2D(wrap(x1, frequency), wrap(y1, frequency), seed);
    const nx0 = lerp(n00, n10, tx);
    const nx1 = lerp(n01, n11, tx);
    return lerp(nx0, nx1, ty);
}

function fbmPeriodic(x, y, seed, baseFrequency, octaves, lacunarity, gain) {
    let sum = 0;
    let amp = 1;
    let freq = baseFrequency;
    let ampSum = 0;
    for (let i = 0; i < octaves; i += 1) {
        const freqInt = Math.max(1, Math.round(freq));
        sum += valueNoisePeriodic(x, y, freqInt, seed + (i * 1013)) * amp;
        ampSum += amp;
        amp *= gain;
        freq *= lacunarity;
    }
    return sum / ampSum;
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

function getBiomeStyle(biome) {
    switch (biome) {
        case "desert":
            return { macroFreq: 4, microFreq: 20, ridgeFreq: 10, contrast: 30, feature: "dunes" };
        case "shrubland":
            return { macroFreq: 5, microFreq: 18, ridgeFreq: 9, contrast: 22, feature: "scrub" };
        case "grassland":
            return { macroFreq: 6, microFreq: 20, ridgeFreq: 8, contrast: 18, feature: "grass" };
        case "plains":
            return { macroFreq: 5, microFreq: 16, ridgeFreq: 7, contrast: 16, feature: "plains" };
        case "temperate_forest":
            return { macroFreq: 7, microFreq: 24, ridgeFreq: 10, contrast: 28, feature: "canopy" };
        case "forest":
            return { macroFreq: 8, microFreq: 24, ridgeFreq: 11, contrast: 30, feature: "canopy_dense" };
        case "rainforest":
            return { macroFreq: 9, microFreq: 26, ridgeFreq: 12, contrast: 34, feature: "jungle" };
        case "taiga":
            return { macroFreq: 7, microFreq: 22, ridgeFreq: 13, contrast: 26, feature: "needles" };
        case "tundra":
            return { macroFreq: 5, microFreq: 19, ridgeFreq: 14, contrast: 24, feature: "frost" };
        case "mountain":
            return { macroFreq: 6, microFreq: 24, ridgeFreq: 16, contrast: 38, feature: "rock" };
        case "alpine":
            return { macroFreq: 7, microFreq: 25, ridgeFreq: 17, contrast: 36, feature: "rock_snow" };
        case "alpine_tundra":
            return { macroFreq: 6, microFreq: 21, ridgeFreq: 15, contrast: 30, feature: "frost_rock" };
        case "snow":
            return { macroFreq: 4, microFreq: 18, ridgeFreq: 12, contrast: 14, feature: "snow" };
        default:
            return { macroFreq: 6, microFreq: 20, ridgeFreq: 10, contrast: 20, feature: "generic" };
    }
}

function writeTexturePng(filePath, biome, tempBand, moistureBand) {
    const base = BASE_COLORS[biome] || [128, 128, 128];
    const [cr, cg, cb] = adjustForClimate(base, tempBand, moistureBand);
    const png = new PNG({ width: SIZE, height: SIZE });
    const biomeSeed = xfnv1a(`${biome}|${tempBand}|${moistureBand}`);
    const rand = mulberry32(biomeSeed);
    const style = getBiomeStyle(biome);
    const orientation = rand() * Math.PI;
    const moistureInfluence = moistureBand === "wet" ? 1 : (moistureBand === "dry" ? -1 : 0);
    const tempInfluence = tempBand === "hot" ? 1 : (tempBand === "cold" ? -1 : 0);

    for (let y = 0; y < SIZE; y += 1) {
        for (let x = 0; x < SIZE; x += 1) {
            const idx = (SIZE * y + x) << 2;

            const p = rotate2D(x + 0.5, y + 0.5, orientation);
            const macro = fbmPeriodic(p.x, p.y, biomeSeed + 11, style.macroFreq, 4, 2.0, 0.52);
            const micro = fbmPeriodic(p.x + 17, p.y - 9, biomeSeed + 97, style.microFreq, 3, 2.0, 0.48);
            const ridgeSource = fbmPeriodic(p.x - 13, p.y + 21, biomeSeed + 211, style.ridgeFreq, 3, 2.0, 0.55);
            const ridge = 1 - Math.abs((ridgeSource * 2) - 1);
            const grain = (hash2D(x, y, biomeSeed + 509) * 2) - 1;

            let shade = ((macro - 0.5) * style.contrast) + ((micro - 0.5) * (style.contrast * 0.5));
            let tintR = 0;
            let tintG = 0;
            let tintB = 0;

            switch (style.feature) {
                case "dunes": {
                    const duneWave = Math.sin(((p.x / SIZE) * 2 * Math.PI * 7) + ((macro - 0.5) * 2.4));
                    shade += duneWave * 15;
                    shade += (ridge - 0.5) * 10;
                    tintR += 6;
                    tintG += 2;
                    tintB -= 4;
                    break;
                }
                case "scrub":
                case "grass":
                case "plains": {
                    shade += (ridge - 0.5) * 9;
                    if (hash2D(x, y, biomeSeed + 701) > 0.985) {
                        shade -= 24;
                    }
                    tintG += style.feature === "grass" ? 6 : 2;
                    break;
                }
                case "canopy":
                case "canopy_dense":
                case "jungle": {
                    const canopy = fbmPeriodic(p.x, p.y, biomeSeed + 313, 9, 3, 2.1, 0.55);
                    shade += (canopy - 0.5) * (style.feature === "jungle" ? 38 : 30);
                    const gapCutoff = style.feature === "canopy_dense" ? 0.985 : 0.975;
                    if (hash2D(x, y, biomeSeed + 907) > gapCutoff) {
                        shade -= 30;
                    }
                    tintG += style.feature === "jungle" ? 8 : 5;
                    tintB += style.feature === "jungle" ? 2 : 0;
                    break;
                }
                case "needles": {
                    const needleBands = Math.sin(((p.y / SIZE) * 2 * Math.PI * 9) + ((micro - 0.5) * 4));
                    shade += needleBands * 8;
                    shade += (ridge - 0.5) * 12;
                    tintB += 5;
                    break;
                }
                case "frost":
                case "frost_rock": {
                    shade += (ridge - 0.5) * 20;
                    const frost = smoothstep01(ridge);
                    tintB += 8 + (frost * 14);
                    tintR -= 3;
                    tintG -= 1;
                    if (style.feature === "frost_rock") {
                        shade += (macro - 0.5) * 10;
                    }
                    break;
                }
                case "rock":
                case "rock_snow": {
                    const strata = Math.sin(((p.x / SIZE) * 2 * Math.PI * 11) + ((ridge - 0.5) * 3.5));
                    shade += strata * 13;
                    shade += (ridge - 0.5) * 24;
                    if (style.feature === "rock_snow" && ridge > 0.72) {
                        tintR += 10;
                        tintG += 10;
                        tintB += 12;
                        shade += 8;
                    }
                    break;
                }
                case "snow": {
                    const drift = Math.sin(((p.x / SIZE) * 2 * Math.PI * 6) + ((macro - 0.5) * 3.2));
                    shade += drift * 8;
                    shade += (ridge - 0.5) * 6;
                    tintB += 10;
                    break;
                }
                default:
                    shade += (ridge - 0.5) * 8;
            }

            shade += grain * 6;
            shade += moistureInfluence * 3;
            shade -= tempInfluence * 2;

            const r = cr + shade + tintR;
            const g = cg + shade + tintG;
            const b = cb + shade + tintB;

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
