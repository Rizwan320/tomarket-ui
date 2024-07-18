import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import pattern from "assets/images/illustrations/pattern-tree.svg";
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaCardLogo from "assets/images/logos/visa.png";
import creditCardLogo from "assets/images/logos/card.png";

const getCardType = (firstFourDigits) => {
  if (/^4/.test(firstFourDigits)) {
    return "Visa";
  } else if (
    /^5[1-5]/.test(firstFourDigits) ||
    /^(222[1-9]|22[3-9][0-9]|2[3-6][0-9][0-9]|27[0-1][0-9]|2720)/.test(firstFourDigits)
  ) {
    return "MasterCard";
  } else {
    return "default";
  }
};

const CardType = {
  MasterCard: masterCardLogo,
  Visa: visaCardLogo,
  default: creditCardLogo,
};

function MasterCard({ color, number, holder, expires, cvv }) {
  const numbers = number ? [...number] : [..."0000000000000000"];
  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");
  const type = getCardType(num1);

  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2}>
        <MDBox color="white" p={1} lineHeight={0} display="inline-block">
          <Icon fontSize="default">wifi</Icon>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 5, pb: 1 }}>
            {num1}&nbsp;&nbsp;&nbsp;{num2}&nbsp;&nbsp;&nbsp;{num3}&nbsp;&nbsp;&nbsp;{num4}
          </MDTypography>
          {cvv && (
            <MDBox lineHeight={1} mr={2}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                CVV
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {cvv || "..."}
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" gap={1}>
          <MDBox mr={3} lineHeight={1} width="70%">
            <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
              Card Holder
            </MDTypography>
            <MDTypography variant="h6" color="white" fontWeight="medium" textTransform="capitalize">
              {holder}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="20%" gap={2}>
            <MDBox lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Expires
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {expires}
              </MDTypography>
            </MDBox>
            <MDBox component="img" src={CardType[type]} alt="master card" width="60%" mt={1} />
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

MasterCard.defaultProps = {
  color: "dark",
};

MasterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  number: PropTypes.string.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
};

export default MasterCard;
