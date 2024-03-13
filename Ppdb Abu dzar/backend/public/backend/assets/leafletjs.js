var tileLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
  });

  // var latlng = L.latLng({{ $longEdit }},{{ $latEdit }});
  var latlng = L.latLng(-6.175509938978, 106.82722374805);

  var map = new L.Map('map', {
    'center': latlng,
    'zoom': 12,
    'layers': [tileLayer]
  });

  var marker = L.marker(latlng,{
      draggable: true,
      autoPan: true,
  }).addTo(map);

  marker.on('dragend', function (e) {
    updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
  });

  let theMarker = null;

  map.on('click', function (e) {
    let latitude  = e.latlng.lat.toString().substring(0,15);
    let longitude = e.latlng.lng.toString().substring(0,15);
    
    marker.setLatLng(e.latlng);
    updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
     // in DB
     document.getElementById("lat").value = latitude;
     document.getElementById("long").value = longitude;
     // in DB
    // document.querySelector('.reset').click();

    //  let popup = L.popup()
    //      .setLatLng([latitude,longitude])
    //      .setContent("Kordinat : " + latitude +" - "+  longitude )
    //      .openOn(map);
 
     if (theMarker) {
         map.removeLayer(theMarker);
     }
     theMarker = L.marker([latitude,longitude]).addTo(map); 
  });

  function updateLatLng(lat,lng) {
    document.getElementById('lat').value = marker.getLatLng().lat;
    document.getElementById('long').value = marker.getLatLng().lng;
    
  }
  const searchControl  = new GeoSearch.GeoSearchControl({
    notFoundMessage: 'Sorry, that address could not be found.',
    style: 'bar',
    provider: new GeoSearch.OpenStreetMapProvider(),
    showMarker: true,
    marker: marker, // use custom marker, not working?
  });
  
  map.addControl(searchControl);

  map.on('geosearch/showlocation', () => {
  	if (marker) {
        // alert("Hello! I am an alert box!!");
  		map.removeControl(marker);
    // document.querySelector('.reset').click();

    }
    // document.querySelector('.reset').click();
    
  });