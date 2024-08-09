import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useState } from "react";
import api from "../../../axios";
import { Chip } from "@mui/material";

const COLUMNS = {
  name: {
    Header: "Name",
    accessor: "name",
    align: "left",
  },
  request: {
    Header: "Request to connect",
    accessor: "connect",
    align: "right",
  },
};

const brandsData = (tableData) => {
  const tableColumns = ["name", "connect"];

  const Brand = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography component="h4" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const Connect = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(false);

    const handleOnClick = async () => {
      try {
        setLoading(true);
        const response = await api.post("connections/request-by-distributor", { brandId: id });
        if (response.data) {
          setState(true);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    return (
      <MDBox>
        {state ? (
          <Chip label="Pending" variant="outlined" />
        ) : (
          <MDButton onClick={handleOnClick} variant="contained" color="success" disabled={loading}>
            Request to connect
          </MDButton>
        )}
      </MDBox>
    );
  };

  const filteredColumns = Object.values(COLUMNS);

  const renderComponent = (column, row) => {
    const componentsMap = {
      name: () => <Brand name={row?.accountName} />,
      connect: () => <Connect id={row?.brand.id} />,
    };

    return componentsMap[column] ? componentsMap[column]() : null;
  };
  return {
    columns: filteredColumns,
    rows: tableData?.map((row) => {
      return tableColumns?.reduce((acc, column) => {
        acc[column] = renderComponent(column, row);
        return acc;
      }, {});
    }),
  };
};

export default brandsData;
