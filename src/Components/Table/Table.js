import React, { useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getApiData } from "../../Utils/commonFetch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({
  contactId,
  setProductData,
  productData,
}) {
  const [data, setData] = useState([]);
  const resource = "/products/";

  const getTableData = useCallback(
    async (id) => {
      const res = id
        ? await getApiData(resource + `?contact=${id}`)
        : await getApiData(resource);
      if (res) {
        setData(res.data);
        setProductData(res.data);
      }
    },
    [setProductData]
  );

  useEffect(() => {
    getTableData(contactId);
  }, [contactId, getTableData]);

  useEffect(() => {
    setData(productData);
  }, [productData]);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Product</StyledTableCell>
            <StyledTableCell align="right">SKU</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Variant Name</StyledTableCell>
          </TableRow>
        </TableHead>
        {data.results?.length > 0 ? (
          <TableBody>
            {data.results?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <img
                    alt={row.image_url}
                    id={"image" + row.id}
                    src={row.image_url}
                    height="90"
                    width="90"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{row.sku}</StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.variant_name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
}
