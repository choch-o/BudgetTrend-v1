import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Promises from './Promises';
import Budgets from './Budgets';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="col-sm-6">
            <Promises paperHeight={600}/>
          </div>
          <div className="col-sm-6">
            <Budgets paperHeight={600}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
