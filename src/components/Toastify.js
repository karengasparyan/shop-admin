import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import Button from "./components/Button";
import { css } from 'glamor';

class Toastify extends Component {

  static propTypes = {
    position: PropTypes.string.isRequired,
    autoClose: PropTypes.number,
    limit: PropTypes.number,
    message: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    toastClassName: PropTypes.string,
    clickFunction: PropTypes.func,
  }
  notify = (message,onClick) => {
    toast(message);
    onClick()
  };
  render() {
 const { position, autoClose, limit, buttonTitle, toastClassName,message, onClick } = this.props;
    return (
      <>
        <Button
          title={buttonTitle}
          onClick={()=>this.notify(message,onClick)}
        />
        <ToastContainer
          position={position}
          autoClose={autoClose}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={limit}
          toastClassName={toastClassName}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toastify);

export default Container;
