import { formatDistanceToNow } from "date-fns";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "components/Loader";
import { useEffect, useState } from "react";
import api from "../../axios";

const Notifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setnotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityFeed = async () => {
      try {
        setLoading(true);
        const res = await api.get(`activity-feed`);
        setnotifications(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivityFeed();
  }, []);

  const handleAlertClick = async () => navigate("/sales");

  const alertContent = (name, timestamp) => (
    <MDBox sx={{ cursor: "pointer" }}>
      <MDTypography variant="body2" color="white">
        {name}
        <br />
        <MDTypography variant="caption" color="white" style={{ opacity: 0.7 }}>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </MDTypography>
      </MDTypography>
    </MDBox>
  );

  return (
    <MDBox mb={3}>
      {loading && <Loader />}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <Card>
            <MDBox p={2}>
              <MDTypography variant="h5">Activity Feed</MDTypography>
            </MDBox>
            <MDBox
              mb={2}
              pt={2}
              px={2}
              sx={{
                maxHeight: "545px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {notifications?.map((notification, index) => (
                <MDAlert color="success" dismissible key={index} onClick={() => handleAlertClick()}>
                  {alertContent(notification.description, notification.createdAt)}
                </MDAlert>
              ))}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Notifications;
