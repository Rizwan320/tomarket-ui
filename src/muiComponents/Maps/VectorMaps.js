import React from "react";
import { VectorMap } from "react-jvectormap";
import "./jquery-jvectormap.css";

const map = React.createRef(null);

const markers = [
  { latLng: [34.05, -118.25], name: "Los Angeles", style: { fill: "red", r: 5 } },
  { latLng: [40.7128, -78.006], name: "New York", style: { fill: "yellow", r: 5 } },
  { latLng: [40.7128, -74.006], name: "New York", style: { fill: "yellow", r: 5 } },
  { latLng: [40.7128, -75.006], name: "New York", style: { fill: "yellow", r: 5 } },
  { latLng: [41.8781, -89.6298], name: "Chicago", style: { fill: "green", r: 5 } },
  { latLng: [29.7604, -95.3698], name: "Houston", style: { fill: "yellow", r: 5 } },
  { latLng: [33.4484, -112.074], name: "Phoenix", style: { fill: "purple", r: 5 } },
  { latLng: [39.7392, -104.9903], name: "Denver", style: { fill: "orange", r: 5 } },
  { latLng: [25.7617, -80.1918], name: "Miami", style: { fill: "cyan", r: 5 } },
  { latLng: [47.6062, -122.3321], name: "Seattle", style: { fill: "magenta", r: 5 } },
  { latLng: [44.9778, -93.265], name: "Minneapolis", style: { fill: "lime", r: 5 } },
  { latLng: [32.7767, -96.797], name: "Dallas", style: { fill: "maroon", r: 5 } },
];

const series = {
  regions: [
    {
      values: {
        "US-CA": "120",
        "US-NY": "100",
        "US-IL": "80",
        "US-TX": "140",
        "US-AZ": "60",
        "US-CO": "50",
        "US-FL": "110",
        "US-WA": "90",
        "US-MN": "70",
        "US-TX": "130",
      },
      scale: ["#50a952"],
      normalizeFunction: "polynomial",
    },
  ],
  markers: [
    {
      attribute: "r",
      scale: [5, 15],
      values: [10, 20, 15, 12, 18, 9, 14, 16, 11, 13],
    },
  ],
};

const Vectormap = (props) => {
  return (
    <div style={{ width: props.width, height: 500 }}>
      <VectorMap
        map={props.value}
        backgroundColor="transparent"
        ref={map}
        containerStyle={{
          width: "100%",
          height: "80%",
        }}
        markers={markers}
        series={series}
        regionStyle={{
          initial: {
            fill: props.color,
            stroke: "#fffff",
            "stroke-width": 2,
            "stroke-opacity": 2,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            fill: "#2938bc", // Colour of clicked country
          },
          selectedHover: {},
        }}
        containerClassName="map"
      />
    </div>
  );
};

export default Vectormap;
