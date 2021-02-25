import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {deleteProductsRequest, getProductsRequest, singleProductsRequest} from "../store/actions/products";
import Modal from 'react-modal';
import Pagination from "../components/HeaderComponents/Pagination";
import {withRouter} from "react-router-dom";
import Button from "../components/components/Button";
import WrapperSign from "../components/WrapperSign";
import SlickCarousel from "../components/SlickCarousel";
import modalCustomStyle from '../assets/styles/modal'
import {toast} from "react-toastify";
import classnames from "classnames";
import Preloader from "../svg/preloader.svg"
import Utils from "../helpers/Utils";
import Search from "../components/HeaderComponents/Search";

class DataTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsId: [],
      openModal: false,
      allChecked: false,
      productId: null,
      activePage: 1
    }
  }

  componentDidMount() {
    let activePage = localStorage.getItem('activePage') || 1
    if(activePage === '0'){
      activePage = '1'
      localStorage.setItem('activePage',activePage)
    }
    const query = {page: activePage}
    this.props.getProductsRequest(query)
  }

  handleChangeSelectId = (id) => {
    let {productsId} = this.state;
    const {products} = this.props;

    if (productsId.includes(id)) {
      productsId = productsId.filter((p) => p !== id);

      products.find(p => p.id === id).checked = false;
    } else {
      productsId.push(id);
      products.find(p => p.id === id).checked = true;
    }
    this.setState({productsId});
  }

  handleChangeCheckedAll = () => {
    let {productsId} = this.state;
    let {products} = this.props;

    if (productsId.length > 0) {
      productsId.length = 0
      products.map(p => p.checked = false)
      return this.setState({productsId, allChecked: false});
    }
    products.map(p => productsId.push(p.id))
    products.map(p => p.checked = true)
    return this.setState({productsId, allChecked: true});
  }

  createProduct = () => {
    this.props.history.push("/admin/create")
  }

  updateProduct = (productId) => {
    if (productId) {
      this.props.singleProductsRequest(productId)
      this.props.history.push(`/admin/update/${productId}`)
    }
  }

  deleteProduct = () => {
    let {productsId} = this.state;
    this.props.deleteProductsRequest(productsId)
    toast.info(classnames(_.isEmpty(productsId) ? 'Please select a product' :
      'Deleted product count > ', productsId.length));
    Utils.removeFromId(this.props.products,productsId)
  }

  openModal = () => {
    const {openModal} = this.state
    this.setState({openModal: !openModal,})
  }

  handleChangeOpen = (productId) => {
    const {products} = this.props
    const image = products?.find(p => p.id === productId)?.images
    if (image.length > 0){
      this.setState({productId});
      this.openModal();
    }
   return null;
  }

  render() {
    const {productsKeys, products, productCount} = this.props;
    const {openModal, allChecked, productId} = this.state;
    if (!products) {
      return <img src={Preloader} width="100px" height="100px" />;
    }

    const direction = process.env.REACT_APP_API_URL;

    const singleProductImages = products?.find(p => p.id === productId)?.images

    return (
      <WrapperSign>
        <div className="dataTable">
          <div className="createUpdateButtons">
            <Button
              onClick={this.createProduct}
              title="Create Product"
            />
            <Button
              title="Delete Product"
              onClick={this.deleteProduct}
            />
            <Pagination productCount={productCount} searchbar={true} />
          </div>
          <table>
            <tr>
              <th><input
                type="checkbox"
                onChange={this.handleChangeCheckedAll}
                checked={allChecked}
                className="checkbox"
              />
              </th>
              {productsKeys.map((k) =>
                <th key={k}>{k}</th>)}
            </tr>
            {products?.map((p) => <tr key={p.id}>
              <th><input
                id={`c_${p.id}`}
                type="checkbox"
                className="checkbox"
                checked={p.checked}
                onChange={() => this.handleChangeSelectId(p.id)}
              /></th>
              <th>{p.id}</th>
              <th>{p.name}</th>
              <th>{p.shortDescription}</th>
              <th>{p.sku}</th>
              <th>{p.price}</th>
              <th>{p.salePrice}</th>
              <th>{p.qty}</th>
              <th>{p.attributes.map((a, i) => <tr key={i} style={{border: 'none'}}>{a.attributeKey}</tr>)}</th>
              <th>{p.attributes.map((a, i) => <tr key={i} style={{border: 'none'}}>{a.attributeValue}</tr>)}</th>
              <th onClick={() => this.handleChangeOpen(p.id)}>
                {!_.isEmpty(p?.images) ?
                  <div className="dataTableImagesContainer">
                    <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`} alt="image"/>
                    <span>{p.images.length}</span>
                  </div> : <span className="dataTableImage">no images</span>}
              </th>
              <th>{p.createdAt}</th>
              <th>{p.updatedAt}<Button title="Edit" onClick={() => this.updateProduct(p.id)}/></th>
            </tr>)}
          </table>
          <Modal
            closeTimeoutMS={500}
            isOpen={openModal}
            onRequestClose={this.openModal}
            contentLabel="Images"
            style={modalCustomStyle}
          >
            <div className="sliderImagesContainer">
              <span className="closeModal" onClick={this.openModal}>x</span>
            </div>
            <SlickCarousel images={singleProductImages} productId={productId}/>
          </Modal>
        </div>
      </WrapperSign>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  productCount: state.products.productCount,
  productsKeys: state.products.productsKeys,
  paginationActivePage: state.products.paginationActivePage,
  error: state.products.error,
});
const mapDispatchToProps = {
  getProductsRequest,
  deleteProductsRequest,
  singleProductsRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(DataTables));


export default Container;
