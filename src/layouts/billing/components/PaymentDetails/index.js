import React, { useEffect, useState } from "react";
import { Grid, Card, Chip } from "@mui/material";
import { toast } from "react-toastify";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MasterCard from "../MasterCard";
import PaymentDialog from "../PaymentDialog";
import api from "../../../../axios";

const PaymentDetails = () => {
  const [payemntDetails, setPaymentDetails] = useState();
  const [open, setOpen] = useState();

  const handleOnSubmit = async (values) => {
    try {
      const { data: response } = await api.post("payment/details", values);
      setPaymentDetails(response);
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await api.get("payment/details");
        setPaymentDetails(response);
      } catch (error) {
        console.error("Error:", error.response.data.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {payemntDetails && (
        <Card sx={{ my: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" mb={2}>
                Payment Details
              </MDTypography>
              <MDBox maxWidth="450px">
                <MasterCard
                  number={`************${payemntDetails.last4}`}
                  holder={payemntDetails.name}
                  expires={`${payemntDetails.expiry_month}/${payemntDetails.expiry_year
                    .toString()
                    .slice(2, 4)}`}
                  cardType={payemntDetails.card_type}
                  onEdit={() => setOpen(true)}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" mb={1}>
                Subscription Details
              </MDTypography>
              <MDBox display="flex" gap={2}>
                <MDTypography mb={1}>
                  {`${payemntDetails.subscription.frequency} ${payemntDetails.subscription.amount}$`}
                </MDTypography>
                <Chip
                  label={payemntDetails.subscription.status}
                  variant="outlined"
                  color={payemntDetails.subscription.status === "active" ? "success" : "error"}
                />
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      )}
      {open && (
        <PaymentDialog
          title={
            <MDTypography variant="h5" sx={{ textAlign: "center" }}>
              Update your payment details
            </MDTypography>
          }
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleOnSubmit}
        />
      )}
    </>
  );
};

export default PaymentDetails;
