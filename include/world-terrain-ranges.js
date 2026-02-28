// Shared world terrain/biome reference ranges for d3-fantasychart.
// Loaded before d3-fantasychart inline script.

        window.WORLD_TERRAIN_RANGES = [
            // Marine
            {
                terrainType: "abyssal_ocean",
                elevationMeters: [-11000, -4000],
                elevationNorm: [0.00, 0.22],
                moistureNorm: [0.95, 1.00],
                temperatureC: [-1, 4]
            },
            {
                terrainType: "deep_ocean",
                elevationMeters: [-4000, -200],
                elevationNorm: [0.12, 0.34],
                moistureNorm: [0.90, 1.00],
                temperatureC: [-1, 25]
            },
            {
                terrainType: "continental_shelf",
                elevationMeters: [-200, 0],
                elevationNorm: [0.30, 0.38],
                moistureNorm: [0.85, 1.00],
                temperatureC: [-2, 30]
            },
            {
                terrainType: "coastal_water",
                elevationMeters: [-50, 5],
                elevationNorm: [0.36, 0.40],
                moistureNorm: [0.80, 1.00],
                temperatureC: [-2, 32]
            },

            // Coastal lowlands
            {
                terrainType: "beach",
                elevationMeters: [0, 50],
                elevationNorm: [0.39, 0.43],
                moistureNorm: [0.20, 0.95],
                temperatureC: [-5, 45]
            },
            {
                terrainType: "dunes",
                elevationMeters: [0, 300],
                elevationNorm: [0.41, 0.48],
                moistureNorm: [0.02, 0.20],
                precipitationMmYear: [0, 250],
                temperatureC: [10, 50]
            },
            {
                terrainType: "salt_marsh",
                elevationMeters: [0, 20],
                elevationNorm: [0.39, 0.42],
                moistureNorm: [0.75, 1.00],
                precipitationMmYear: [400, 2000],
                temperatureC: [-5, 35]
            },
            {
                terrainType: "delta_floodplain",
                elevationMeters: [0, 200],
                elevationNorm: [0.41, 0.50],
                moistureNorm: [0.65, 1.00],
                precipitationMmYear: [500, 3000],
                temperatureC: [0, 35]
            },
            {
                terrainType: "mangrove_coast",
                elevationMeters: [0, 30],
                elevationNorm: [0.39, 0.43],
                moistureNorm: [0.80, 1.00],
                precipitationMmYear: [1200, 3000],
                temperatureC: [20, 35]
            },

            // Arid and semi-arid
            {
                terrainType: "desert_hot",
                elevationMeters: [-50, 2500],
                elevationNorm: [0.42, 0.74],
                moistureNorm: [0.00, 0.12],
                precipitationMmYear: [0, 250],
                temperatureC: [18, 50]
            },
            {
                terrainType: "desert_cold",
                elevationMeters: [200, 4200],
                elevationNorm: [0.50, 0.82],
                moistureNorm: [0.00, 0.15],
                precipitationMmYear: [0, 250],
                temperatureC: [-25, 20]
            },
            {
                terrainType: "semi_arid_steppe",
                elevationMeters: [0, 2500],
                elevationNorm: [0.45, 0.72],
                moistureNorm: [0.12, 0.32],
                precipitationMmYear: [250, 500],
                temperatureC: [-10, 35]
            },
            {
                terrainType: "badlands",
                elevationMeters: [200, 1800],
                elevationNorm: [0.50, 0.70],
                moistureNorm: [0.03, 0.20],
                precipitationMmYear: [100, 500],
                temperatureC: [-5, 40]
            },

            // Grass and shrub domains
            {
                terrainType: "savanna",
                elevationMeters: [0, 1500],
                elevationNorm: [0.45, 0.66],
                moistureNorm: [0.28, 0.58],
                precipitationMmYear: [500, 1500],
                temperatureC: [18, 32]
            },
            {
                terrainType: "prairie_temperate_grassland",
                elevationMeters: [0, 1800],
                elevationNorm: [0.44, 0.66],
                moistureNorm: [0.30, 0.55],
                precipitationMmYear: [500, 900],
                temperatureC: [-20, 30]
            },
            {
                terrainType: "chaparral_mediterranean_shrubland",
                elevationMeters: [0, 1600],
                elevationNorm: [0.46, 0.68],
                moistureNorm: [0.20, 0.45],
                precipitationMmYear: [300, 900],
                temperatureC: [5, 35]
            },

            // Forest domains
            {
                terrainType: "temperate_deciduous_forest",
                elevationMeters: [0, 1500],
                elevationNorm: [0.50, 0.72],
                moistureNorm: [0.45, 0.75],
                precipitationMmYear: [750, 1500],
                temperatureC: [-30, 30]
            },
            {
                terrainType: "temperate_rainforest",
                elevationMeters: [0, 1200],
                elevationNorm: [0.50, 0.74],
                moistureNorm: [0.70, 1.00],
                precipitationMmYear: [1400, 3500],
                temperatureC: [4, 20]
            },
            {
                terrainType: "coniferous_forest_taiga",
                elevationMeters: [100, 3000],
                elevationNorm: [0.52, 0.78],
                moistureNorm: [0.20, 0.55],
                precipitationMmYear: [300, 900],
                temperatureC: [-40, 20]
            },
            {
                terrainType: "tropical_seasonal_forest",
                elevationMeters: [0, 1300],
                elevationNorm: [0.48, 0.72],
                moistureNorm: [0.55, 0.82],
                precipitationMmYear: [1000, 2000],
                temperatureC: [18, 32]
            },
            {
                terrainType: "tropical_rainforest",
                elevationMeters: [0, 1200],
                elevationNorm: [0.48, 0.74],
                moistureNorm: [0.75, 1.00],
                precipitationMmYear: [2000, 10000],
                temperatureC: [20, 30]
            },
            {
                terrainType: "cloud_forest",
                elevationMeters: [1200, 3500],
                elevationNorm: [0.62, 0.84],
                moistureNorm: [0.70, 1.00],
                precipitationMmYear: [1500, 4000],
                temperatureC: [8, 20]
            },

            // Wetlands and inland water
            {
                terrainType: "wetland_marsh",
                elevationMeters: [0, 400],
                elevationNorm: [0.42, 0.55],
                moistureNorm: [0.75, 1.00],
                precipitationMmYear: [600, 3000],
                temperatureC: [-5, 35]
            },
            {
                terrainType: "bog_fen",
                elevationMeters: [0, 900],
                elevationNorm: [0.45, 0.62],
                moistureNorm: [0.80, 1.00],
                precipitationMmYear: [500, 2500],
                temperatureC: [-10, 20]
            },
            {
                terrainType: "swamp",
                elevationMeters: [0, 250],
                elevationNorm: [0.42, 0.54],
                moistureNorm: [0.80, 1.00],
                precipitationMmYear: [1000, 3000],
                temperatureC: [10, 35]
            },
            {
                terrainType: "lake_inland_water",
                elevationMeters: [0, 4500],
                elevationNorm: [0.36, 0.58],
                moistureNorm: [0.70, 1.00],
                temperatureC: [-2, 30]
            },

            // Upland and mountain systems
            {
                terrainType: "hills_foothills",
                elevationMeters: [200, 1500],
                elevationNorm: [0.56, 0.70],
                moistureNorm: [0.20, 0.80],
                temperatureC: [-10, 30]
            },
            {
                terrainType: "plateau",
                elevationMeters: [800, 3500],
                elevationNorm: [0.62, 0.82],
                moistureNorm: [0.10, 0.60],
                temperatureC: [-15, 25]
            },
            {
                terrainType: "mountain",
                elevationMeters: [600, 4500],
                elevationNorm: [0.64, 0.86],
                moistureNorm: [0.15, 0.85],
                temperatureC: [-20, 20]
            },
            {
                terrainType: "montane_forest",
                elevationMeters: [900, 3200],
                elevationNorm: [0.66, 0.84],
                moistureNorm: [0.40, 0.90],
                precipitationMmYear: [600, 3000],
                temperatureC: [-5, 20]
            },
            {
                terrainType: "subalpine",
                elevationMeters: [1800, 3600],
                elevationNorm: [0.74, 0.90],
                moistureNorm: [0.25, 0.80],
                temperatureC: [-15, 15]
            },
            {
                terrainType: "alpine_tundra",
                elevationMeters: [2500, 5000],
                elevationNorm: [0.82, 0.96],
                moistureNorm: [0.08, 0.40],
                precipitationMmYear: [100, 700],
                temperatureC: [-30, 10]
            },
            {
                terrainType: "volcanic_highland",
                elevationMeters: [500, 4500],
                elevationNorm: [0.64, 0.94],
                moistureNorm: [0.10, 0.95],
                precipitationMmYear: [200, 4000],
                temperatureC: [-15, 28]
            },
            {
                terrainType: "geothermal_plain",
                elevationMeters: [50, 1800],
                elevationNorm: [0.48, 0.74],
                moistureNorm: [0.20, 0.95],
                temperatureC: [-5, 25]
            },

            // Polar / cryosphere
            {
                terrainType: "tundra",
                elevationMeters: [0, 3500],
                elevationNorm: [0.52, 0.84],
                moistureNorm: [0.05, 0.25],
                precipitationMmYear: [150, 350],
                temperatureC: [-40, 18]
            },
            {
                terrainType: "glacier_icefield",
                elevationMeters: [0, 5000],
                elevationNorm: [0.72, 1.00],
                moistureNorm: [0.20, 0.95],
                precipitationMmYear: [100, 2000],
                temperatureC: [-50, 0]
            },
            {
                terrainType: "nival_snow_ice",
                elevationMeters: [2500, 8849],
                elevationNorm: [0.86, 1.00],
                moistureNorm: [0.10, 0.95],
                temperatureC: [-50, 0]
            }
        ];

