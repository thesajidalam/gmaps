let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: CONFIG.MAP.DEFAULT_CENTER,
        zoom: CONFIG.MAP.DEFAULT_ZOOM,
        styles: CONFIG.MAP.STYLES,
        disableDefaultUI: true
    });

    // Initialize time slider
    const slider = document.getElementById("yearSlider");
    slider.addEventListener("input", (e) => {
        const year = e.target.value;
        document.getElementById("currentYear").textContent = year;
        timeData.load(year).then(data => updateMarkers(data));
    });

    // Load initial data
    timeData.load(CONFIG.TIME.DEFAULT_YEAR).then(data => updateMarkers(data));
}

function updateMarkers(data) {
    // Clear existing markers
    if (window.markers) {
        window.markers.forEach(marker => marker.setMap(null));
    }

    // Add new markers
    window.markers = data.map(item => {
        return new google.maps.Marker({
            position: { lat: item.lat, lng: item.lng },
            map: map,
            title: `${item.name} (${item.type})`,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: item.type === "startup" ? "#6e44ff" : "#ff2d75",
                fillOpacity: 0.9,
                scale: item.size,
                strokeColor: "#000",
                strokeWeight: 2
            }
        });
    });
}
