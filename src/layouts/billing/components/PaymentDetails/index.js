import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Grid, Card, Chip } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Loader from "components/Loader";

import MasterCard from "../MasterCard";
import PaymentDialog from "../PaymentDialog";

import api from "../../../../axios";

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState();
  const [open, setOpen] = useState();
  const [isActive, setIsActive] = useState("inactive");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (values) => {
    try {
      const { data } = await api.post("payment/details", values);
      setPaymentDetails(data);
      setOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await api.get("payment/details");
        setPaymentDetails(response);
        response?.last4 ? setIsActive("active") : setIsActive("inactive");
      } catch (error) {
        setIsActive("inactive");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Card sx={{ my: 2, p: 2, mb: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MDTypography variant="h6" mb={2}>
              Payment Details
            </MDTypography>
            <MDBox maxWidth="450px">
              <MasterCard
                number={`************${paymentDetails?.last4 ?? "****"}`}
                holder={paymentDetails?.name || ""}
                expires={`${paymentDetails?.expiry_month || ""}/${
                  paymentDetails?.expiry_year?.toString()?.slice(2, 4) || ""
                }`}
                cardType={paymentDetails?.card_type}
                onEdit={isActive === "active" ? () => setOpen(true) : null}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDTypography variant="h6" mb={1}>
              Subscription Details
            </MDTypography>
            <MDBox>
              <Chip
                label={isActive}
                variant="outlined"
                color={isActive === "active" ? "success" : "error"}
              />
            </MDBox>
            {/* <MDBox display="flex" gap={2}>
                <MDTypography mb={1}>
                  {`${paymentDetails.subscription.frequency} ${paymentDetails.subscription.amount}$`}
                </MDTypography>
                <Chip
                  label={paymentDetails.subscription.status}
                  variant="outlined"
                  color={paymentDetails.subscription.status === "active" ? "success" : "error"}
                />
              </MDBox> */}
          </Grid>
        </Grid>
      </Card>
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
