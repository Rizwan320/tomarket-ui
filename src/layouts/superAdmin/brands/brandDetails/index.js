import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";

import api from "../../../../axios";
import { useUser } from "context/userContext";
import { generateUsersDetailTable } from "layouts/users/data";
import AddUserModal from "../../addUser/addUserModal";

const BrandDetails = () => {
  const { id } = useParams();
  const { AdminData } = useUser();
  const [brandName, setBrandName] = useState(null);
  const [brandData, setBrandData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetchBrandDetails();
  }, [id]);

  const fetchBrandDetails = async () => {
    try {
      const response = await api.get(`/brands/${id}/users`);
      setBrandName(response?.data);
      setBrandData(generateUsersDetailTable(response?.data?.account?.users, handleImpersonate));
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleImpersonate = async (id) => {
    try {
      const response = await api.get("/admin/user", {
        params: { id },
      });
      AdminData(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Card>
      <MDBox p={3} display="flex" justifyContent="space-between">
        <MDTypography variant="h5" gutterBottom>
          {brandName?.name}
        </MDTypography>
        <AddUserModal user={brandName?.account?.users[0]} />
      </MDBox>
      <MDBox>
        <DataTable
          table={brandData}
          showTotalEntries={true}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
};

export default BrandDetails;
