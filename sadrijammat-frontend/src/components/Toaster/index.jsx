import PropTypes from "prop-types";
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideToasterAction } from "../../redux/Toaster/ToasterAction";
import "./Toaster.scss";

const Toaster = ({ toaster, hideToaster }) => {
  const { message, type, isOpen } = toaster;
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    hideToaster();
  };
  return (
    <ToastContainer position="top-end">
      <Toast
        onClose={() => handleClose()}
        show={isOpen}
        delay={3000}
        autohide
        bg={type === "error" ? "danger" : "success"}
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

Toaster.propTypes = {
  toaster: PropTypes.object,
  hideToaster: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    toaster: state.Toaster,
  };
};

const mapDispatchToProps = (dispatch) => ({
  hideToaster: bindActionCreators(hideToasterAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
