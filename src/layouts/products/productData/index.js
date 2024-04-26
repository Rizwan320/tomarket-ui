import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { PRODUCT_DATA } from "./Products";

const productData = (tableColumns) => {
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

  const allColumns = {
    logo: { Header: "Logo", accessor: "logo", align: "left" },
    name: { Header: "Name", accessor: "name", align: "center" },
    sku: { Header: "SKU", accessor: "sku", align: "center" },
    description: { Header: "Description", accessor: "description", align: "center" },
    unit: { Header: "Unit", accessor: "unit", align: "center" },
    price: { Header: "Price", accessor: "price", align: "center" },
    unitSoldLastMonth: {
      Header: "Unit Sold Last Month",
      accessor: "unitSoldLastMonth",
      align: "center",
    },
    unitSoldLastWeek: {
      Header: "Unit Sold Last Week",
      accessor: "unitSoldLastWeek",
      align: "center",
    },
    category: { Header: "Category", accessor: "category", align: "center" },
    largestBuyer: { Header: "Largest Buyer", accessor: "largestBuyer", align: "center" },
    bestSalesRep: { Header: "Best Sales Rep", accessor: "bestSalesRep", align: "center" },
    bestMarket: { Header: "Best Market", accessor: "bestMarket", align: "center" },
    highestSalesDay: { Header: "Highest Sales Day", accessor: "highestSalesDay", align: "center" },
    highestSalesMonth: {
      Header: "Highest Sales Month",
      accessor: "highestSalesMonth",
      align: "center",
    },
    inventoryAge: { Header: "Inventory Age", accessor: "inventoryAge", align: "center" },
  };

  const filteredColumns = Object.values(allColumns).filter((column) =>
    tableColumns?.includes(column.accessor)
  );

  const renderBuyersComponent = (column, row) => {
    const componentsMap = {
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
      largestBuyer: <Name name={row.largestBuyer} />,
      bestSalesRep: <Name name={row.bestSalesRep} />,
      bestMarket: <Name name={row.bestMarket} />,
      highestSalesDay: <Name name={row.highestSalesDay} />,
      highestSalesMonth: <Name name={row.highestSalesMonth} />,
      inventoryAge: <Name name={row.inventoryAge} />,
    };

    return componentsMap[column] || null;
  };

  return {
    columns: filteredColumns,
    rows: PRODUCT_DATA.map((row) => {
      return tableColumns?.reduce((acc, column) => {
        acc[column] = renderBuyersComponent(column, row);
        return acc;
      }, {});
    }),
  };
};

export default productData;
