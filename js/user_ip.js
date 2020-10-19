function myMap() {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', 'https://ipapi.co/json/', true);
    req.onload = function () {
        if (req.status == 200) {
            var loc = JSON.parse(req.responseText);
            console.log(loc);
            document.querySelector('.address').innerHTML = loc['city'] + ', ' + loc['country_name'];
            var localTime = loc['timezone'];
            var serverTime = "Asia/Kolkata";
            document.querySelector('.server').innerText = new Date().toLocaleString("en-US", {
                timeZone: serverTime
            });
            document.querySelector('.local').innerText = new Date().toLocaleString("en-US", {
                timeZone: localTime
            });
            Map(Number(loc['latitude']), Number(loc['longitude']))
            setup(loc)

        } else {
            console.log('HTTP Error ' + req.status);
        }
    };
    req.onerror = function () {
        if (req.status == 0) {
            alert('Please disable your ad-blocker');
        }
    };
    req.send(null);
}

function Map(latitude, longitude) {
    var mymap = L.map('mapid').setView([latitude, longitude], 13);

    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

    L.marker([latitude, longitude]).addTo(mymap);
    // .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
}

function setup(loc) {
    createCanvas(500, 300);
    textSize(18);

    background(0);

    saveAsJSON(loc)
}

function saveAsJSON(loc) {
    let exampleObj = [{
        "ip": loc['ip'],
        "lat": loc['lat'],
        "city": loc['city'],
        "country": loc['country_name'],
        "time": new Date().toLocaleString("en-US", {
            timeZone: localTime
        }),
    }, ];
    save(exampleObj, "../visitors/visitors.json");
}