import { MapControl, withLeaflet } from "react-leaflet";
import React from 'react';

import L from "leaflet";
import './index.css';

class ProvinceMapLegend extends React.Component {

  componentDidMount() {
    // get color depending on population density value
    const getColor = d => {
        return d > 1000 ? '#800026' :
               d > 800  ? '#BD0026' :
               d > 500  ? '#E31A1C' :
               d > 200  ? '#FC4E2A' :
               d > 100   ? '#FD8D3C' :
               d > 50   ? '#FEB24C' :
               d > 20   ? '#FED976' :
                          '#FFEDA0'
    };

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 20, 50, 100, 200, 500, 800, 1000];
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