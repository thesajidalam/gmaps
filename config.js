const CONFIG = {
    MAP: {
        DEFAULT_CENTER: { lat: 37.7749, lng: -122.4194 },
        DEFAULT_ZOOM: 12,
        STYLES: [
            { featureType: "all", elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { featureType: "poi", stylers: [{ visibility: "off" }] }
        ]
    },
    TIME: {
        MIN_YEAR: 1990,
        MAX_YEAR: 2025,
        DEFAULT_YEAR: 2025
    },
    PLACES: {
        TYPES: ["electronics_store", "university"],
        RADIUS: 50000
    }
};
Object.freeze(CONFIG);
