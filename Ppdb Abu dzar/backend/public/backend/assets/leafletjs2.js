var tileLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
});

if ( lat == null && long == null  ) {
  var latlng = L.latLng(-6.175509938978, 106.82722374805);
} else {
  var latlng = L.latLng( lat, long);
}

var map = new L.Map('map', {
'center': latlng,
'zoom': 15,
'layers': [tileLayer]
});

var marker = L.marker(latlng,{
    draggable: true,
    autoPan: true
}).addTo(map);

marker.on('dragend', function (e) {
updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
});

map.on('click', function (e) {
marker.setLatLng(e.latlng);
updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
});

function updateLatLng(lat,lng) {
document.getElementById('lat').value = marker.getLatLng().lat;
document.getElementById('long').value = marker.getLatLng().lng;
}

map.on('geosearch/showlocation', () => {
	if (marker) {
		//map.removeControl(marker);
	}
});


const myIcon = L.icon({
  // iconUrl: 'https://i.imgur.com/S4HLPdt.png',
  iconUrl: 'myIcon.png' //tidak ada,jadi transparant
  // ...
});
const searchControl  = new GeoSearch.GeoSearchControl({
  notFoundMessage: 'Sorry, that address could not be found.',
  style: 'bar',
  provider: new GeoSearch.OpenStreetMapProvider(),
  showMarker: true,
  showPopup: true,
  marker: {
    icon: myIcon,
    draggable: false,
  },
  //marker: marker, // use custom marker, not working?
  popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
  resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
  maxMarkers: 3, // optional: number      - default 1
  retainZoomLevel: false, // optional: true|false  - default false
  animateZoom: true, // optional: true|false  - default true
  autoClose: false, // optional: true|false  - default false
  searchLabel: 'Enter address', // optional: string      - default 'Enter address'
  keepResult: false, // optional: true|false  - default false
  updateMap: true, // optional: true|false  - default true
  
});
map.addControl(searchControl);
