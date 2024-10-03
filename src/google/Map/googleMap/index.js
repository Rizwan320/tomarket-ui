import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 39.5,
  lng: -98.35,
};

const GoogleMaps = ({ data, selectedBuyer }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
        {selectedBuyer ? (
          <Marker
            key={selectedBuyer?.id}
            position={{
              lat: parseFloat(selectedBuyer?.lat),
              lng: parseFloat(selectedBuyer?.long),
            }}
          />
        ) : (
          data?.map((marker) => (
            <Marker
              key={marker?.id}
              position={{
                lat: parseFloat(marker?.lat),
                lng: parseFloat(marker?.long),
              }}
            />
          ))
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
