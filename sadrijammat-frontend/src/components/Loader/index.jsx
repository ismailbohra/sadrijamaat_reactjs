import PropTypes from "prop-types";
import React from "react";
import { Spinner } from "react-bootstrap";
import { LOADER_TYPES } from "../../constants";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="border" variant={"dark"}>
        <span className="visually-hidden"> Loading...</span>
      </Spinner>
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
};



export default Loader;
