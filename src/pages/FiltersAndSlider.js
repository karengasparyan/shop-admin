import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Modal from 'react-modal';
import {v4 as uuid} from 'uuid';
import Button from "../components/components/Button";
import Input from "../components/components/Input";
import {
  createUpdateSidebarTitleRequest,
  getSidebarTitlesRequest
} from "../store/actions/filters";
import {toast} from "react-toastify";
import Utils from "../helpers/Utils";
import memoizeOne from "memoize-one";
import {withRouter} from "react-router-dom";
import WrapperSign from "../components/WrapperSign";
import {
  getImagesSliderRequest,
  updateSliderImageDescRequest,
  uploadImagesSliderRequest
} from "../store/actions/products";
import Preloader from "../svg/preloader.svg";

class FiltersAndSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
      value: '',
      openModal: false,
      editModal: false,
      editId: null,
      uploadImageCount: null,
      fileAttr: [],
      images: [],
      deletedImages: [],
      values: {},
      showDescEdit: false,
      id: null,
    }
    this.modalStyle = {
      overlay: {
        width: '100%',
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.5)',

      },
      content: {
        width: '50%',
        height: 'max-content',
        position: 'absolute',
        top: '100px',
        left: '25%',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#ffffff',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        borderRadius: 10,
        outline: 'none',
        padding: 30,
      }
    }
  }

  componentDidMount() {
    this.props.getSidebarTitlesRequest();
    this.props.getImagesSliderRequest();
  }

  initTitles = memoizeOne((titles) => {
    if (titles) {
      this.setState({titles})
    }

  }, _.isEqual)

  initImages = memoizeOne((sliderImages) => {
    if (sliderImages) {
      let images = [];
      let values = {};
      images = (sliderImages || []).map(i => i.id)

      for (let i = 0; i < sliderImages.length; i++) {
        values.imageTitle = i.id;
        values.imageDescription = i.path;
        values.catalogLink = i.path;
      }

      this.setState({images})
    }
  }, _.isEqual)

  openModal = () => {
    this.setState({openModal: true})
  }

  closeModal = () => {
    this.setState({openModal: false, value: ''})
  }

  handleSave = (ev) => {
    ev.preventDefault();

    let {value, titles} = this.state;

    if (value !== '') {

      titles = [...titles, {id: _.uniqueId('previewId_'), title: value}]

      this.setState({value: '', titles});

      this.props.createUpdateSidebarTitleRequest(titles)

      this.closeModal()

      toast.success('FiltersAndSlider title Created');

    } else {

      toast.info('Please fill in the line');
    }
  }

  handleChange = (ev) => {
    this.setState({value: ev.target.value})
  }

  handleEditOpen = (id) => {
    const {titles} = this.state;

    this.openModal();

    this.setState({editModal: true, editId: id, value: titles.find(s => s.id === id).title})
  }

  handleEdit = (ev) => {
    const {value, editId, titles} = this.state;
    ev.preventDefault();

    if (value !== '') {

      ((titles || []).find(t => t.id === editId).title) = value;

      this.setState({editModal: false, titles, openModal: false,})

      this.props.createUpdateSidebarTitleRequest(titles);

      toast.success('edited')

      this.closeModal()

    } else {
      toast.info('Please fill in the line');
    }
  }

  handleDeleteTitle = (id) => {

    let {titles} = this.state;

    titles = titles.filter(t => +t.id !== +id)

    this.setState({titles})

    this.props.createUpdateSidebarTitleRequest(titles)

    toast.success('deleted')
  }

  uploadImages = () => {
    const {fileAttr, deletedImages, values} = this.state;

    const FileList = [];
    fileAttr.map((f, i) => FileList[i] = f.file);
    FileList.length = Object.keys(FileList).length;

    if (!_.isEmpty(fileAttr) && values.imageTitle && values.imageDescription &&
      values.catalogLink || !_.isEmpty(deletedImages)) {
      this.props.uploadImagesSliderRequest(
        FileList,
        JSON.stringify(deletedImages),
        values.imageTitle,
        values.imageDescription,
        values.catalogLink,
      );
      toast.success('Changes saved')
      this.setState({
        uploadImageCount: null,
        fileAttr: [],
        deletedImages: []
      })
    } else {
      toast.info('No change')
    }

  }

  imageUploadPreview = (ev) => {
    const fileAttr = [];
    const {files} = ev.target;

    for (let i = 0; i < files.length; i++) {
      fileAttr.push({
        path: URL.createObjectURL(files[i]),
        file: files[i],
      })
    }
    this.setState({fileAttr, uploadImageCount: fileAttr?.length})
  }

  removePreviewImage = (removeImage) => {
    const {fileAttr} = this.state;

    const index = fileAttr?.indexOf(removeImage);

    if (index > -1) {
      fileAttr.splice(index, 1);
      this.setState({fileAttr, uploadImageCount: fileAttr?.length})
    }
  }

  removeImage = (image) => {
    let {images, deletedImages} = this.state;
    deletedImages.push(image)
    images = images.filter(id => id !== image.id);
    this.setState({images, deletedImages})
    this.uploadImages()
  }

  handleChangeImage = (ev, i) => {
    const {values} = this.state;
    const value = _.get(ev, 'target.value', ev)

    _.set(values, i, value)

    this.setState({values});
  }

  // editSliderImageDesc = (id, imageTitle, imageDescription, catalogLink) => {
  //   this.props.updateSliderImageDescRequest(id, imageTitle, imageDescription, catalogLink)
  //   this.setState({showDescEdit: true})
  // }

  editSliderImageDesc = (ev) => {
    ev.preventDefault();
    const {values, id} = this.state;
    const {sliderImages} = this.props;

    if (values.imageTitle && values.imageDescription && values.catalogLink) {

      this.props.updateSliderImageDescRequest(id, values.imageTitle, values.imageDescription, values.catalogLink);

      sliderImages.find(i => i.id === id).imageTitle = values.imageTitle;
      sliderImages.find(i => i.id === id).imageDescription = values.imageDescription;
      sliderImages.find(i => i.id === id).catalogLink = values.catalogLink;

      this.closeModalEditDesc()

      toast.success('Changes saved')

    } else {
      toast.info('Please fill in the line');
    }
  }

  openModalEditDesc = (id) => {
    const {values} = this.state;
    const {sliderImages} = this.props;
    const imageValues = ((sliderImages || [])?.find(i => i.id === id))

    values.imageTitle = imageValues.imageTitle;
    values.imageDescription = imageValues.imageDescription;
    values.catalogLink = imageValues.catalogLink;

    this.setState({showDescEdit: true, values, id})
  }

  closeModalEditDesc = () => {
    this.setState({showDescEdit: false, values: {}})
  }

  render() {
    const {titles, openModal,
      value, editModal, images,
      uploadImageCount, fileAttr,
      values, showDescEdit} = this.state;
    const {sidebarTitles, sliderImages} = this.props;
    this.initTitles(sidebarTitles)

    const direction = process.env.REACT_APP_API_URL;

    if (!sliderImages) {
      return <img src={Preloader} width="100px" height="100px"/>;
    }

    this.initImages(sliderImages)

    return (
      <WrapperSign>
        <div className="sidebarContainer">
          <h3 className="title">Filters and Slider</h3>
          <ul>
            {titles?.map(s => <li key={s.id}>
              <span>{s.title}</span>
              <Button onClick={() => this.handleEditOpen(s.id)} title="Edit" type="button"/>
              <Button onClick={() => this.handleDeleteTitle(s.id)} title="Delete" type="button"/>
            </li>)}
          </ul>
          <Button onClick={this.openModal} title="Add sidebar title" type="button"/>
          <Modal
            closeTimeoutMS={500}
            isOpen={openModal}
            onRequestClose={this.openModal}
            contentLabel="Images"
            style={this.modalStyle}
          >
            <div className="sliderImagesContainer">
              <span className="closeModal" onClick={this.closeModal}>x</span>
            </div>
            <div>
              <h3>Add sidebar title</h3>
              <form onSubmit={editModal ? this.handleEdit : this.handleSave}>
                <Input
                  id="sidebarTitle"
                  name="sidebar title"
                  type="text"
                  label="sidebar title"
                  value={value}
                  onChange={this.handleChange}
                />
                <Button title="Save title" type="submit"/>
              </form>
            </div>
          </Modal>
        </div>
        <div className="imagePreviewContainer">
          <h3 className="title">Slider Images</h3>
          <div className="imagesContainer">
            {(images || []).map((imageId) => {
              const image = (sliderImages || []).find(i => i.id === imageId) || {};
              return (
                <div key={imageId} className="containerAbsolute">
                  <img
                    className="imagePreview"
                    src={`${direction}/sliderImages/${image.path}`}
                    alt={`image_${image.id}`}/>
                  <span
                    onClick={() => this.removeImage(image)}
                    className="deleteImageButton"
                    gloss="Delete"
                  >x</span>
                  <div className="sliderImgAttributeContainer">
                      <span className="sliderImgAttribute">Title</span>
                      <p>{image.imageTitle}</p>

                      <span className="sliderImgAttribute">Description</span>
                      <p>{image.imageDescription}</p>

                      <span className="sliderImgAttribute">Link</span>
                      <p>{image.catalogLink}</p>
                    <Button title="Edit texts" onClick={() => this.openModalEditDesc(image.id)}/>
                    <Modal
                      closeTimeoutMS={500}
                      isOpen={showDescEdit}
                      onRequestClose={this.closeModalEditDesc}
                      contentLabel="ImagesDesc"
                      style={this.modalStyle}
                    >
                      <div className="sliderImagesContainer">
                        {/*<span className="closeModal" onClick={this.closeModalEditDesc}>x</span>*/}
                      </div>
                      <div>
                        <h3>Edit image desc</h3>
                        <form onSubmit={this.editSliderImageDesc}>
                          <Input
                            id={`imageTitle_${_.uniqueId('input')}`}
                            name="imageTitle"
                            type="text"
                            label="imageTitle"
                            className="imageTitle"
                            value={values.imageTitle}
                            onChange={(ev) => this.handleChangeImage(ev, `imageTitle`)}
                          />
                          <Input
                            id={`imageDescription_${_.uniqueId('input')}`}
                            name="imageDescription"
                            type="text"
                            label="imageDescription"
                            className="imageDescription"
                            value={values.imageDescription}
                            onChange={(ev) => this.handleChangeImage(ev, `imageDescription`)}
                          />
                          <Input
                            id={`catalogLink_${_.uniqueId('input')}`}
                            name="catalogLink"
                            type="text"
                            label="catalogLink"
                            className="catalogLink"
                            value={values.catalogLink}
                            onChange={(ev) => this.handleChangeImage(ev, `catalogLink`)}
                          />
                          <Button title="Close" type="submit" />
                        </form>
                      </div>
                    </Modal>
                  </div>
                </div>)
            })}
            {fileAttr?.map((f, i) => <div key={i} className="containerAbsolute">
              <img
                className="imagePreview"
                src={f.path}
                alt={`image${i}`}
              />
              <Input
                id={`imageTitle_${f.path}`}
                name="imageTitle"
                type="text"
                label="imageTitle"
                className="imageTitle"
                value={values.imageTitle}
                onChange={(ev) => this.handleChangeImage(ev, `imageTitle`)}
              />
              <Input
                id={`imageDescription_${f.path}`}
                name="imageDescription"
                type="text"
                label="imageDescription"
                className="imageDescription"
                value={values.imageDescription}
                onChange={(ev) => this.handleChangeImage(ev, `imageDescription`)}
              />
              <Input
                id={`catalogLink_${f.path}`}
                name="catalogLink"
                type="text"
                label="catalogLink"
                className="catalogLink"
                value={values.catalogLink}
                onChange={(ev) => this.handleChangeImage(ev, `catalogLink`)}
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
              // multiple
              className="file"
            />
            <label htmlFor="file">
              Select images
              <p className="file-name">
                {uploadImageCount}
              </p>
            </label>
          </div>
          <Button title="Upload image" onClick={this.uploadImages}/>
        </div>
      </WrapperSign>
    );
  }
}

const mapStateToProps = (state) => ({
  sidebarTitles: state.filters.sidebarTitles,
  sidebarFilterTitles: state.filters.sidebarFilterTitles,
  sliderImages: state.products.sliderImages,
});
const mapDispatchToProps = {
  getSidebarTitlesRequest,
  createUpdateSidebarTitleRequest,
  uploadImagesSliderRequest,
  getImagesSliderRequest,
  updateSliderImageDescRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FiltersAndSlider));


export default Container;
