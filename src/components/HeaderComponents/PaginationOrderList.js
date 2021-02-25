import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import {orderListRequest} from "../../store/actions/products";

class PaginationOrderList extends Component {

  handlePageChange = (pageNumber) => {
    const page = pageNumber.selected + 1;
    this.props.orderListRequest(page);
  }


  render() {
    const {pageCount} = this.props;
    return (
      <div className="paginationContainer">
        {pageCount > 0 && <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          breakClassName="break"
          breakLinkClassName="breakLink"
          pageCount={pageCount}
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
});
const mapDispatchToProps = {
  orderListRequest,
};

const Container = connect(
  mapSateToProps,
  mapDispatchToProps,
)(PaginationOrderList);

export default Container;
