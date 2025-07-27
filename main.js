let map;
let markers = [];

function initMap() {
    try {
        // Initialize map
        map = new google.maps.Map(document.getElementById("map"), {
            center: CONFIG.MAP.DEFAULT_CENTER,
            zoom: CONFIG.MAP.DEFAULT_ZOOM,
            styles: CONFIG.MAP.STYLES,
            disableDefaultUI: true,
            zoomControl: true
        });

        // Initialize time slider
        document.getElementById("yearSlider").addEventListener("input", (e) => {
            const year = e.target.value;
            document.getElementById("currentYear").textContent = year;
            updateMapForYear(year);
        });

        // Load initial data
        updateMapForYear(CONFIG.TIME.DEFAULT_YEAR);
        document.getElementById('loading').style.display = 'none';

    } catch (error) {
        console.error("Map initialization failed:", error);
    }
}

async function updateMapForYear(year) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Load new data
    const data = await timeData.load(year);
    
    // Add markers
    data.forEach(item => {
        const marker = new google.maps.Marker({
            position: { lat: item.lat, lng: item.lng },
            map: map,
            title: `${item.name} (${year})`,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: CONFIG.MARKERS.COLORS[item.type] || '#ffffff',
                fillOpacity: 0.9,
                scale: item.size,
                strokeColor: '#000000',
                strokeWeight: 1.5
            }
        });
        markers.push(marker);
    });
}

// Global error handler
window.gm_authFailure = function() {
    document.getElementById('loading').innerHTML = `
        <p style="color: #ff2d75; padding: 20px;">
            Google Maps Error: API key rejected<br><br>
            Verify in <a href="https://console.cloud.google.com" target="_blank" style="color: #00f7ff;">Google Cloud Console</a>:
            <br>1. API key restrictions
            <br>2. Enabled APIs (Maps, Places)
            <br>3. Billing is active
        </p>`;
};
