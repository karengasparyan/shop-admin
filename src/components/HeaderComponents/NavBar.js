import React, {Component} from 'react';
import ReactProSlider from './ReactProSlider';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showMenu = (show) => {
    this.setState({show})
  };

  redirectHome = () =>{
    this.props.history.push("/")
  }

  render() {
    const {show} = this.state
    return (
      <div>
        <div onMouseOver={() => this.showMenu(true)} className="navButton">
          <img onClick={this.redirectHome} src="/assets/img/adamex-logo1.png" alt="logo" />
          {/*<span className="MenuIcon">*/}
          {/*     <span className="iconBar" />*/}
          {/*     <span className="iconBar" />*/}
          {/*     <span className="iconBar" />*/}
          {/*</span>*/}
        </div>
        {show && <ReactProSlider showMenu={this.showMenu} show={show}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NavBar));

export default Container;