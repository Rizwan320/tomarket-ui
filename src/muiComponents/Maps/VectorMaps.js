import React, { useState, useEffect } from "react";
import { VectorMap } from "react-jvectormap";
import "./jquery-jvectormap.css";

const salesData = {
  "US-CA": 2180,
  "US-NY": 150,
  "US-IL": 1700,
  "US-TX": 1670,
  "US-CO": 25,
  "US-MN": 120,
  "US-DC": 70,
  "US-WA": 80,
  "US-FL": 95,
  "US-AZ": 65,
};

const restaurantStyles = {
  fast_food: { fill: "#f00", r: 5 },
  casual_dining: { fill: "#0f0", r: 7 },
  fine_dining: { fill: "#00f", r: 9 },
  cafe: { fill: "#ff0", r: 4 },
};

const initialMarkers = [
  {
    code: "US-CA",
    latLng: [34.0522, -118.2437],
    name: "Los Angeles",
    salesVolume: 3000,
    restaurantType: "fast_food",
  },
  {
    code: "US-NY",
    latLng: [40.7128, -74.006],
    name: "New York City",
    salesVolume: 2000,
    restaurantType: "casual_dining",
  },
  {
    code: "US-IL",
    latLng: [41.8781, -87.6298],
    name: "Chicago",
    salesVolume: 1700,
    restaurantType: "fine_dining",
  },
  {
    code: "US-TX",
    latLng: [29.7604, -95.3698],
    name: "Houston",
    salesVolume: 1000,
    restaurantType: "casual_dining",
  },
  {
    code: "US-CO",
    latLng: [39.7392, -104.9903],
    name: "Denver",
    salesVolume: 30,
    restaurantType: "fast_food",
  },
  {
    code: "US-MN",
    latLng: [44.9778, -93.265],
    name: "Minneapolis",
    salesVolume: 900,
    restaurantType: "fast_food",
  },
  {
    code: "US-CA",
    latLng: [37.7749, -122.4194],
    name: "San Francisco",
    salesVolume: 900,
    restaurantType: "fine_dining",
  },
  {
    code: "US-TX",
    latLng: [32.7767, -96.797],
    name: "Dallas",
    salesVolume: 670,
    restaurantType: "casual_dining",
  },
  {
    code: "US-WA",
    latLng: [47.6062, -122.3321],
    name: "Seattle",
    salesVolume: 450,
    restaurantType: "cafe",
  },
  {
    code: "US-FL",
    latLng: [25.7617, -80.1918],
    name: "Miami",
    salesVolume: 999,
    restaurantType: "fast_food",
  },
  {
    code: "US-AZ",
    latLng: [33.4484, -112.074],
    name: "Phoenix",
    salesVolume: 499,
    restaurantType: "fast_food",
  },
];

const getMarkerSize = (salesVolume) => {
  return 5 + (salesVolume / 100) * 1;
};

const getMarkerColor = (salesVolume) => {
  if (salesVolume > 1000) return "rgba(0, 255, 0, 0.5)";
  if (salesVolume > 500) return "rgba(0, 0, 255, 0.5)";
  return "red";
};

const markers = initialMarkers.map((marker) => ({
  ...marker,
  ...restaurantStyles[marker.restaurantType],
  style: { fill: getMarkerColor(marker.salesVolume), r: getMarkerSize(marker.salesVolume) },
}));

const Vectormap = (props) => {
  const [updatedMarkers, setUpdatedMarkers] = useState(markers);

  useEffect(() => {
    setUpdatedMarkers(markers);
  }, [markers]);

  const statesWithSalesOrMarkers = new Set([
    ...Object.keys(salesData),
    ...initialMarkers.map((marker) => marker.code),
  ]);

  const specificRegionStyle = Array.from(statesWithSalesOrMarkers).reduce((acc, code) => {
    acc[code] = { scale: "red" };
    return acc;
  }, {});

  const handleRegionTipShow = (e, el, code) => {
    if (!el) {
      console.error("Tooltip element is not defined.");
      return;
    }
    if (!salesData[code]) {
      e.preventDefault();
      return;
    }
    const tooltipContent = `
      <div>
        <p>Name: ${el.text()}</p>
        <p>Sales: ${salesData[code]}</p>
        <p>Type: ${initialMarkers.find((marker) => marker.code === code)?.restaurantType}</p>
      </div>
    `;
    el.html(tooltipContent);
    el.css({ marginLeft: "75px" });
  };

  return (
    <div style={{ width: props.width, height: "500px", zIndex: 2 }}>
      <VectorMap
        map="us_aea"
        backgroundColor="transparent"
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        markers={updatedMarkers}
        onRegionTipShow={handleRegionTipShow}
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
            fill: "#2938bc",
          },
          selectedHover: {},
        }}
        regionsSelectable={false}
        series={{
          regions: [
            {
              values: salesData,
              scale: ["#50a952"],
              normalizeFunction: "polynomial",
            },
          ],
        }}
        containerClassName="map"
        panOnDrag={true}
      />
    </div>
  );
};

export default Vectormap;
