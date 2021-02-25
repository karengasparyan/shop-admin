import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import {getProductsRequest} from "../../store/actions/products";
import Search from "./Search";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  handlePageChange = (pageNumber) => {
    const page = pageNumber.selected+1;
    const {search} = this.state;

    const query = {s: search, page};
    this.props.getProductsRequest(query);
  }

  handleChange = (search) => {
    const {activePage} = this.state;
    if (search !== '') {
      const query = {s: search, page: activePage};
      this.props.getProductsRequest(query);
    } else {
      this.props.getProductsRequest();
    }
    this.setState({search});
  }

  render() {
    const {productCount, searchbar} = this.props;
    const {activePage} = this.state;

    return (
      <div className="paginationContainer">
        {searchbar && <Search onChangeSearch={this.handleChange}/>}
        {productCount > 0 && <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          breakClassName="break"
          breakLinkClassName="breakLink"
          pageCount={productCount}
          // initialPage={+activePage - 1}
          // marginPagesDisplayed={5}
          // pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName="pagination"
          pageClassName="pages"
          pageLinkClassName="pagesLink"
          activeClassName="active"
          activeLinkClassName="activeLink"
          previousClassName="prev"
          previousLinkClassName="prevLink"
          nextClassName="next"
          nextLinkClassName="nextLink"
        />}
      </div>
    );
  }
}

const mapSateToProps = (state) => ({
  productCount: state.products.productCount,
});
const mapDispatchToProps = {
  getProductsRequest,
};

const Container = connect(
  mapSateToProps,
  mapDispatchToProps,
)(Pagination);

export default Container;
