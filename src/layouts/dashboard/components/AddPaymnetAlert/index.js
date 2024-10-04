import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";

const AddPaymnetAlert = ({ onClick }) => (
  <MDAlert color="secondary" dismissible>
    <MDBox display="flex" justifyContent="center" alignItems="center" gap={2}>
      <MDTypography variant="h6" color="light">
        🌟 Heads up! Make sure to add your payment details
        <MDButton onClick={onClick} color="success" size="small" variant="text">
          here
        </MDButton>
        {"to continue."}
      </MDTypography>
    </MDBox>
  </MDAlert>
);

export default AddPaymnetAlert;
