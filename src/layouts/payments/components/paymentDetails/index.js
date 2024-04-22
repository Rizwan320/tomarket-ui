import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import MDTypography from "components/MDTypography";
import { PAYMENT_DATA } from "layouts/payments/components/data/PaymentData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.black,
  fontWeight: "bold",
}));

const PaymentDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const payment = PAYMENT_DATA.find((p) => p.invoiceNumber === id);

  if (!payment) {
    return (
      <Typography variant="h6" color="error">
        Invoice not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{ p: isXs ? 2 : 4, my: 4, border: "1px solid white", borderRadius: "10px" }}
      >
        <Grid container justifyContent="space-between" spacing={isXs ? 1 : 3}>
          <Grid sx={{ display: "flex", flexDirection: "column", gap: "8px" }} item xs={12} md={6}>
            <MDTypography color="success" variant="h6">
              {payment.businessName}
            </MDTypography>
            <Typography variant="body2">Company ID: {payment.companyId}</Typography>
            <Typography variant="body2">Tel: {payment.contactName}</Typography>
          </Grid>
          <Grid
            sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            item
            xs={12}
            md={6}
            textAlign={isXs ? "left" : "right"}
          >
            <MDTypography color="success" variant="h6">
              Billed to: {payment.contactName}
            </MDTypography>
            <Typography variant="body2">Email: {payment.contactEmail}</Typography>
            <Typography variant="body2">Invoice #{payment.invoiceNumber}</Typography>
            <Typography variant="body2">Date: {payment.date}</Typography>
            <Typography variant="body2">Due Date: {payment.dueDate}</Typography>
          </Grid>
        </Grid>

        <TableContainer component={Paper} elevation={0} sx={{ my: 3 }}>
          <Table aria-label="invoice details">
            <TableBody>
              <TableRow>
                <StyledTableCell component="th" scope="row" padding="none">
                  Description
                </StyledTableCell>
                <StyledTableCell align="right" colSpan={3}>
                  {payment.description}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell component="th" scope="row" padding="none">
                  Original Amount
                </StyledTableCell>
                <StyledTableCell align="right" colSpan={3}>
                  {payment.originalAmount}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell component="th" scope="row" padding="none">
                  Amount Paid
                </StyledTableCell>
                <StyledTableCell align="right" colSpan={3}>
                  {payment.amountPaid}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell component="th" scope="row" padding="none">
                  Amount Due
                </StyledTableCell>
                <StyledTableCell align="right" colSpan={3}>
                  {payment.amountDue}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell component="th" scope="row" padding="none">
                  Marketing Needs
                </StyledTableCell>
                <StyledTableCell align="right" colSpan={3}>
                  {payment.marketingNeeds}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell component="th" scope="row" padding="none">
                  Health
                </StyledTableCell>
                <StyledTableCell align="right" colSpan={3}>
                  {payment.health}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <MDTypography color="success" variant="h6">
            Payment Details
          </MDTypography>
          <Typography variant="body1">Bank Account: {payment.bankAccount}</Typography>
          <Typography variant="body1">Routing Number: {payment.routingNumber}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentDetails;
