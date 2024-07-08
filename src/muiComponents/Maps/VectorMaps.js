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

const getMarkerSize = (salesVolume) => {
  return 5 + (salesVolume / 100) * 1;
};

const getMarkerColor = (salesVolume) => {
  if (salesVolume > 1000) return "rgba(0, 255, 0, 0.5)";
  if (salesVolume > 500) return "rgba(0, 0, 255, 0.5)";
  return "red";
};

const Vectormap = ({ data, width, color }) => {
  const [updatedMarkers, setUpdatedMarkers] = useState(data);

  useEffect(() => {
    setUpdatedMarkers(getMarkersFromBuyers());
  }, [data]);

  const getMarkersFromBuyers = () => {
    return data
      ?.filter(
        (buyer) =>
          buyer.showOnMap &&
          buyer.location &&
          buyer.location.lat !== "INVALID" &&
          buyer.location.long !== "INVALID"
      )
      .map((buyer) => {
        const tooltipContent = `
          <div>
            <p>${buyer?.displayName || buyer?.companyName || ""}</p>
            <p>${buyer?.location?.line1}&nbsp;${buyer?.location?.city}&nbsp;${
          buyer?.location?.countrySubDivisionCode
        }</p>
          </div>
        `;
        return {
          latLng: [parseFloat(buyer.location.lat), parseFloat(buyer.location.long)],
          name: buyer?.displayName || buyer?.companyName || "",
          style: {
            fill: getMarkerColor(buyer.salesVolume),
            r: getMarkerSize(buyer.salesVolume),
          },
          tooltip: tooltipContent,
        };
      });
  };

  const handleRegionTipShow = (e, el, code) => {
    if (!el) {
      console.error("Tooltip element is not defined.");
      return;
    }
    const tooltipContent = `
      <div>
        <p>${el.text()}</p>
      </div>
    `;
    el.html(tooltipContent);
    el.css({ marginLeft: "75px" });
  };

  const handleMarkerTipShow = (e, label, index) => {
    label.html(updatedMarkers[index].tooltip);
  };

  return (
    <div style={{ width, height: "500px", zIndex: 2 }}>
      <VectorMap
        map="us_aea"
        backgroundColor="transparent"
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        markers={updatedMarkers}
        onMarkerTipShow={handleMarkerTipShow}
        onRegionTipShow={handleRegionTipShow}
        regionStyle={{
          initial: {
            fill: color,
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
