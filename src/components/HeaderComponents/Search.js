import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getProductsRequest} from "../../store/actions/products";
import Input from "../components/Input";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  handleChange = (ev) => {
    const { value } = ev.target;
    this.setState({search: value})
    if (this.props.onChangeSearch) {
      this.props.onChangeSearch(ev.target.value);
    }
    if (this.props.onChange) {
      this.props.onChange(ev)
    }
  }

  render() {
    const { search } = this.state;
    return (
        <Input
          id="search"
          type="text"
          label="Search"
          value={search}
          onChange={this.handleChange}
          className="search"
        />
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.products.error,
});
const mapDispatchToProps = {
  getProductsRequest
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

export default Container;
