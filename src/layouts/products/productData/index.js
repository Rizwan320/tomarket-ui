import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import api from "./../../../axios";
import { toast } from "react-toastify";

const productData = (tableColumns) => {
  const [tableData, setTableData] = useState([]);
  const Logo = ({ name }) => (
    <MDBox display="flex" alignItems="left" lineHeight={1}>
      <MDAvatar src={name} alt="profile-image" size="sm" bgColor="light" />
    </MDBox>
  );

  const Name = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption" fontWeight="medium" lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        if (response.data) {
          const product = response.data.map((row) => ({
            ...row,
            id: row.id,
            name: row.name,
            description: row.description,
            sku: row.sku,
            price: row.price,
            unit: row.unit,
            productPicture: row.productPicture,
            latestBuyer: row.latestBuyer,
            totalSoldWeek: row.totalSoldWeek,
            totalSoldMonth: row.totalSoldMonth,
          }));
          setTableData(product);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProducts();
  }, []);

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
    productPicture: { Header: "Product Picture", accessor: "productPicture", align: "center" },
    latestBuyer: { Header: "Latest Buyer", accessor: "latestBuyer", align: "center" },
    totalSoldWeek: { Header: "Total Sold Week", accessor: "totalSoldWeek", align: "center" },
    totalSoldMonth: { Header: "Total Sold Month", accessor: "totalSoldMonth", align: "center" },
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
      unit: <Name name={row?.productSaleUnits[0]?.salesUnit?.abbreviation} />,
      description: <Name name={row.description} />,
      price: <Name name={row?.productSaleUnits[0]?.price} />,
      unitSoldLastMonth: <Name name={row.unitSoldLastMonth} />,
      unitSoldLastWeek: <Name name={row.unitSoldLastWeek} />,
      category: <Name name={row.category} />,
      largestBuyer: <Name name={row.largestBuyer} />,
      bestSalesRep: <Name name={row.bestSalesRep} />,
      bestMarket: <Name name={row.bestMarket} />,
      highestSalesDay: <Name name={row.highestSalesDay} />,
      highestSalesMonth: <Name name={row.highestSalesMonth} />,
      inventoryAge: <Name name={row.inventoryAge} />,
      latestBuyer: <Name name={row.latestBuyer} />,
      totalSoldWeek: <Name name={row.totalSoldWeek} />,
      totalSoldMonth: <Name name={row.totalSoldMonth} />,
      productPicture: <Logo name={row.productPicture} />,
    };

    return componentsMap[column] || null;
  };

  return {
    columns: filteredColumns,
    rows: tableData.map((row) => {
      return tableColumns?.reduce((acc, column) => {
        acc[column] = renderBuyersComponent(column, row);
        return acc;
      }, {});
    }),
  };
};

export default productData;
