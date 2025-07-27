class TimeData {
    constructor() {
        this.cache = new Map();
    }

    async load(year) {
        if (this.cache.has(year)) {
            return this.cache.get(year);
        }

        const data = this.generateMockData(year);
        this.cache.set(year, data);
        return data;
    }

    generateMockData(year) {
        const baseLocations = [
            { lat: 37.7749, lng: -122.4194, name: "San Francisco Tech" },
            { lat: 37.3348, lng: -122.0090, name: "Apple Park" },
            { lat: 37.4220, lng: -122.0841, name: "Googleplex" }
        ];

        return baseLocations.map(loc => ({
            ...loc,
            type: year < 2000 ? "startup" : "unicorn",
            size: year < 2000 ? 6 : 10
        }));
    }
}

const timeData = new TimeData();
