import React, { useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Field } from "formik";
import MDInput from "components/MDInput";

const libraries = ["places"];
const MAP_KEY = "AIzaSyAC3encvyG1cRV9N9ieotVz8iypkAVU6OI";

const GooglePlacesAutocomplete = ({ onPlaceSelected, value, onChange }) => {
  const inputRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
    libraries,
    loadScriptUrlOptions: {
      async: true,
      defer: true,
    },
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const options = {
        types: ["address"],
      };

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, options);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    }
  }, [isLoaded, onPlaceSelected]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Field
      inputRef={inputRef}
      label="Mailing Address"
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ marginTop: 2 }}
      as={MDInput}
    />
  );
};

export default GooglePlacesAutocomplete;
