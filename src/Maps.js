import React from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

let provinciasGeo = require('./provincias.json');

class Maps extends React.Component {


  render() {
    const position = [-40, -64];
    const mapboxAccessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    return (
      <Map ref="map" center={position} zoom={4} style={{height : '550px', 'width': '500px'}}>
        <TileLayer
          id= 'mapbox/light-v9'
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" + mapboxAccessToken}
        />
        <GeoJSON data={provinciasGeo} />
      </Map>
    )
  }
}

export default Maps;

// var mapboxAccessToken = {your access token here};
// var map = L.map('map').setView([37.8, -96], 4);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
//     id: 'mapbox/light-v9',
//     attribution: ...,
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(map);

// L.geoJson(statesData).addTo(map);