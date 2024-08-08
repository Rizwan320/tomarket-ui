import MDBox from "components/MDBox";
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
    Header: "Connection Requests",
    accessor: "request",
    align: "right",
  },
};

const connectionRequestsData = (tableData, setTableData) => {
  const tableColumns = ["name", "request"];

  const Brand = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography component="h4" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const Connect = ({ id, state }) => {
    const [loading, setLoading] = useState(false);
    const handleOnClick = async (value) => {
      try {
        setLoading(true);
        const response = await api.patch(`connections/${id}`, { state: value });
        if (response.data) {
          setTableData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, state: value } : item))
          );
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    return (
      <MDBox display="flex" gap={2}>
        {state === "request_by_brand" || state === "request_by_distributor" ? (
          <>
            <MDButton
              onClick={() => handleOnClick("rejected")}
              variant="contained"
              color="error"
              disabled={loading}
            >
              Cancel
            </MDButton>
            <MDButton
              onClick={() => handleOnClick("confirmed")}
              variant="contained"
              color="success"
              disabled={loading}
            >
              Accept
            </MDButton>
          </>
        ) : (
          <Chip
            label={state === "rejected" ? "Rejected" : "Confirmed"}
            variant="outlined"
            color={state === "rejected" ? "error" : "success"}
          />
        )}
      </MDBox>
    );
  };

  const filteredColumns = Object.values(COLUMNS);

  const renderComponent = (column, row) => {
    const componentsMap = {
      name: () => <Brand name={row?.name} />,
      request: () => <Connect id={row?.id} state={row?.state} />,
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

export default connectionRequestsData;
