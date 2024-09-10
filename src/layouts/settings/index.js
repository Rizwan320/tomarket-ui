import { useState } from "react";
import { Card, CardContent, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import ConfirmationDialog from "layouts/contentOrganization/components/Modals";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import api from "../../axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("daily");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();
  const handleCheckboxChange = (option) => () => {
    setSelectedOption(option);
  };

  const handleAccountDelete = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDialogOpen(false);
    try {
      const res = await api.delete(`/accounts`);
      console.log(res);
      toast.success("Account deleted successfully");
      logout();
      navigate("/authentication/sign-in");
    } catch (error) {
      console.error("Error deleting Account:", error);
      toast.error("Error deleting the Account");
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <MDTypography variant="h4" gutterBottom>
            Billing/Payment
          </MDTypography>
          <MDBox></MDBox>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <MDTypography variant="h4" gutterBottom>
            Notifications
          </MDTypography>
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOption === "daily"}
                  onChange={handleCheckboxChange("daily")}
                />
              }
              label="Daily"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOption === "weekly"}
                  onChange={handleCheckboxChange("weekly")}
                />
              }
              label="Weekly"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOption === "monthly"}
                  onChange={handleCheckboxChange("monthly")}
                />
              }
              label="Monthly"
            />
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4, border: "2px solid red", borderRadius: "12px" }}>
        <CardContent>
          <MDTypography variant="h4" gutterBottom>
            Danger Zone
          </MDTypography>
          <MDButton variant="contained" color="error" onClick={handleAccountDelete}>
            Delete Account
          </MDButton>
        </CardContent>
      </Card>
      <ConfirmationDialog
        text="Account"
        isOpen={dialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default Settings;
