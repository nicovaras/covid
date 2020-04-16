import React from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON,  Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ProvinceMapLegend from './ProvinceMapLegend'
import ProvinceLine from './ProvinceLine'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

let provinciasGeo = require('./provincias.json');

const provMap = {
    "Ciudad Autónoma de Buenos Aires":"CABA",
    "Buenos Aires":"Buenos Aires",
    "Catamarca":"Catamarca",
    "Chaco":"Chaco",
    "Chubut":"Chubut",
    "Córdoba":"Cordoba",
    "Corrientes":"Corrientes",
    "Entre Ríos":"Entre Rios",
    "Formosa":"Formosa",
    "Jujuy":"Jujuy",
    "La Pampa":"La Pampa",
    "La Rioja":"La Rioja",
    "Mendoza":"Mendoza",
    "Misiones": "Misiones",
    "Neuquén":"Neuquen",
    "Río Negro":"Rio Negro",
    "Salta":"Salta",
    "San Juan":"San Juan",
    "San Luis":"San Luis",
    "Santa Cruz":"Santa Cruz",
    "Santa Fe":"Santa Fe",
    "Santiago del Estero":"Santiago del Estero",
    "Tierra del Fuego":"Tierra del Fuego",
    "Tucumán":"Tucuman"
}

class Maps extends React.Component {




    style(feature) {
        function getColor(d) {
        return d > 500 ? '#800026' :
               d > 200  ? '#BD0026' :
               d > 100  ? '#E31A1C' :
               d > 50  ? '#FC4E2A' :
               d > 30   ? '#FD8D3C' :
               d > 20   ? '#FEB24C' :
               d > 10   ? '#FED976' :
                          '#FFEDA0'
        }
        return {
            fillColor: getColor(feature.properties['total_cases']),
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        }
    }
    
  onEachFeature(feature,layer){
    layer.bindTooltip('<div>' + feature.properties.nombre + '</div>' +
                      '<div>' + feature.properties.total_cases + '</div>');
  }

  provinceLinePlots(covid){
    return (
        <Grid item lg={9}>
            <Grid container spacing = {3}>
                {Object.keys(covid).map((province) =>(
                    <Grid item lg={4}>
                        <Paper>
                                <ProvinceLine data={covid} province={province}/>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>     
    );

  }

  render() {
    const covid = this.props.data;

    let days = [];
    for(let day in covid['CABA']){
       days.push(day);
    }
    const lastDay =days[days.length - 1];

    for(let i in provinciasGeo['features']){
        let nombre = provinciasGeo['features'][i]['properties']['nombre']
        if(nombre === 'Islas Malvinas'){
            provinciasGeo['features'][i]['properties']['total_cases'] = 0;
        } else {
            provinciasGeo['features'][i]['properties']['total_cases'] = covid[provMap[nombre]][lastDay]['total_cases'];
        }   
        
    }

    const position = [-40, -64];
    const mapboxAccessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    return (
        <React.Fragment>
        <Grid container spacing={3}>
            <Grid item lg={3}>
                <Paper>
                  <Map ref="map" center={position} zoom={4} style={{height : '550px', 'width': '290px'}}>
                    <TileLayer
                      id= 'mapbox/light-v9'
                      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url={"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" + mapboxAccessToken}
                    />
                    <GeoJSON data={provinciasGeo} style={this.style} onEachFeature={this.onEachFeature}/>
                    <ProvinceMapLegend />
                  </Map>
                </Paper>
            </Grid>
            {this.provinceLinePlots(covid)}
            
        </Grid>
        </React.Fragment>
    )
  }
}

export default Maps;

