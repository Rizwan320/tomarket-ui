import { Modal } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import UploadFile from "../UploadFile";
import MDButton from "components/MDButton";
import CsvDownloader from "react-csv-downloader";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const csvStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  margin: "10px",
  padding: 12,
  border: "2px solid",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};

const closeIconStyle = {
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    cursor: "pointer",
  },
};

const displaySpaceBetween = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const displayFlexEnnd = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
};

const UploadFileModal = ({
  open,
  handleClose,
  fileName = "TM-buyer-upload-template",
  heading,
  handleModalClose,
  handleSubmit,
  columns,
  data = [],
}) => {
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <MDBox sx={style}>
        <MDBox sx={displaySpaceBetween}>
          <MDBox sx={displaySpaceBetween}>
            <MDTypography id="modal-title" variant="h6" component="h2">
              {heading}
            </MDTypography>
            <CsvDownloader
              style={csvStyle}
              filename={fileName}
              extension=".xlsx"
              separator=","
              wrapColumnChar=""
              columns={columns}
              datas={data}
              text="DOWNLOAD"
            />
          </MDBox>

          <CloseIcon sx={closeIconStyle} onClick={handleModalClose} />
        </MDBox>

        <UploadFile open={open} onClose={handleClose} />
        <MDBox sx={displayFlexEnnd}>
          <MDButton onClick={handleSubmit} variant="contained" color="success" sx={{ mt: 2 }}>
            Submit
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
};

export default UploadFileModal;
