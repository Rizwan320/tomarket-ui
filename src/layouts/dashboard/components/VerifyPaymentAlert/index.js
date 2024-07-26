import React from "react";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";

const VerifyPaymnetAlert = ({ onClick }) => {
  return (
    <MDAlert color="error">
      <MDBox display="flex" justifyContent="center" alignItems="center" gap={2}>
        <MDTypography variant="h6" color="light">
          {"🚀 Your payment has been declined please verify you payment details and "}
          <MDButton onClick={onClick} color="" size="small" variant="text">
            retry
          </MDButton>
        </MDTypography>
      </MDBox>
    </MDAlert>
  );
};

export default VerifyPaymnetAlert;
