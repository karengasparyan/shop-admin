import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from 'classnames';
class Button extends Component {

  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
  }
  static defaultProps = {
    type: 'button',
  }

  render() {
    const { title, onClick, style, className, type } = this.props
    return (
      <button
        className={classnames('buttonContainer', className)}
        type={type}
        onClick={onClick}>
        <span className="button"  style={style}>{title}</span>
      </button>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);

export default Container;
