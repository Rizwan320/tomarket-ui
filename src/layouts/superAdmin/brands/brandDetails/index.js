import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import api from "../../../../axios";
import { useUser } from "context/userContext";
import { usersDetailTable } from "layouts/superAdmin/components/usersDetailTable";
import ProductTable from "layouts/products/ProductTable";
import AddUserModal from "../../addUser/addUserModal";
import UserCard from "layouts/superAdmin/components/userCard";

const BrandDetails = () => {
  const { id } = useParams();
  const { impersonate } = useUser();
  const [brandName, setBrandName] = useState(null);
  const [userData, setUserData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetchBrandDetails();
  }, [id]);

  const fetchBrandDetails = async () => {
    try {
      const response = await api.get(`/brands/${id}/details`);
      setBrandName(response?.data);
      setUserData(usersDetailTable(response?.data?.account?.users, handleImpersonate));
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
            {brandName?.name}
          </MDTypography>
          <AddUserModal account={brandName?.account} />
        </MDBox>
      </Card>
      <MDBox marginTop={3}>
        <UserCard userData={userData} />
      </MDBox>
      <MDBox marginTop={3}>
        {brandName?.products && <ProductTable products={brandName?.products} />}
      </MDBox>
    </>
  );
};

export default BrandDetails;
