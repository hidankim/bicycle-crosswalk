const API_KEY = 'b06v019CqDnp3zfHWuiCHv%2B4YciBbxHVgKxobYKJ026vXTsMHu0%2FLSTqcw0Tngi7hetY7t81zAReI%2FWPWPwVXA%3D%3D';

async function getData(){
    const url= 'http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?ServiceKey=b06v019CqDnp3zfHWuiCHv%2B4YciBbxHVgKxobYKJ026vXTsMHu0%2FLSTqcw0Tngi7hetY7t81zAReI%2FWPWPwVXA%3D%3D&searchYearCd=2015&siDo=11&guGun=260&type=json&numOfRows=100&pageNo=1';
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    const locations = data.items.item.map((spot)=>[
        spot.spot_nm,
        spot.la_crd,
        spot.lo_crd,
    ]);

    console.log("locations", locations);

    initMap(locations);
}

function initMap(locations) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(locations[0][1], locations[0][2]),
        mapTypeId: "roadmap",
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < locations.length; i++){
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        });

        google.maps.event.addListener(
            marker,
            "click",
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                };
            })(marker, i)
        );
    }
}

getData();