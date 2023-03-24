import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { getApiData } from "../../Utils/commonFetch";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function SearchBar({ placeholder, deleteInput }) {
  const [data, setData] = useState([]);
  const [searchedWord, setSearchedWord] = useState("");
  const [loader, setLoader] = useState(false);
  const dataRef = useRef(null);
  const resource = "/purchases/contacts/";
  const navigate = useNavigate();

  // When the user clicks on the contact typeahead you have to show the list of contacts
  // without any search term by sending request to /contacts/ as the default behaviour. This
  // done so that user can select a contact even when they have not entered any search term.
  const handleClick = async () => {
    setLoader(true);
    const res = await getApiData(resource);
    if (res) {
      setData(res.data?.results);
      //Storing a copy of API result in a ref
      dataRef.current = res.data?.results;
      setLoader(false);
    }
  };

  const handleInput = async (e) => {
    const inputString = e.target.value;
    setSearchedWord(inputString);
    if (inputString.length > 2) {
      //Filtering the already fetched data instead /?search=<company_name> for better performance
      // const newData = dataRef.current.filter((value) => {
      //   return value.company_name
      //     .toLowerCase()
      //     .includes(inputString.toLowerCase());
      // });

      //Filtering as per Requirements
      setLoader(true);
      const newData = await getApiData(resource + `?search=${inputString}`);
      if (newData) {
        setData(newData.data?.results);
        setLoader(false);
      }
    } else {
      setData(dataRef.current);
    }
  };

  const handleSelect = (item) => {
    setSearchedWord(item.company_name);
    //Adding ID to the URL for product and chip rendering
    navigate("/list?contact=" + item.id);
    //Remove the dropdown on select
    setData([]);
  };

  useEffect(() => {
    //in case the supplier chip is deleted, remove the company name from input box
    if (deleteInput) setSearchedWord("");
  }, [deleteInput]);

  return (
    <div className="search" onBlur={() => setData([])}>
      <div className="searchInputs">
        <input
          onClick={() => (!searchedWord.length ? handleClick() : null)}
          onChange={(e) => handleInput(e)}
          value={searchedWord}
          type="text"
          placeholder={placeholder}
        />
        <div className="searchIcon">
          {loader ? <CircularProgress /> : <SearchIcon />}
        </div>
      </div>
      {data.length > 0 && (
        <div className="dataResult">
          {data.slice(0, 7).map((item) => {
            return (
              <div
                onMouseDown={() => handleSelect(item)}
                key={item.id}
                className="dataItem"
              >
                <p>{item.company_name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
