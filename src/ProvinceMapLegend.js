import { MapControl, withLeaflet } from "react-leaflet";
import React from 'react';

import L from "leaflet";
import './index.css';

class ProvinceMapLegend extends React.Component {

  componentDidMount() {
    // get color depending on population density value
    const getColor = d => {
        return d > 500 ? '#800026' :
               d > 200  ? '#BD0026' :
               d > 100  ? '#E31A1C' :
               d > 50  ? '#FC4E2A' :
               d > 30   ? '#FD8D3C' :
               d > 20   ? '#FEB24C' :
               d > 10   ? '#FED976' :
                          '#FFEDA0'
    };

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 10, 20, 30, 50, 100, 200, 500];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' +
            getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? "&ndash;" + to : "+")
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
  render(){
    return <div />
  }
}

export default withLeaflet(ProvinceMapLegend);