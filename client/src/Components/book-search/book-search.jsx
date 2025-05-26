// import React, { useState } from "react";
import { FormControl, FormGroup } from "react-bootstrap";

const BookSearch = ({ handleBookSearch }) => {
  const handleSeachInput = (e) => {
    handleBookSearch(e.target.value);
  };

  return (
    <FormGroup className="mb-3" controlId="searchBook">
      <FormControl
        type="text"
        placeholder="Buscar un Libro"
        onChange={handleSeachInput}
      />
    </FormGroup>
  );
};

export default BookSearch;
