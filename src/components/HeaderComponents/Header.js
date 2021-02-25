import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "../components/Button";
import Account from "../../helpers/Account";
import {withRouter} from "react-router-dom";

class Header extends Component {
  exit = () => {
    Account.delete()
    window.location.href = '/';
    localStorage.clear();
    this.props.history.push("/admin/sign-in")
  }
  render() {
    return (
      <div className="header">
       <Button
         title="Exit"
         onClick={this.exit}
       />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));

export default Container;