/**
 * Time Machine Data Module
 * Handles all data operations for the Time Machine visualization
 */

class TimeData {
  constructor() {
    this.cache = new Map();
    this.currentYear = CONFIG.TIME.DEFAULT_YEAR;
  }

  /**
   * Load data for specific year
   * @param {number} year 
   * @returns {Promise<Array>}
   */
  async load(year) {
    this.currentYear = year;
    
    // Check cache first
    if (this.cache.has(year)) {
      return this.cache.get(year);
    }

    try {
      const data = CONFIG.USE_MOCK_DATA 
        ? this.getMockData(year)
        : await this.fetchData(year);
      
      this.cache.set(year, data);
      return data;
    } catch (error) {
      console.error(`Failed to load data for ${year}:`, error);
      return [];
    }
  }

  /**
   * Fetch data from API
   * @param {number} year 
   * @returns {Promise<Array>}
   */
  async fetchData(year) {
    if (CONFIG.DEBUG) console.log(`Fetching data for ${year}...`);
    
    const url = `${CONFIG.API.BASE_URL}${CONFIG.API.DATA_ENDPOINT}?year=${year}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Mock data for development
   * @param {number} year 
   * @returns {Array}
   */
  getMockData(year) {
    // Base dataset with modern tech hubs
    const modernHubs = [
      {
        id: 'sf-1',
        name: 'Silicon Valley',
        lat: 37.3875,
        lng: -122.0575,
        type: 'unicorn',
        density: 95,
        notable: ['Google', 'Apple', 'Facebook']
      },
      {
        id: 'ny-1',
        name: 'New York Tech',
        lat: 40.7406,
        lng: -73.9866,
        type: 'office',
        density: 80,
        notable: ['Amazon', 'Twitter', 'Bloomberg']
      }
    ];

    // Historical dataset (1990s)
    const historicalHubs = [
      {
        id: 'sf-90s',
        name: 'Early Silicon Valley',
        lat: 37.3875,
        lng: -122.0575,
        type: 'startup',
        density: 30,
        notable: ['Netscape', 'Sun Microsystems', 'HP']
      },
      {
        id: 'bos-90s',
        name: 'Boston Tech',
        lat: 42.3601,
        lng: -71.0942,
        type: 'office',
        density: 45,
        notable: ['DEC', 'Lotus', 'BBN']
      }
    ];

    // Return different datasets based on year
    if (year < 2000) {
      return historicalHubs.map(item => ({
        ...item,
        year,
        size: Math.floor(item.density / 3)
      }));
    }

    return modernHubs.map(item => ({
      ...item,
      year,
      size: item.density,
      // Adjust positions slightly for visualization
      lat: item.lat + (Math.random() * 0.02 - 0.01),
      lng: item.lng + (Math.random() * 0.02 - 0.01)
    }));
  }

  /**
   * Get marker icon configuration
   * @param {string} type 
   * @returns {Object}
   */
  getMarkerIcon(type) {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: CONFIG.MARKERS.COLORS[type] || CONFIG.MARKERS.COLORS.default,
      fillOpacity: 0.9,
      scale: CONFIG.MARKERS.SIZE,
      strokeColor: '#000000',
      strokeWeight: 1.5
    };
  }
}

// Create singleton instance
const timeData = new TimeData();
