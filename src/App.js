import React, { useState, useRef, useCallback } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SupplierChip from "./Components/SupplierChip/SupplierChip";
import Table from "./Components/Table/Table";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router-dom";
import { getApiData } from "./Utils/commonFetch";

function App() {
  const [productData, setProductData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchParam] = useSearchParams();
  //fetches id from list?contact=14 that is 14 which is sent to table and chip component as per requirements
  const id = searchParam.get("contact");
  const supplierDelete = useRef(false);

  const handlePagination = async (resource) => {
    setLoader(true);
    const res = await getApiData(resource);
    if (res) {
      setProductData(res.data);
      setLoader(false);
    }
  };

  //This function is used to obtain child's prop(child to parent props passing)
  const handleChipDelete = useCallback((val) => {
    supplierDelete.current = val;
  }, []);

  return (
    <Box className="App" style={{ padding: "50px 60px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>SumTracker Product List</h1>
        </Grid>
        <Grid>
          <SearchBar
            deleteInput={supplierDelete.current}
            placeholder="Search By Name/SKU"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={4}>
          Showing {productData.results?.length} of {productData.count} products
        </Grid>
        <Grid xs={4}>
          {id && (
            <SupplierChip handleChipDelete={handleChipDelete} contactId={id} />
          )}
        </Grid>
        {loader ? (
          <CircularProgress />
        ) : (
          <>
            <Grid xs={2}>
              {productData.previous && (
                <Button
                  variant="contained"
                  onClick={() => handlePagination(productData.previous)}
                  startIcon={<ArrowBackIosNewIcon />}
                >
                  Prev
                </Button>
              )}
            </Grid>
            <Grid xs={2}>
              {productData.next && (
                <Button
                  variant="contained"
                  onClick={() => handlePagination(productData.next)}
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Next
                </Button>
              )}
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Table
            handleChipDelete={handleChipDelete}
            setProductData={setProductData}
            productData={productData}
            contactId={id}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
