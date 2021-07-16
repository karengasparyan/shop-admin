import React, { Component, Fragment } from 'react';
import {
  createProductsRequest,
  getAttributesRequest,
  singleProductsRequest, updateProductsRequest,
  uploadImagesProductsRequest,
  getProductsRequest,
} from "../store/actions/products";
import { connect } from "react-redux";
import _ from 'lodash';
import memoizeOne from "memoize-one";
import Input from "../components/components/Input";
import Button from "../components/components/Button";
import { toast } from "react-toastify";
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import WrapperSign from "../components/WrapperSign";
import draftToHtml from 'draftjs-to-html';
import DescEditor from "../components/DescEditor";
import { convertToRaw, EditorState } from "draft-js";
import CKEditor from 'ckeditor4-react';

class CreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        attributes: [],
      },
      uploadImageCount: null,
      fileAttr: [],
      inputValue: '',
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { inputValue } = this.state;
    this.props.getAttributesRequest()
    if (inputValue === '') {
      this.props.getProductsRequest()
    }
    if (params.id) {
      this.props.singleProductsRequest(params.id)
    }
  }

  initProduct = memoizeOne((singleProduct, id) => {
    if (singleProduct && +id === singleProduct.id) {
      const values = {};
      values.name = singleProduct.name;
      values.description = singleProduct.description;
      values.shortDescription = singleProduct.shortDescription;
      values.sku = singleProduct.sku;
      values.price = singleProduct.price;
      values.salePrice = singleProduct.salePrice;
      values.qty = singleProduct.qty;
      values.metaName = singleProduct.metaName;
      values.metaDescription = singleProduct.metaDescription;
      values.images = (singleProduct.images || []).map(i => i.id)
      values.relatedProducts = singleProduct.relatedProducts
      values.attributes = (singleProduct.attributes || []).map(a => {
        return {
          id: a.id,
          key: a.attributeKey,
          value: a.attributeValue,
        }
      });

      this.setState({ values })
    }
  }, _.isEqual)

  handleSubmitCreate = async (ev) => {
    ev.preventDefault();
    const { values, fileAttr, } = this.state;

    this.props.createProductsRequest({
      ...values,
      relatedProducts: (values.relatedProducts || []).map(r => r.id),
    }, async (error, data) => {
      if (error) {
        toast.error('Error> incorrectly filled in fields');
        return;
      }
      toast.success('Product Created');
      if (!_.isEmpty(fileAttr)) {
        const FileList = [];
        fileAttr.map((f, i) => FileList[i] = f.file);
        FileList.length = Object.keys(FileList).length;
        await this.props.uploadImagesProductsRequest(FileList, values.images, data.product.id);
      }
      this.props.history.push(`/admin/data-tables`)
    })
  }

  handleSubmitUpdate = async (ev) => {
    ev.preventDefault();
    const { values, fileAttr } = this.state;
    const { match: { params } } = this.props;

    this.props.updateProductsRequest({
      productId: params.id,
      ...values,
      relatedProducts: (values.relatedProducts || []).map(r => r.id)
    }, async (error, data) => {
      if (error) {
        toast.error('Error> incorrectly filled in fields');
        return;
      }

      toast.success('Product Updated');

      const FileList = [];
      fileAttr.map((f, i) => FileList[i] = f.file);
      FileList.length = Object.keys(FileList).length;
      await this.props.uploadImagesProductsRequest(FileList, values.images, params.id);

      this.props.history.push(`/admin/data-tables`)
    })
  }

  imageUploadPreview = (ev) => {
    const fileAttr = [];
    const { files } = ev.target;
    for (let i = 0; i < files.length; i++) {
      fileAttr.push({
        path: URL.createObjectURL(files[i]),
        file: files[i],
      })
    }
    this.setState({ fileAttr, uploadImageCount: fileAttr?.length })
  }

  removePreviewImage = (removeImage) => {
    const { fileAttr } = this.state;

    const index = fileAttr?.indexOf(removeImage);

    if (index > -1) {
      fileAttr.splice(index, 1);
      this.setState({ fileAttr, uploadImageCount: fileAttr?.length })
    }
  }

  removeImage = (imageId) => {
    const { values } = this.state;
    values.images = values.images.filter(id => id !== imageId);
    this.setState({ values })
  }

  addInput = () => {
    const { values } = this.state
    values.attributes.push({
      id: _.uniqueId('temp_'),
      key: '',
      value: '',
    })
    this.setState({ values })
  }

  deleteInput = (id) => {
    const { values } = this.state;
    values.attributes = values.attributes.filter((a) => a.id !== id);
    this.setState({ values })
  }

  handleChange = (ev, i) => {
    const { values } = this.state;
    const value = _.get(ev, 'target.value', ev)

    _.set(values, i, value)

    this.setState({ values });
  }

  handleChangeSearch = (search) => {
    const query = {s: search}
    this.props.getProductsRequest(query)
    const inputValue = search.replace(/\W/g, '');
    this.setState({ inputValue });
  };

  filterProducts = (inputValue) => {
    const products = (this.props.products || [])?.map(p => {
      return {
        label: <div key={p.id} className="relLabelContainer">
          <p className="relLabel">{p.id}.</p>
          <p className="relLabel">{p.name}</p>
          <p className="relLabel">{p.price}</p>
          {p.attributes.map(a => <Fragment>
            <p className="relLabel">{a.attributeKey}</p>
            <p className="relLabel">{a.attributeValue},</p>
          </Fragment>)}
        </div>, value: p,
        includeLabel: p.name + p.attributes.map(a => a.attributeKey) +
          p.attributes.map(a => a.attributeValue) + p.price
      }
    })
    return products.filter(i => i.includeLabel.includes(inputValue));
  };

  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterProducts(inputValue));
      }, 1000);
    });

  render() {
    const {
      products,
      attributeKey,
      attributeValue,
      singleProduct,
      match: { params },
      error,
    } = this.props;

    const direction = process.env.REACT_APP_API_URL;

    const single = !!params.id;
    const { values, uploadImageCount, fileAttr } = this.state;

    this.initProduct(singleProduct, params.id)

    return (
      <WrapperSign>
        <form className="container"
              onSubmit={single ? this.handleSubmitUpdate : this.handleSubmitCreate}>
          <div className="createUpdateContainer">
            <h1>{single === true ? 'Update Product' : 'Create Product'}</h1>
            <Input
              id="name"
              type="text"
              label="name"
              name="name"
              value={values.name}
              onChange={(ev) => this.handleChange(ev, 'name')}
              className="name"
            />
            <div className="descInputContainer">
              <Input
                id="shortDescription"
                name="shortDescription"
                type="textarea"
                label="shortDescription"
                value={values.shortDescription}
                onChange={(ev) => this.handleChange(ev, 'shortDescription')}
                className="description"
                // rows={5}
                cols={55}
                style={{ width: '100%' }}
              />

                <CKEditor
                  data={values.description}
                  key={params.id}
                  onChange={(ev) => this.handleChange(ev.editor.getData(), 'description')}
                />

              {/*{(values.description || !single) && <DescEditor*/}
              {/*  value={values.description}*/}
              {/*  onChange={(ev) => this.handleChange(ev, 'description')}*/}
              {/*/>}*/}
            </div>
            <div className="inputsContainer">
              <Input
                id="sku"
                name="sku"
                type="text"
                label="sku"
                className=""
                value={values.sku}
                onChange={(ev) => this.handleChange(ev, 'sku')}
              />
              <Input
                id="price"
                name="price"
                type="number"
                label="price"
                className=""
                min="0"
                value={values.price}
                onChange={(ev) => this.handleChange(ev, 'price')}
              />
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                label="salePrice"
                className=""
                min="0"
                value={values.salePrice}
                onChange={(ev) => this.handleChange(ev, 'salePrice')}
              />
              <Input
                id="qty"
                name="qty"
                type="number"
                label="qty"
                className=""
                min="0"
                value={values.qty}
                onChange={(ev) => this.handleChange(ev, 'qty')}
              />
            </div>
            <div className="relContainer">
              <h3 className="title">Meta data</h3>
              <Input
                id="metaName"
                name="metaName"
                type="text"
                label="metaName"
                className="metaName"
                value={values.metaName}
                onChange={(ev) => this.handleChange(ev, 'metaName')}
              />
              <Input
                id="metaDescription"
                name="metaDescription"
                type="text"
                label="metaDescription"
                className="metaDescription"
                value={values.metaDescription}
                onChange={(ev) => this.handleChange(ev, 'metaDescription')}
              />
            </div>
            <div className="relContainer">
              {/*<Select*/}
              {/*  isMulti*/}
              {/*  name="relations"*/}
              {/*  placeholder="Search products"*/}
              {/*  onInputChange={this.handleChangeSearch}*/}
              {/*  onChange={(value) => this.handleChange((value || []).map(v => v.value), 'relatedProducts')}*/}
              {/*  options={(products || [])?.map(p => {*/}
              {/*    return {label: <div key={p.id} className="relLabelContainer">*/}
              {/*            <p className="relLabel">{p.id}.</p>*/}
              {/*            <p className="relLabel">{p.name}</p>*/}
              {/*            <p className="relLabel">{p.description}</p>*/}
              {/*            <p className="relLabel">{p.price}</p>*/}
              {/*          </div>, value: p}*/}
              {/*  })}*/}
              {/*  value={(values.relatedProducts || [])?.map(v => {*/}
              {/*    return {label: v.name, value: v}*/}
              {/*  })}*/}
              {/*/>*/}
              <h3 className="title">Linking a product with other products</h3>
              <AsyncSelect
                isMulti
                name="relations"
                placeholder="Search products"
                onInputChange={this.handleChangeSearch}
                onChange={(value) => this.handleChange((value || []).map(v => v.value), 'relatedProducts')}
                cacheOptions
                defaultOptions
                loadOptions={this.promiseOptions}
                value={(values.relatedProducts || [])?.map(v => {
                  return { label: v.name, value: v }
                })}
              />
            </div>
            <div className="imagePreviewContainer">
              <h3 className="title">Images</h3>
              <div className="imagesContainer">
                {(values.images || []).map((imageId) => {
                  const image = (singleProduct.images || []).find(i => i.id === imageId) || {};
                  return (
                    <div className="containerAbsolute">
                      <img key={imageId}
                           className="imagePreview"
                           src={`${direction}/productImage/${singleProduct.id}/${image.path}`}
                           alt={`image_${image.id}`} />
                      <span
                        onClick={() => this.removeImage(imageId)}
                        className="deleteImageButton"
                        gloss="Delete"
                      >x</span>
                    </div>
                  )
                })}
                {fileAttr?.map((f, i) => <div className="containerAbsolute">
                  <img
                    key={i}
                    className="imagePreview"
                    src={f.path}
                    alt={`image${i}`}
                  />
                  <span
                    onClick={() => this.removePreviewImage(f)}
                    className="deleteImageButton"
                    gloss="Delete"
                  >x</span>
                </div>)}
              </div>
              <div className="file-input">
                <input
                  onChange={this.imageUploadPreview}
                  name="file"
                  type="file"
                  id="file"
                  multiple
                  className="file"
                />
                <label htmlFor="file">
                  Select images
                  <p className="file-name">
                    {uploadImageCount}
                  </p>
                </label>
              </div>
            </div>
            <div className="attributesInputsContainer">
              <h3 className="title">Attributes</h3>
              <div className="selectContainer">
                {(values.attributes || []).map((s, i) => (
                  <div className="selects" key={s.id}>
                    <div className="select">
                      <span className="labelSelect">Attribute name</span>
                      <CreatableSelect
                        className="formControl"
                        onChange={(value) => {
                          this.handleChange(value?.value, `attributes[${i}].key`)
                        }}
                        value={{
                          value: s.key,
                          label: s.key,
                        }}
                        isClearable
                        options={(attributeKey || []).map(a => {
                          return { label: a, value: a }
                        })}
                      />
                    </div>
                    <div className="select">
                      <span className="labelSelect">Attribute</span>
                      <CreatableSelect
                        className="formControl"
                        onChange={(value) => this.handleChange(value?.value, `attributes[${i}].value`)}
                        value={{
                          value: s.value,
                          label: s.value,
                        }}
                        isClearable
                        options={(attributeValue || []).map(a => {
                          return { label: a, value: a }
                        })}
                      />
                    </div>
                    <Button title="delete" onClick={() => this.deleteInput(s.id)} />
                  </div>
                ))}
                {error && <p>{error}</p>}
              </div>
              <Button
                title="Add attribute"
                onClick={this.addInput}
              />
            </div>
            <div className="saveButtonContainer">
              <Button
                title="Save"
                class="saveButton"
                type="submit"
              />
            </div>
          </div>
        </form>
      </WrapperSign>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  singleProduct: state.products.singleProduct,
  attributeKey: state.products.attributeKey,
  attributeValue: state.products.attributeValue,
  error: state.products.error,
});
const mapDispatchToProps = {
  createProductsRequest,
  updateProductsRequest,
  getAttributesRequest,
  singleProductsRequest,
  uploadImagesProductsRequest,
  getProductsRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUpdate);

export default Container;
