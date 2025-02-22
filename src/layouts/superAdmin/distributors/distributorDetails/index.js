import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import api from "../../../../axios";
import { useUser } from "context/userContext";
import { usersDetailTable } from "layouts/superAdmin/components/usersDetailTable";
import UserCard from "layouts/superAdmin/components/userCard";
import AddUserModal from "../../addUser/addUserModal";

const DistributorDetails = () => {
  const { id } = useParams();
  const { impersonate } = useUser();
  const [distributorName, setDistributorName] = useState(null);
  const [distributorData, setDistributorData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetchDistributorDetails();
  }, [id]);

  const fetchDistributorDetails = async () => {
    try {
      const response = await api.get(`/distributors/${id}/users`);
      setDistributorName(response?.data);
      setDistributorData(usersDetailTable(response?.data?.account?.users, handleImpersonate));
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleImpersonate = async (id) => {
    try {
      const response = await api.get("/admin/user", {
        params: { id },
      });
      impersonate(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <>
      <Card>
        <MDBox p={3} display="flex" justifyContent="space-between">
          <MDTypography variant="h5" gutterBottom>
            {distributorName?.name}
          </MDTypography>
          <AddUserModal account={distributorName?.account} />
        </MDBox>
      </Card>
      <MDBox marginTop={3}>
        <UserCard userData={distributorData} />
      </MDBox>
    </>
  );
};

export default DistributorDetails;
