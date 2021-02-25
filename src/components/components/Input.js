import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classnames from "classnames";

class Input extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onchange: PropTypes.func,
    className: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {

    }
    this.styles = {
      transform: `translate(${8}px, ${-8}px) scale(0.8)`,
      color: '#4285f4',
      fontSize: `1.1rem`,
      transition: '0.5s',
      paddingRight: 5,
      paddingLeft: 5,
      fontWeight: 500,
      background: '#ffffff',
    }
  }

  componentDidMount() {
    const { value } = this.props
    if (value !== '') {
      this.setState({ styles: this.styles })
    }
  }


  handleFocus = (ev) => {
    this.setState({ styles: this.styles })
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  }

  handleBlur = (ev) => {
    if (ev.target.value !== '') {
      this.setState({ styles: this.styles })
    } else {
      this.setState({ styles: {} })
    }
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  }

  handleChange = (ev) => {
    if (this.props.onChangeText) {
      this.props.onChangeText(ev.target.value);
    }
    if (this.props.onChange) {
      this.props.onChange(ev);
    }
  }

  render() {
    const { type, label, onChange, className, ...props } = this.props;

    const { styles } = this.state;
    return (
      <div className="inputContainer">
        <label style={styles} className="label" htmlFor={label}>{label} </label>
        {type === 'textarea' ?
          <textarea
            {...props}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            id={label}
            className={classnames('input', className)}
          /> : <input
            {...props}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            id={label}
            className={classnames('input', className)}
            type={type}
          />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.products.error,
});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);

export default Container;
