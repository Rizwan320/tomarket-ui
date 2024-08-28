import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ListItemIcon,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";

const BrandsFolder = ({ name = "Product Organization In Brand" }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([
    { id: 1, name: "Product pictures" },
    { id: 2, name: "Logos" },
    { id: 3, name: "Others" },
  ]);

  const handleRowClick = (rowName) => {
    const routeMap = {
      "Product pictures": {
        route: "/content-organization/product-picture",
        endpoint: "/content/pictures",
        title: "Pictures",
      },
      Logos: {
        route: "/content-organization/logo",
        endpoint: "/content/logos",
        title: "Logos",
      },
      Others: {
        route: "/content-organization/other",
        endpoint: "/content/others",
        title: "Others",
      },
    };
    const routeInfo = routeMap[rowName];
    if (routeInfo) {
      navigate(routeInfo.route, {
        state: {
          title: routeInfo.title,
          endpoint: routeInfo.endpoint,
        },
      });
    }
  };

  return (
    <>
      {name && (
        <MDBox mt={2} ml={2} mb={2}>
          <MDTypography>{name}</MDTypography>
        </MDBox>
      )}

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell key="name">All Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  ":hover": {
                    bgcolor: "#F1F1F1",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleRowClick(row.name)}
              >
                <TableCell component="th" scope="row">
                  <ListItemIcon>
                    <FolderIcon color="secondary" />
                  </ListItemIcon>
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BrandsFolder;
