import MDTypography from "components/MDTypography";

export const tableProductData = (products) => {
  const Name = ({ name }) => {
    return (
      <MDTypography variant="caption" fontWeight="medium">
        {name}
      </MDTypography>
    );
  };

  const Price = ({ price }) => {
    return (
      <MDTypography variant="caption" fontWeight="medium">
        ${price}
      </MDTypography>
    );
  };

  const hasBrand = products?.some((product) => product?.brand?.name);

  const columns = [
    { Header: "Product Name", accessor: "productName", align: "left" },
    { Header: "SKU", accessor: "sku", align: "center" },
    { Header: "Price", accessor: "price", align: "center" },
    { Header: "Category", accessor: "category", align: "center" },
    { Header: "SubCategory", accessor: "subCategory", align: "center" },
    ...(hasBrand ? [{ Header: "Brand", accessor: "brand", align: "center" }] : []),
  ];

  return {
    columns,
    rows: products?.map((product) => ({
      id: product?.id,
      productName: <Name name={product?.name} />,
      sku: <Name name={product?.sku} />,
      price: <Price price={product?.price} />,
      category: <Name name={product?.category} />,
      subCategory: <Name name={product?.subCategory} />,
      brand: hasBrand ? <Name name={product?.brand?.name} /> : null,
    })),
  };
};
