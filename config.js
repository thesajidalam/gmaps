/**
 * Google Maps Time Machine Configuration
 * Contains API settings and default parameters
 */

const CONFIG = {
  // Google Maps Initialization
  MAP: {
    DEFAULT_CENTER: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    DEFAULT_ZOOM: 12,
    MIN_ZOOM: 5,
    MAX_ZOOM: 18,
    CONTROL_SIZE: 30,
    RESTRICT_BOUNDS: null, // Set to bounds object if needed
  },

  // Time Machine Parameters
  TIME: {
    MIN_YEAR: 1990,
    MAX_YEAR: 2025,
    DEFAULT_YEAR: 2025,
    TRANSITION_DURATION: 500, // ms
  },

  // API Endpoints (Mock endpoints - replace with real API)
  API: {
    BASE_URL: 'https://api.deloper.news/v1',
    DATA_ENDPOINT: '/time-data',
    GEOCODE_ENDPOINT: '/geocode',
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
  DEBUG: true,
  USE_MOCK_DATA: true
};

// Freeze config to prevent accidental modification
Object.freeze(CONFIG);
