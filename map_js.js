var map;
var lat=23;
var lng=120.2;
var uluru = {lat: lat, lng: lng};
var infowincontent = '<div style="width:200px">CONTENT</div>';
var marker_test;
var Markers=[];
var Infowindows=[];
var count = -1;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      maxZoom: 22,
      minZoom: 12,
      center: uluru,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false
    });
    map.addListener('click', function(event){
        addMarker(event.latLng);
        
    });
    // infowincontent = '<div style="width:200px">CONTENT</div>';
    marker_test = new google.maps.Marker({
      position: uluru,
      map: map
    });
    
    // var infowindow0 = new google.maps.InfoWindow({
    //   content: infowincontent.replace('CONTENT',
    //     'library'
    //   )
    // });
    // marker_old.addListener('click', function() {
    //     infowindow0.open(map, marker_old);
    // });
}
function addMarker(location) {
    count = count + 1;
    var marker = new google.maps.Marker({
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: location,
    map: map
    });
    var infowindow = new google.maps.InfoWindow({
      content: infowincontent.replace('CONTENT',
        count
      )
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    Markers.push(marker);
}
$( ".target" ).click(function() {
  var pick=$(this).attr('id');
  console.log($(this).attr('id'));
  findposition(Markers[pick]);
});
function findposition(target_marker){
  navigator.geolocation.getCurrentPosition((position) =>{
    console.log(position.coords);
    lat=position.coords.latitude;
    lng=position.coords.longitude;
    uluru = {lat: lat, lng: lng};
    target_marker.setPosition(uluru);
    map.setCenter(uluru);
    map.setZoom(18);
  });
}