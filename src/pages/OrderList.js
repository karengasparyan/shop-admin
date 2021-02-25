import React, {Component} from 'react';
import {connect} from 'react-redux';
import WrapperSign from "../components/WrapperSign";
import {orderListRequest, updateOrderStatusRequest} from "../store/actions/products";
import Preloader from "../svg/preloader.svg";
import Utils from "../helpers/Utils";
import Pagination from "../components/HeaderComponents/Pagination";
import PaginationOrderList from "../components/HeaderComponents/PaginationOrderList";
import Button from "../components/components/Button";
import _ from "lodash";
import memoizeOne from "memoize-one";

class OrderList extends Component {

  componentDidMount() {
    this.props.orderListRequest()
  }

  changeStatus = (id) => {
    this.props.updateOrderStatusRequest(id)
  }

  initPage = memoizeOne((order,page) => {
    if (order && page) {
      this.props.orderListRequest(page)
    }
  }, _.isEqual)

  render() {
    let {orders, pageCount, page = 1, order} = this.props;
    if (!orders) {
      return <img src={Preloader} width="100px" height="100px"/>;
    }

    const direction = process.env.REACT_APP_API_URL;

    this.initPage(order, page)
    return (
      <WrapperSign>
        <div className="container-fluid">
          <h1>Order List</h1>
          <table className="orderListTable">
            <tr>
              <th>Name</th>
              <th>Town</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Sold product(s)</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
            {orders.map(o => <tr key={o.id} style={{border: 'solid 5px #7acb60'}}>
              <td>{o.name}</td>
              <td>{o.town}</td>
              <td>{o.address}</td>
              <td>{o.phone}</td>
              <td>{o.email}</td>
              <tr>
                <th>Name</th>
                <th>Sku</th>
                <th>Qty</th>
                <th>Sold</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
              {JSON.parse(o.data).map(d => <tr key={d.id}>
                <td>{Utils.sliceText(d.name, 32)}</td>
                <td>{d.sku}</td>
                <td>{d.qty}</td>
                <td>{d.saleCount}</td>
                <td>{d.salePrice}</td>
                <img width={100} src={`${direction}/productImage/${d.id}/${d?.images[0]?.path}`} alt="image"/>
              </tr>)}
              <th>{o.total}</th>
              <th><Button
                onClick={() => this.changeStatus(o.id, page)}
                style={o.status === 'pending' ? {backgroundColor: '#ff7b7b'} : {backgroundColor: '#7acb60'}}
                title={o.status}/></th>
            </tr>)}
          </table>
          <PaginationOrderList pageCount={pageCount}/>
        </div>
      </WrapperSign>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.products.orders,
  order: state.products.order,
  pageCount: state.products.pageCount,
  page: state.products.page,
});
const mapDispatchToProps = {
  orderListRequest,
  updateOrderStatusRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderList);

export default Container;
