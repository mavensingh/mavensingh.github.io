// // /**
// //  * Get the user IP throught the webkitRTCPeerConnection
// //  * @param onNewIP {Function} listener function to expose the IP locally
// //  * @return undefined
// //  */
// // function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
// //     //compatibility for firefox and chrome
// //     var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
// //     var pc = new myPeerConnection({
// //             iceServers: []
// //         }),
// //         noop = function () {},
// //         localIPs = {},
// //         ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
// //         key;

// //     function iterateIP(ip) {
// //         if (!localIPs[ip]) onNewIP(ip);
// //         localIPs[ip] = true;
// //     }

// //     //create a bogus data channel
// //     pc.createDataChannel("");

// //     // create offer and set local description
// //     pc.createOffer(function (sdp) {
// //         sdp.sdp.split('\n').forEach(function (line) {
// //             if (line.indexOf('candidate') < 0) return;
// //             line.match(ipRegex).forEach(iterateIP);
// //         });

// //         pc.setLocalDescription(sdp, noop, noop);
// //     }, noop);

// //     //listen for candidate events
// //     pc.onicecandidate = function (ice) {
// //         if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
// //         ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
// //     };
// // }

// // // Usage

// // window.onload = getUserIP(function (ip) {
// //     document.getElementById("ip").innerHTML = 'Got your IP ! : ' + ip + " | verify in http://www.whatismypublicip.com/";
// // });


// document.addEventListener("DOMContentLoaded", function (event) {
//     var address = document.querySelector('.address')
//     if (!navigator.geolocation) {
//         console.log("Geolocation is not supported by your browser");
//         ipLookup();
//     } else {
//         navigator.geolocation.getCurrentPosition(success, error);
//     }

//     function success(position) {
//         var latitude = position.coords.latitude;
//         var longitude = position.coords.longitude;
//         reverseGeocodingWithGoogle(longitude, latitude)
//     }

//     function error() {
//         console.log("Unable to retrieve your location");
//     }

//     function ipLookup() {
//         fetch('https://extreme-ip-lookup.com/json/')
//             .then(res => res.json())
//             .then(response => {
//                 fallbackProcess(response)
//             })
//             .catch((data, status) => {
//                 address.innerText = 'We could not find your location'
//             })
//     }

//     function reverseGeocodingWithGoogle(latitude, longitude) {
//         fetch(`https://maps.googleapis.com/maps/api/geocode/json?
//         latlng=${latitude},${longitude}&key=AIzaSyAsotGElz8IoU64QYjYy6uQqIx_3DCZJBQ`)
//             .then(res => res.json())
//             .then(response => {
//                 processUserData(response)
//             })
//             .catch(status => {
//                 ipLookup()
//             })
//     }

//     function processUserData(response) {
//         address.innerText = response.results[0].formatted_address
//     }

//     function fallbackProcess(response) {
//         address.innerText = `${response.city}, ${response.country}`
//     }

//     var localTime = jstz.determine().name();
//     var serverTime = "Asia/Novosibirsk";
//     document.querySelector('.server').innerText = new Date().toLocaleString("en-US", {
//         timeZone: serverTime
//     });
//     document.querySelector('.local').innerText = new Date().toLocaleString("en-US", {
//         timeZone: localTime
//     });
// });


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