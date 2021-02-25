import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from "./HeaderComponents/Header";
import NavBar from "./HeaderComponents/NavBar";

class WrapperSign extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const {token} = this.props;
    if (!token) {
      return <Redirect to="/admin/sign-in"/>;
    }
    return (
      <div className="wrapperSignContainer" >
        <Header />
        <NavBar />
        <div className="wrapperSignChildrenContainer">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sign.token,
});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrapperSign);

export default Container;
