import React, {Component} from "react";
import Slider from "react-slick";
import _ from 'lodash';
import {singleProductsRequest,} from "../store/actions/products";
import {connect} from "react-redux";

// https://react-slick.neostack.com/docs/example/simple-slider

export default class SlickCarousel extends Component {
  render() {
    const { productId, images } = this.props

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: images.length > 4 ? 4 : images.length,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      // arrows: false,
    };
    return (
      <div>
        <section  className="hero-section">
          <Slider {...settings}>
            {images.map((i, index) => <div key={i.path} className="sliderContainer">
              <img style={{width: images.length < 4 ? 400 : null}} src={`http://localhost:4000/productImage/${productId}/${i.path}`}
                   alt={`image_${index}`}/>
            </div>)}
          </Slider>
        </section>
      </div>
    );
  }
}