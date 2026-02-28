# Fantasy Map Generator

This project is a browser-based fantasy map generator built with D3.js.
The page renders a procedural world map and combines biome logic, climate bands, and texture tiles to visualize terrain for worldbuilding and game design.

## Intention

The main goal of this page is to generate and explore a stylized fantasy world map by:

- generating terrain/noise-based map data in the browser,
- assigning biome and climate characteristics,
- painting biome texture tiles from a prepared texture set,
- presenting an interactive visual output in a single HTML page.

## Project Structure

### Core app files

- `d3-fantasychart.html`: Main application page with D3 logic and map generation flow.
- `d3-fantasychart.css`: Styling for layout, controls, and logo panel.

### Included scripts

- `include/perlin.js`: Perlin/noise utility used by map generation.
- `include/world-terrain-ranges.js`: Terrain and world range/config definitions.

### Visual/audio assets

- `textures/`: Generated biome texture PNG files used at runtime.
- `images/fantasymapgeneratorlogo.png`: Logo used in the UI.
- `music/1428973_Magical-Forest.mp3`: Background music asset.

### Build/helper scripts

- `scripts/generate-terrain-textures.js`: Generates/updates texture tiles in `textures/`.
- `package.json`: Node package config and scripts.

### Archived/unused files

- `unused/`: Files currently not used by the active app, kept for reference.

### Project metadata

- `AGENTS.md`: Local agent/project instructions.
- `.gitignore`: Git ignore rules.
- `fantasymapgenerator.code-workspace`: VS Code workspace file.

## Run / Work On The Project

1. Install dependencies:

```bash
npm install
```

2. Open `d3-fantasychart.html` in a browser.

3. Optional: regenerate terrain textures:

```bash
npm run generate:textures
```

