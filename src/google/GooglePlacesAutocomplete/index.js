import React, { useRef, useEffect, useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Field } from "formik";
import MDInput from "components/MDInput";

const libraries = ["places"];

const GooglePlacesAutocomplete = ({
  onPlaceSelected,
  value,
  onChange,
  label,
  disabled = false,
}) => {
  const inputRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
    loadScriptUrlOptions: {
      async: true,
      defer: true,
    },
  });

  const autocompleteOptions = useMemo(
    () => ({
      types: ["address"],
    }),
    []
  );

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        autocompleteOptions
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    }
  }, [isLoaded, onPlaceSelected, autocompleteOptions]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Field
      inputRef={inputRef}
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ marginTop: 2 }}
      as={MDInput}
      disabled={disabled}
    />
  );
};

export default GooglePlacesAutocomplete;
