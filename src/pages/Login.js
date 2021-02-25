import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from "../components/components/Input";
import {signInRequest} from "../store/actions/sign";
import Button from "../components/components/Button";
import {Redirect} from "react-router-dom";

class Login extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }

  handleChangeUserName = (ev) => {
    this.setState({userName: ev.target.value})
  }

  handleChangePassword = (ev) => {
    this.setState({password: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {userName, password} = this.state;
    this.props.signInRequest(userName, password);
  }

  render() {
    const { userName, password } = this.state
    const { token, error } = this.props
    if (token) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="containerLogin">
        <img src="/assets/img/adamex-logo1.png" alt="logo" />
        <form className="signInForm" onSubmit={this.handleSubmit}>
          <p className="adminText">Admin</p>
          <Input
            id="userName"
            type="text"
            label="user name"
            value={userName}
            onChange={this.handleChangeUserName}
            // className="name"
          />
          <Input
            id="password"
            type="password"
            label="password"
            value={password}
            onChange={this.handleChangePassword}
            // className="name"
          />
          {/*<button type="submit" className="btn btn-primary">Sign In</button>*/}
          <Button className="signInButton" title="SIGN IN" type="submit" />
          <p className="signInError">{error}</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sign.token,
  error: state.sign.error,
});
const mapDispatchToProps = {
  signInRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default Container;
