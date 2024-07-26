import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useUser } from "context/userContext";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";

const AddPaymnetAlert = ({ onClick, trialStartDate }) => {
  let trialEndDate;
  if (trialStartDate) {
    trialEndDate = new Date(trialStartDate);
    trialEndDate.setDate(trialEndDate.getDate() + 30);
  }

  return (
    <MDAlert color="secondary" dismissible>
      <MDBox display="flex" justifyContent="center" alignItems="center" gap={2}>
        <MDTypography variant="h6" color="light">
          🌟 Heads up! You are currently enjoying a free trial
          {trialEndDate ? ` until ${trialEndDate.toLocaleDateString()}` : ""}. Make sure to add your
          payment details
          <MDButton onClick={onClick} color="success" size="small" variant="text">
            here
          </MDButton>
          {"to continue."}
        </MDTypography>
      </MDBox>
    </MDAlert>
  );
};

export default AddPaymnetAlert;
