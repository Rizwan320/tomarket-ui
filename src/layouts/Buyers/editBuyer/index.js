import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { Card, CardContent, Grid, TextField } from "@mui/material";

import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import GooglePlacesAutocomplete from "google/GooglePlacesAutocomplete";

import api from "../../../axios";
import { useUser } from "context/userContext";

const EditBuyer = () => {
  const { id } = useParams();
  const {
    user: { isImpersonating },
  } = useUser();

  const validationSchema = Yup.object({
    mailingAddress: Yup.string().required("Mailing Address is required"),
  });

  const [buyer, setBuyer] = useState({
    displayName: "",
    email: "",
    description: "",
    buisnessType: "",
    socialLinks: "",
    location: {
      city: "",
      country: "",
      line1: "",
    },
  });

  const [sales, setSales] = useState([]);
  const [note, setNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchBuyer();
  }, [id]);

  const fetchBuyer = async () => {
    try {
      const response = await api.get(`/buyers/${id}`);
      const { displayName, email, location, sales } = response?.data;
      setBuyer({
        displayName: displayName || "",
        email: email || "",
        location: {
          city: location?.city || "",
          country: location?.country || "",
          line1: location?.line1 || "",
        },
      });
      setSales(sales || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleNoteChange = (e) => setNote(e.target.value);

  const handleSaveNote = async () => {};

  const columns = [
    { Header: "Product Ordered", accessor: "productOrdered", align: "left" },
    { Header: "Distributor", accessor: "distributor", align: "left" },
    { Header: "Sku", accessor: "sku", align: "left" },
    { Header: "Quantity", accessor: "quantity", align: "center" },
    { Header: "last Ordered", accessor: "lastOrdered", align: "left" },
  ];

  const rows = sales.map((sale) => ({
    productOrdered: sale.productName,
    distributor: sale.buyerName,
    sku: sale.sku,
    quantity: sale.quantity,
    lastOrdered: sale.invoiceDate,
  }));

  const columnsTotalProducts = [
    { Header: "Product", accessor: "productName", align: "left" },
    { Header: "Total", accessor: "totalQuantity", align: "center" },
  ];

  const rowsTotalProducts = sales.map((sale) => ({
    productName: sale.productName,
    totalQuantity: sale.totalQuantity,
  }));

  const handlePlaceSelected = (place, setFieldValue) => {
    setFieldValue("mailingAddress", place.formatted_address);
  };

  function getLocationObject(mailingAddress) {
    const addressParts = mailingAddress.split(",");
    const line1 = addressParts[0] ? addressParts[0].trim() : "";
    const city = addressParts.length >= 3 ? addressParts[addressParts.length - 3].trim() : "";
    const countrySubDivisionCode =
      addressParts.length >= 2 ? addressParts[addressParts.length - 2].split(" ")[0].trim() : "";
    const postalCode =
      addressParts.length >= 2
        ? addressParts[addressParts.length - 2].match(/\d+/)
          ? addressParts[addressParts.length - 2].match(/\d+/)[0]
          : ""
        : "";
    const country = addressParts.length >= 1 ? addressParts[addressParts.length - 1].trim() : "";

    return {
      line1,
      city,
      countrySubDivisionCode,
      postalCode,
      country,
    };
  }
  const handleSaveLocation = async (values, { setSubmitting }) => {
    try {
      const locationData = getLocationObject(values.mailingAddress);
      await api.patch(`locations/buyers/${id}`, locationData);
      fetchBuyer();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setSubmitting(false);
      setIsAdding(false);
    }
  };

  const addingLocation = () => setIsAdding(true);

  const initialValues = {
    mailingAddress:
      `${buyer.location.line1 || ""} ${buyer.location.city || ""} ${
        buyer.location.country || ""
      }`.trim() || "",
  };

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
                    {buyer.location.line1 || buyer.location.city || buyer.location.country ? (
                      <>
                        {buyer?.location?.line1 && `${buyer.location.line1}, `}
                        {buyer?.location?.city && `${buyer.location.city}, `}
                        {buyer?.location?.country}
                      </>
                    ) : (
                      "Not Available"
                    )}
                  </MDTypography>
                  <MDTypography variant="h6">Social Links:</MDTypography>
                  <MDTypography variant="body2" fontWeight="light">
                    {buyer.socialLinks || "Not Available"}
                  </MDTypography>
                </MDBox>
              </MDBox>
              {isImpersonating && location && (
                <MDBox>
                  <MDBox>
                    <MDButton variant="gradient" color="success" onClick={addingLocation}>
                      {buyer.location.city ? "Update Location" : "Add Location"}
                    </MDButton>
                  </MDBox>
                  <MDBox>
                    {isAdding && (
                      <Formik
                        initialValues={initialValues || ""}
                        validationSchema={validationSchema}
                        onSubmit={handleSaveLocation}
                      >
                        {({ isSubmitting, setFieldValue }) => (
                          <Form>
                            <MDBox mb={2}>
                              <Field name="mailingAddress">
                                {({ field, form }) => (
                                  <GooglePlacesAutocomplete
                                    value={field.value}
                                    onChange={field.onChange(field.name)}
                                    onPlaceSelected={(place) =>
                                      handlePlaceSelected(place, form.setFieldValue)
                                    }
                                    label="Address"
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="mailingAddress"
                                component="h6"
                                style={{ color: "red" }}
                              />
                            </MDBox>
                            <MDBox
                              mt={4}
                              mb={1}
                              display="flex"
                              flexDirection="column"
                              justifyContent="center"
                              alignItems="flex-end"
                            >
                              <MDButton
                                type="submit"
                                variant="gradient"
                                color="success"
                                disabled={isSubmitting}
                              >
                                Save
                              </MDButton>
                            </MDBox>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </MDBox>
                </MDBox>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <MDTypography variant="h4" gutterBottom>
            History
          </MDTypography>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
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
            Products Ordered
          </MDTypography>
          <DataTable
            table={{ columns: columnsTotalProducts, rows: rowsTotalProducts }}
            showTotalEntries={false}
            isSorted={false}
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
