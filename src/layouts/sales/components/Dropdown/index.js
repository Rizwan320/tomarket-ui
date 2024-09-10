import { useState } from "react";
import MDTypography from "components/MDTypography";
import { MenuItem, Select } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ProductDropdown = ({ products, onDropdownChange }) => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.productName || "");

  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Select
      value={selectedProduct}
      onChange={handleChange}
      fullWidth
      displayEmpty
      IconComponent={ArrowDropDownIcon}
      variant="standard"
      disableUnderline
      renderValue={(selected) => (
        <MDTypography variant="caption" fontWeight="medium">
          {selected || "Select Product"}
          <ArrowDropDownIcon style={{ verticalAlign: "middle", marginLeft: 8 }} />
        </MDTypography>
      )}
      onClick={handleClick}
    >
      {products.map((product, index) => (
        <MenuItem key={index} value={product.productName}>
          <MDTypography variant="caption" fontWeight="medium">
            {product.productName}
          </MDTypography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default ProductDropdown;
