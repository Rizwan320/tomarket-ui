import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import { PAYMENT_DATA } from "./PaymentData";

const data = () => {
  const Amount = ({ amount }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {amount}
    </MDTypography>
  );

  const PaymentButton = ({ amountDue, invoiceNumber }) => {
    const amount = parseFloat(amountDue.replace(/[$,]/g, ""));

    return (
      <MDBox ml={-1}>
        <MDButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Paying ${amountDue} for invoice ${invoiceNumber}`);
          }}
          variant="contained"
          disabled={amount <= 0}
          color="success"
          size="small"
        >
          Pay Now
        </MDButton>
      </MDBox>
    );
  };

  const HistoricalPayment = ({ paid }) => (
    <MDBox ml={-1}>
      <MDTypography variant="caption" fontWeight="medium" color="success">
        {paid}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Invoice #", accessor: "invoiceNumber", align: "left" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "Due Date", accessor: "dueDate", align: "center" },
      { Header: "Original Amount", accessor: "originalAmount", align: "center" },
      { Header: "Amount Due", accessor: "amountDue", align: "center" },
      { Header: "Amount Paid", accessor: "amountPaid", align: "center" },
      { Header: "Payment", accessor: "payment", align: "center" },
      { Header: "Description", accessor: "description", align: "center" },
    ],
    rows: PAYMENT_DATA.map((row) => ({
      invoiceNumber: <Amount amount={row.invoiceNumber} />,
      date: <Amount amount={row.date} />,
      dueDate: <Amount amount={row.dueDate} />,
      originalAmount: <Amount amount={row.originalAmount} />,
      amountDue: <Amount amount={row.amountDue} />,
      amountPaid: <HistoricalPayment paid={row.amountPaid} />,
      payment: <PaymentButton amountDue={row.amountDue} invoiceNumber={row.invoiceNumber} />,
      description: <Amount amount={row.description} />,
    })),
  };
};

export default data;
