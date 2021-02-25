// https://reactcommunity.org/react-modal/
 import React from "react";

 const modalCustomStyle = {
  overlay: {
    position: 'fixed',
    top: 100,
    left: 50,
    right: 50,
    bottom: 50,
    backgroundColor: 'rgba(255,255,255,0)'
  },
  content: {
    height: 'max-content',
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#6d6d6d',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 10,
    outline: 'none',
    padding: 30,
  }
};

export default modalCustomStyle;