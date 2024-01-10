function initMap() {
    // Latitude and Longitude
    var myLatLng = {lat: 53.479624, lng: -2.222000};

    var map = new google.maps.Map(document.getElementById('google-maps'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Manchester, UK' // Title Location
    });
}