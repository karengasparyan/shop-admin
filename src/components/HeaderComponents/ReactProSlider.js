import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ProSidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { CSSTransition } from 'react-transition-group';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class ReactProSlider extends Component {

    static propTypes = {
      show: PropTypes.bool.isRequired,
    }

  render() {
    const { show, showMenu } = this.props;
    return (
      <CSSTransition
        in={show}
        timeout={300}
        classNames="mobileMenu"
        unmountOnExit
      >
        <div onMouseLeave={() => showMenu(false) } className="navBarContainer">
          <span onClick={() => showMenu(false)} className="closeButton">x</span>
          <ProSidebar className="navBar">
            <Menu iconShape="circle">
              <MenuItem><Link to="/">Order List</Link></MenuItem>
              <MenuItem><Link to="/admin/data-tables">Products Data</Link></MenuItem>
              <MenuItem><Link to="/admin/filters-slider">Filters and Slider</Link></MenuItem>
              {/*<SubMenu title="КАТАЛОГ">*/}
              {/*  <MenuItem><Link to="/">КОНТАКТЫ</Link></MenuItem>*/}
              {/*  <MenuItem><Link to="/">САМОВЫВОЗ</Link></MenuItem>*/}
              {/*  <MenuItem><Link to="/">САМОВЫВОЗ</Link></MenuItem>*/}
              {/*  <MenuItem><Link to="/">САМОВЫВОЗ</Link></MenuItem>*/}
              {/*  <MenuItem><Link to="/">САМОВЫВОЗ</Link></MenuItem>*/}
              {/*</SubMenu>*/}
              {/*<MenuItem><Link to="/">ДОСТАВКА И ОПЛАТА</Link></MenuItem>*/}
              {/*<MenuItem><Link to="/">ГАРАНТИЯ</Link></MenuItem>*/}
              {/*<SubMenu title="О МАГАЗИНЕ">*/}
              {/*  <MenuItem><Link to="/">КОНТАКТЫ</Link></MenuItem>*/}
              {/*  <MenuItem><Link to="/">САМОВЫВОЗ</Link></MenuItem>*/}
              {/*</SubMenu>*/}
            </Menu>
          </ProSidebar>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReactProSlider);

export default Container;
