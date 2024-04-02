import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";
import pxToRem from "assets/theme/functions/pxToRem";
import linearGradient from "assets/theme/functions/linearGradient";

const { white, gradients, grey, transparent, success } = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

const switchButton = {
  defaultProps: {
    disableRipple: false,
  },

  styleOverrides: {
    switchBase: {
      color: success.main,

      "&:hover": {
        backgroundColor: transparent.main,
      },

      "&.Mui-checked": {
        color: success.main,

        "&:hover": {
          backgroundColor: transparent.main,
        },

        "& .MuiSwitch-thumb": {
          borderColor: `${success.main} !important`,
        },

        "& + .MuiSwitch-track": {
          backgroundColor: `${success.main} !important`,
          borderColor: `${success.main} !important`,
          opacity: 1,
        },
      },

      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: "0.3 !important",
      },

      "&.Mui-focusVisible .MuiSwitch-thumb": {
        backgroundImage: linearGradient(gradients.info.main, gradients.info.state),
      },
    },

    thumb: {
      backgroundColor: white.main,
      boxShadow: md,
      border: `${borderWidth[1]} solid ${grey[400]}`,
    },

    track: {
      width: pxToRem(32),
      height: pxToRem(15),
      backgroundColor: grey[400],
      border: `${borderWidth[1]} solid ${grey[400]}`,
      opacity: 1,
    },

    checked: {},
  },
};

export default switchButton;
