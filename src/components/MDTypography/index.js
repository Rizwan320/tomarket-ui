import { forwardRef } from "react";

import PropTypes from "prop-types";

import MDTypographyRoot from "components/MDTypography/MDTypographyRoot";

import { useMaterialUIController } from "context";

const MDTypography = forwardRef(
  (
    {
      color,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      fontSize,
      children,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <MDTypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode,
          fontSize, // Pass fontSize to ownerState
        }}
      >
        {children}
      </MDTypographyRoot>
    );
  }
);

MDTypography.defaultProps = {
  color: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
  fontSize: "inherit", // Add default fontSize
};

MDTypography.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
  fontSize: PropTypes.string, // Add fontSize prop validation
};

export default MDTypography;
