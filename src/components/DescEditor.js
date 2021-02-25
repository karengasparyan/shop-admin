import React, { Component } from 'react';
import { connect } from "react-redux";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import _ from 'lodash';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import memoizeOne from "memoize-one";

// https://jpuri.github.io/react-draft-wysiwyg/#/docs

export default class DescEditor extends Component {

  setValue = memoizeOne((value) => {
    if (!value) {
      return;
    }
    const contentBlock = htmlToDraft(value);
    if (!contentBlock) {
      return;
    }
    // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    // const editorState = EditorState.createWithContent(contentState);
    // this.setValue({ editorState });
  })

  constructor(props) {
    super(props);
    const contentBlock = htmlToDraft(this.props.value || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
    };
    this.styles = {
      label: {
        transform: `translate(${8}px, ${-8}px) scale(0.8)`,
        color: '#4285f4',
        fontSize: `1.1rem`,
        transition: '0.5s',
        paddingRight: 5,
        paddingLeft: 5,
        fontWeight: 500,
        background: '#ffffff',
      },
      inputBorder: {
        background: '#4285F4',
        boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)',
      }
    }
  }

  async componentDidMount() {

  }

  handleFocus = (ev) => {
    this.setState({ styles: this.styles })
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  }

  onEditorStateChange = (editorState) => {
    if (this.props.onDescChange) {
      this.props.onDescChange(editorState);
    }
    if (this.props.onChange) {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      this.props.onChange(html)
    }
    this.setState({ editorState })
  }

  render() {
    const { value } = this.props;
    const { editorState } = this.state;

    this.setValue(value)
    return (
      <div onClick={this.handleFocus} className="inputContainer">
        <label style={this.styles.label} className="labelDesc" htmlFor="description">description</label>
        <Editor
          editorState={editorState}
          wrapperClassName="descEditorWrapper"
          editorClassName="descEditor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
