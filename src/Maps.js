import React from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON,  Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ProvinceMapLegend from './ProvinceMapLegend'
import ProvinceLine from './ProvinceLine'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import bsasImg from './img/BuenosAires.png';
import cabaImg from './img/CABA.png';
import catamarcaImg from './img/Catamarca.png';
import chacoImg from './img/Chaco.png';
import chubutImg from './img/Chubut.png';
import cordobaImg from './img/Cordoba.png';
import corrientesImg from './img/Corrientes.png';
import entreRiosImg from './img/EntreRios.png';
import formosaImg from './img/Formosa.png';
import jujuyImg from './img/Jujuy.png';
import laPampaImg from './img/LaPampa.png';
import laRiojaImg from './img/LaRioja.png';
import mendozaImg from './img/Mendoza.png';
import misionesImg from './img/Misiones.png';
import neuquenImg from './img/Neuquen.png';
import rioNegroImg from './img/RioNegro.png';
import saltaImg from './img/Salta.png';
import sanJuanImg from './img/SanJuan.png';
import sanLuisImg from './img/SanLuis.png';
import santaCruzImg from './img/SantaCruz.png';
import santaFeImg from './img/SantaFe.png';
import santiagoImg from './img/SantiagodelEstero.png';
import tierraImg from './img/TierradelFuego.png';
import tucumanImg from './img/Tucuman.png';
import Title from './Title';

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

const provImg = {
    "Buenos Aires": bsasImg,
    "Formosa": formosaImg,
    "Salta": saltaImg,
    "CABA": cabaImg,
    "Jujuy": jujuyImg,
    "San Juan": sanJuanImg,
    "Catamarca": catamarcaImg,
    "La Pampa": laPampaImg,
    "San Luis": sanLuisImg,
    "Chaco": chacoImg,
    "La Rioja": laRiojaImg,
    "Santa Cruz": santaCruzImg,
    "Chubut": chubutImg,
    "Mendoza": mendozaImg,
    "Santa Fe": santaFeImg,
    "Cordoba": cordobaImg,
    "Misiones": misionesImg,
    "Santiago del Estero": santiagoImg,
    "Corrientes": corrientesImg,
    "Neuquen": neuquenImg,
    "Tierra del Fuego": tierraImg,
    "Entre Rios": entreRiosImg,
    "Rio Negro": rioNegroImg,
    "Tucuman":tucumanImg
}

class Maps extends React.Component {




    style(feature) {
        function getColor(d) {
        return d > 800 ? '#800026' :
               d > 500  ? '#BD0026' :
               d > 200  ? '#E31A1C' :
               d > 100  ? '#FC4E2A' :
               d > 50   ? '#FD8D3C' :
               d > 30   ? '#FEB24C' :
               d > 10   ? '#FED976' :
                          '#FFEDA0'
        }

        return {
            fillColor: getColor(feature.properties['total_cases']),
            weight: 2,
            opacity: 1,
            color: 'gray',
            // color: 'white',
            fillOpacity: 0.5
        }

        // let nombre = feature['properties']['nombre']
        // if (provMap[nombre] === 'Tucuman'){
        //     return {
        //         // fillColor: getColor(feature.properties['total_cases']),
        //         fillColor: 'lightgray',
        //         weight: 5,
        //         opacity: 1,
        //         color: 'gray',
        //         // color: 'white',
        //         fillOpacity: 0.5
        //     }
        // } else {
        //     return {
        //         // fillColor: getColor(feature.properties['total_cases']),
        //         weight: 1,
        //         opacity: 0,
        //         // color: 'gray',
        //         color: 'lightgray',
        //         fillOpacity: 0.1
        //     }

        // }
    }
    
  onEachFeature(feature,layer){
    layer.bindTooltip('<div>' + feature.properties.nombre + '</div>' +
                      '<div>' + feature.properties.total_cases + '</div>');
  }

  provinceLinePlots(covid, lastDay){

    const maxValue = covid['CABA'][lastDay]['total_cases'];


    return (

        <Grid item lg={9} >
        <Title> Casos Confirmados Por Provincia </Title>
            <Grid container spacing = {3}>
                {Object.keys(covid).map((province) =>(
                    <Grid key={"line-"+province} item lg={4}>
                        <Paper style={{height:"165px",backgroundImage: "url(" + provImg[province] + ")"}}>
                                <ProvinceLine data={covid} province={province} maxValue={maxValue}/>
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
            <Title> Casos Confirmados En El Pais </Title>
                <Paper>
                  <Map ref="map" center={position} zoom={4} style={{ height : '550px', 'width': '290px'}}>
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

            {this.provinceLinePlots(covid, lastDay)}
            
        </Grid>
        </React.Fragment>
    )
  }
}

export default Maps;

