// /**
//  * Get the user IP throught the webkitRTCPeerConnection
//  * @param onNewIP {Function} listener function to expose the IP locally
//  * @return undefined
//  */
// function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
//     //compatibility for firefox and chrome
//     var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
//     var pc = new myPeerConnection({
//             iceServers: []
//         }),
//         noop = function () {},
//         localIPs = {},
//         ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
//         key;

//     function iterateIP(ip) {
//         if (!localIPs[ip]) onNewIP(ip);
//         localIPs[ip] = true;
//     }

//     //create a bogus data channel
//     pc.createDataChannel("");

//     // create offer and set local description
//     pc.createOffer(function (sdp) {
//         sdp.sdp.split('\n').forEach(function (line) {
//             if (line.indexOf('candidate') < 0) return;
//             line.match(ipRegex).forEach(iterateIP);
//         });

//         pc.setLocalDescription(sdp, noop, noop);
//     }, noop);

//     //listen for candidate events
//     pc.onicecandidate = function (ice) {
//         if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
//         ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
//     };
// }

// // Usage

// window.onload = getUserIP(function (ip) {
//     document.getElementById("ip").innerHTML = 'Got your IP ! : ' + ip + " | verify in http://www.whatismypublicip.com/";
// });


document.addEventListener("DOMContentLoaded", function (event) {
    var address = document.querySelector('.address')
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        ipLookup();
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        reverseGeocodingWithGoogle(longitude, latitude)
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    function ipLookup() {
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                fallbackProcess(response)
            })
            .catch((data, status) => {
                address.innerText = 'We could not find your location'
            })
    }

    function reverseGeocodingWithGoogle(latitude, longitude) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?
        latlng=${latitude},${longitude}&key=AIzaSyAsotGElz8IoU64QYjYy6uQqIx_3DCZJBQ`)
            .then(res => res.json())
            .then(response => {
                processUserData(response)
            })
            .catch(status => {
                ipLookup()
            })
    }

    function processUserData(response) {
        address.innerText = response.results[0].formatted_address
    }

    function fallbackProcess(response) {
        address.innerText = `${response.city}, ${response.country}`
    }

    var localTime = jstz.determine().name();
    var serverTime = "Asia/India";
    document.querySelector('.server').innerText = new Date().toLocaleString("en-IN", {
        timeZone: serverTime
    });
    document.querySelector('.local').innerText = new Date().toLocaleString("en-IN", {
        timeZone: localTime
    });
});