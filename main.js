// config.js - API keys and constants
const CONFIG = {
  MAP_STYLE: [
    {
      "featureType": "all",
      "elementType": "geometry",
      "stylers": [{"color": "#242f3e"}]
    },
    {
      "featureType": "poi",
      "stylers": [{"visibility": "off"}]
    }
  ],
  INITIAL_COORDS: { lat: 37.7749, lng: -122.4194 },
  INITIAL_ZOOM: 12,
  API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY'
};

// data.js - Sample time-based data (replace with real API calls)
const TIME_DATA = {
  1990: [
    { lat: 37.7749, lng: -122.4194, type: 'startup', name: 'Netscape' },
    { lat: 37.3318, lng: -122.0312, type: 'office', name: 'Apple HQ' }
  ],
  2025: [
    { lat: 37.7749, lng: -122.4194, type: 'unicorn', name: 'Web3 Corp' },
    { lat: 37.3348, lng: -122.0090, type: 'mega', name: 'Apple Park' }
  ]
};

// main.js - Core functionality
class TimeMachineMap {
  constructor() {
    this.map = null;
    this.markers = [];
    this.currentYear = 2025;
    this.initMap();
    this.setupControls();
    this.loadYearData(this.currentYear);
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: CONFIG.INITIAL_COORDS,
      zoom: CONFIG.INITIAL_ZOOM,
      styles: CONFIG.MAP_STYLE,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "greedy"
    });

    // Add custom map controls
    this.addMapControls();
  }

  setupControls() {
    const slider = document.getElementById("yearSlider");
    const yearDisplay = document.getElementById("currentYear");

    slider.addEventListener("input", (e) => {
      this.currentYear = parseInt(e.target.value);
      yearDisplay.textContent = this.currentYear;
      this.animateYearChange();
    });

    // Add keyboard controls
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.adjustYear(-1);
      if (e.key === "ArrowRight") this.adjustYear(1);
    });
  }

  adjustYear(change) {
    const newYear = Math.min(2025, Math.max(1990, this.currentYear + change));
    document.getElementById("yearSlider").value = newYear;
    this.currentYear = newYear;
    document.getElementById("currentYear").textContent = newYear;
    this.animateYearChange();
  }

  animateYearChange() {
    // Pulse animation for year display
    const yearDisplay = document.getElementById("currentYear");
    yearDisplay.style.transform = "scale(1.2)";
    setTimeout(() => {
      yearDisplay.style.transform = "scale(1)";
    }, 300);

    // Load new data with transition
    this.transitionMarkers(() => {
      this.loadYearData(this.currentYear);
    });
  }

  transitionMarkers(callback) {
    // Fade out existing markers
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];

    // Small delay for smooth transition
    setTimeout(callback, 500);
  }

  loadYearData(year) {
    const data = TIME_DATA[year] || [];
    
    data.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        title: `${location.name} (${year})`,
        icon: this.getIconForType(location.type)
      });

      // Add info window
      this.addInfoWindow(marker, location, year);
      
      // Animate marker appearance
      this.animateMarkerAppearance(marker);
      
      this.markers.push(marker);
    });

    // Optional: Adjust viewport
    if (data.length > 0) {
      this.adjustViewport(data);
    }
  }

  getIconForType(type) {
    const colorMap = {
      'startup': '#6e44ff',
      'office': '#00f7ff',
      'unicorn': '#ff2d75',
      'mega': '#00ffaa'
    };
    
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: colorMap[type] || '#ffffff',
      fillOpacity: 0.9,
      scale: 8,
      strokeColor: '#000000',
      strokeWeight: 2
    };
  }

  addInfoWindow(marker, location, year) {
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="info-window">
          <h3>${location.name}</h3>
          <p>Year: ${year}</p>
          <p>Type: ${location.type}</p>
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(this.map, marker);
    });
  }

  animateMarkerAppearance(marker) {
    marker.setOpacity(0);
    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 0.05;
      marker.setOpacity(opacity);
      if (opacity >= 1) clearInterval(fadeIn);
    }, 30);
  }

  adjustViewport(locations) {
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(loc => {
      bounds.extend(new google.maps.LatLng(loc.lat, loc.lng));
    });
    this.map.fitBounds(bounds, { padding: 100 });
  }

  addMapControls() {
    // Add custom zoom controls
    const zoomControl = document.createElement("div");
    zoomControl.className = "zoom-control";
    zoomControl.innerHTML = `
      <button class="zoom-btn" id="zoomIn">+</button>
      <button class="zoom-btn" id="zoomOut">-</button>
    `;
    
    this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControl);
    
    document.getElementById("zoomIn").addEventListener("click", () => {
      this.map.setZoom(this.map.getZoom() + 1);
    });
    
    document.getElementById("zoomOut").addEventListener("click", () => {
      this.map.setZoom(this.map.getZoom() - 1);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Check if Google Maps API is loaded
  if (typeof google !== 'undefined') {
    new TimeMachineMap();
  } else {
    console.error("Google Maps API not loaded");
  }
});

// Add CSS for dynamic elements
const style = document.createElement("style");
style.textContent = `
  .zoom-control {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px;
    background: rgba(0,0,0,0.7);
    border-radius: 8px;
  }
  .zoom-btn {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: #6e44ff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .zoom-btn:hover {
    background: #00f7ff;
    transform: scale(1.1);
  }
  .info-window {
    color: #333;
    padding: 10px;
  }
  .info-window h3 {
    margin: 0 0 5px 0;
    color: #6e44ff;
  }
`;
document.head.appendChild(style);
