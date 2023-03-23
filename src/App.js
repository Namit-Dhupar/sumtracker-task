import React, { useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import Grid from "@mui/material/Unstable_Grid2";
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
  const id = searchParam.get("contact");

  const handlePagination = async (resource) => {
    setLoader(true);
    const res = await getApiData(resource);
    if (res) {
      setProductData(res.data);
      setLoader(false);
    }
  };

  return (
    <Grid container spacing={1} className="App">
      <Grid xs={12}>
        <h1>SumTracker Product List</h1>
      </Grid>
      <Grid xs={12}>
        <SearchBar placeholder="Search By Name/SKU" />
      </Grid>
      <Grid xs={4}>Showing {productData.results?.length} products</Grid>
      <Grid xs={4}>{id && <SupplierChip contactId={id} />}</Grid>
      {loader ? (
        <Grid xs={4}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid xs={2}>
            {productData.previous && (
              <ArrowBackIosNewIcon
                onClick={() => handlePagination(productData.previous)}
              />
            )}
          </Grid>
          <Grid xs={2}>
            {productData.next && (
              <ArrowForwardIosIcon
                onClick={() => handlePagination(productData.next)}
              />
            )}
          </Grid>
        </>
      )}
      <Grid xs={12}>
        <Table
          setProductData={setProductData}
          productData={productData}
          contactId={id}
        />
      </Grid>
    </Grid>
  );
}

export default App;
