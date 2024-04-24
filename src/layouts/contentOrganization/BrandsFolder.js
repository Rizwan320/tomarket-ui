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

const BrandsFolder = ({ name = "Product Organization In Brand" }) => {
  const [rows, setRows] = useState([
    { id: 1, name: "Product pictures" },
    { id: 2, name: "Logos" },
    { id: 3, name: "Sales sheets" },
    { id: 4, name: "Descriptions" },
  ]);

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
                onClick={() => alert(`${row.name} clicked`)}
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
