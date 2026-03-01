## Project rules
- All explicit project rules from the user must be added to AGENTS.md by Codex.
- Water classification rule: low-elevation water is `ocean/sea` only when connected to the map edge; otherwise it must be treated as an inland `lake`.
- Sea and ocean tiles should become ice at sufficiently low temperatures.
- Rivers should be rendered as an overlay/add-on on top of terrain tiles, not as full-tile terrain replacement.
- River metadata must include both presence and orientation so rendering can be applied afterward.
- Per tile there should be only one river path, connecting downstream until sea or a local uphill-locked basin.
- River metadata should include flow weight/thickness based on tributary joins and downhill water volume.
- River generation should start from eligible mountain headwaters and follow downhill paths toward sea or inland basins.
- Alternate path preview mode: pick highest mountain spots and draw blue traced lines from each peak to the nearest map edge, continuing to the map boundary regardless of water/terrain.

## Git commit message format
- Always use real newlines in commit bodies.
- Never include literal `\n` in commit messages.
- Use multiple `-m` flags for multiline commits.
