import React, { Component } from 'react';
import { connect } from 'react-redux';
import WrapperSign from "../components/WrapperSign";


class Error404 extends Component {
  render() {
    return (
      <WrapperSign>
        <h1 className="error404">ERROR 404!</h1>
      </WrapperSign>
    );
  }
}

const mapStateToProps = () => ({

});
const mapDispatchToProps = {

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Error404);

export default Container;
