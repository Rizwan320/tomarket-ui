import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Container, Grid, TextField } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import api from "../../../axios";
import { toast } from "react-toastify";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";

const EditBuyer = () => {
  const { id } = useParams();

  const [buyer, setBuyer] = useState({
    displayName: "",
    email: "",
  });

  const [location, setLocation] = useState({
    city: "",
    country: "",
    line1: "",
  });

  const [sales, setSales] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const response = await api.get(`/buyers/${id}`);
        const { displayName, email, location, sales } = response?.data?.data;
        setBuyer({
          displayName: displayName || "",
          email: email || "",
        });
        if (location) {
          const { city, country, line1 } = location;
          setLocation({
            city: city || "",
            country: country || "",
            line1: line1 || "",
          });
        }
        setSales(sales || []);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchBuyer();
  }, [id]);

  const handleNoteChange = (e) => setNote(e.target.value);

  const handleSaveNote = async () => {};

  const columns = [
    { Header: "Date", accessor: "invoiceDate", align: "left" },
    { Header: "Product", accessor: "productName", align: "left" },
    { Header: "Quantity", accessor: "quantity", align: "center" },
    { Header: "Distributor", accessor: "buyerName", align: "left" },
  ];

  const rows = sales.map((sale) => ({
    invoiceDate: sale.invoiceDate,
    productName: sale.productName,
    quantity: sale.quantity,
    buyerName: sale.buyerName,
  }));

  const locationDisplay =
    location.line1 || location.city || location.country
      ? `${location.line1 || ""}, ${location.city || ""}, ${location.country || ""}`
      : "Not Available";

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                mt={2}
              >
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <MDTypography variant="h4" gutterBottom>
                    Buyer Details
                  </MDTypography>
                  <MDAvatar bgColor="success" size="xl" shadow="md" alt="Buyer Logo" />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="body2" fontWeight="small">
                    {buyer.description || "No Description Available"}
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="h6" mt={3}>
                    Business Type:
                  </MDTypography>
                  <MDTypography fontWeight="small" variant="body2">
                    {buyer.buisnessType || "Not Available"}
                  </MDTypography>
                  <MDTypography variant="h6">Display Name:</MDTypography>
                  <MDTypography variant="body2" fontWeight="light">
                    {buyer.displayName || "Not Available"}
                  </MDTypography>
                  <MDTypography variant="h6">Email:</MDTypography>
                  <MDTypography variant="body2" fontWeight="light">
                    {buyer.email || "Not Available"}
                  </MDTypography>
                  <MDTypography variant="h6">Location:</MDTypography>
                  <MDTypography variant="body2" fontWeight="light">
                    {locationDisplay}
                  </MDTypography>
                  <MDTypography variant="h6">Social Links:</MDTypography>
                  <MDTypography variant="body2" fontWeight="light">
                    {buyer.socialLinks || "Not Available"}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <MDTypography variant="h4" gutterBottom>
            Sales Data
          </MDTypography>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={true}
            isSorted={true}
            noEndBorder
            showCheckbox={false}
            entriesPerPage={false}
            sx={{ overflowX: "auto" }}
          />
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <MDTypography variant="h4" gutterBottom>
            Add Note
          </MDTypography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={note}
            onChange={handleNoteChange}
            placeholder="Enter note here"
            sx={{ mb: 2, backgroundColor: "#fff" }}
          />
          <MDButton variant="contained" color="success" onClick={handleSaveNote}>
            Save Note
          </MDButton>
        </CardContent>
      </Card>
    </>
  );
};

export default EditBuyer;
