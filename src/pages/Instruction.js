import React, {Component} from 'react';
import {connect} from 'react-redux';
import WrapperSign from "../components/WrapperSign";

class Instruction extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {}
  }



  render() {
    const direction = process.env.REACT_APP_API_URL;

    return (
      <WrapperSign>
        <video width="768" height="480" controls>
          <source src={`${direction}/instruction/instruction.mp4`} type="video/mp4"/>
        </video>
      </WrapperSign>
    );
  }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Instruction);

export default Container;
