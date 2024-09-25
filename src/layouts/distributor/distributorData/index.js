import { useState } from "react";
import { Chip } from "@mui/material";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import api from "../../../axios";
import { useUser } from "context/userContext";

const COLUMNS = {
  name: {
    Header: "Name",
    accessor: "name",
    align: "left",
  },
  request: {
    Header: "Request to Connect",
    accessor: "connect",
    align: "right",
  },
};

const distributorsData = (tableData) => {
  const tableColumns = ["name", "connect"];

  const Brand = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const Connect = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(false);
    const [chipState, setChipState] = useState("");
    const { user } = useUser();

    const handleOnClick = async () => {
      try {
        setLoading(true);

        const endpoint = user?.isImpersonating
          ? "connections/request-by-admin"
          : "connections/request-by-brand";

        const requestData = user?.isImpersonating
          ? { brandId: user?.user?.id, distributorId: id, accountType: "brand" }
          : { distributorId: id };

        const response = await api.post(endpoint, requestData);

        setChipState(response?.data?.state.includes("confirmed") ? "Confirmed" : "Pending");
      } catch (error) {
        console.error("Error making request:", error.message);
      } finally {
        setState(true);
        setLoading(false);
      }
    };

    return (
      <MDBox>
        {state ? (
          <Chip label={chipState} variant="outlined" />
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
      name: () => <Brand name={row?.name} />,
      connect: () => <Connect id={row?.id} />,
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

export default distributorsData;
