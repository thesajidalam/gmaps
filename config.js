/**
 * Google Maps Time Machine Configuration
 * Uses only Google Maps Platform APIs
 */

const CONFIG = {
  // Google Maps Initialization
  MAP: {
    DEFAULT_CENTER: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    DEFAULT_ZOOM: 12,
    MIN_ZOOM: 5,
    MAX_ZOOM: 18,
    CONTROL_SIZE: 30,
    RESTRICT_BOUNDS: null,
  },

  // Time Machine Parameters
  TIME: {
    MIN_YEAR: 1990,
    MAX_YEAR: 2025,
    DEFAULT_YEAR: 2025,
    TRANSITION_DURATION: 500, // ms
  },

  // Google Maps API Services
  API: {
    // Geocoding (address ↔ coordinates)
    GEOCODING: {
      ENDPOINT: 'https://maps.googleapis.com/maps/api/geocode/json',
      KEY: 'AIzaSyBdyGwUTzp43BvST1D5wSuFmey0jiwprd8', // Your existing key
      FIELDS: 'geometry,name,formatted_address'
    },
    
    // Places (for tech hub locations)
    PLACES: {
      ENDPOINT: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      KEY: 'AIzaSyBdyGwUTzp43BvST1D5wSuFmey0jiwprd8',
      RADIUS: 50000, // meters (50km)
      TYPES: ['electronics_store', 'university', 'point_of_interest'],
      DEFAULT_PARAMS: {
        keyword: 'tech hub',
        language: 'en'
      }
    },
    
    // Time-based data simulation
    TIME_DATA: {
      USE_MOCK: true, // Simulate time data since GMaps doesn't have historical API
      MOCK_YEARS: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]
    }
  },

  // Map Style Configuration
  STYLES: [
    {
      "featureType": "all",
      "elementType": "geometry",
      "stylers": [{"color": "#242f3e"}]
    },
    {
      "featureType": "poi",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    }
  ],

  // Marker Configuration
  MARKERS: {
    SIZE: 8,
    COLORS: {
      startup: '#6e44ff',
      office: '#00f7ff',
      unicorn: '#ff2d75',
      mega: '#00ffaa',
      default: '#ffffff'
    },
    ANIMATION_DURATION: 300 // ms
  },

  // Development Flags
  DEBUG: true
};

// Freeze config to prevent accidental modification
Object.freeze(CONFIG);
