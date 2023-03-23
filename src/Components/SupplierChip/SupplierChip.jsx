import React from "react";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import "./SupplierChip.css";

function SupplierChip({ contactId }) {
  const navigate = useNavigate();

  //Show a reset button above the table which will remove the query param and show all the products
  const handleDelete = () => {
    navigate("/");
    navigate(0);
  };

  return (
    <div className="chipInput">
      <Chip label={`Supplier: ${contactId}`} onDelete={handleDelete} />
    </div>
  );
}

export default SupplierChip;
