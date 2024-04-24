import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { PRODUCT_DATA } from "./Products";

const productData = () => {
  const Logo = ({ name }) => (
    <MDBox display="flex" alignItems="left" lineHeight={1}>
      <MDAvatar src={name} size="sm" />
    </MDBox>
  );

  const Name = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption" fontWeight="medium" lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Logo", accessor: "logo", align: "left" },
      { Header: "Name", accessor: "name", align: "center" },
      { Header: "SKU", accessor: "sku", align: "center" },
      { Header: "Description", accessor: "description", align: "center" },
      { Header: "Unit", accessor: "unit", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Unit Sold Last Month", accessor: "unitSoldLastMonth", align: "center" },
      { Header: "Unit Sold Last Week", accessor: "unitSoldLastWeek", align: "center" },
      { Header: "Category", accessor: "category", align: "center" },
    ],
    rows: PRODUCT_DATA.map((row) => ({
      id: row.id,
      logo: <Logo name={row.logo} />,
      name: <Name name={row.name} />,
      sku: <Name name={row.sku} />,
      unit: <Name name={row.unit} />,
      description: <Name name={row.description} />,
      price: <Name name={row.price} />,
      unitSoldLastMonth: <Name name={row.unitSoldLastMonth} />,
      unitSoldLastWeek: <Name name={row.unitSoldLastWeek} />,
      category: <Name name={row.category} />,
    })),
  };
};

export default productData;
