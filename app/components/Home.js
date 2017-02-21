import React from 'react';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';
import { connect } from 'react-redux'
import Messages from './Messages';
import Promises from './Promises';
import Budgets from './Budgets';
import Result from './Result';
import { isSubmitted } from '../actions/budget'

class Home extends React.Component {
  render() {
    const { isSubmitted } = this.props
    console.log(isSubmitted)
    return (
      <div className="container-fluid" style={{ margin: 'auto', width: '80%'}}>
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="col-sm-4">
            <Promises paperHeight={2000}/>
          </div>
          <div className="col-sm-8">
            
            {!isSubmitted &&  
              <Budgets paperHeight={2000}/>
            }
            {isSubmitted &&
              <Result/>
            } 
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("HOME STATE")
  console.log(state)
  const { selectedPrograms, selectedCategory } = state
  const {
    isSubmitted
  } = selectedPrograms
  return {
    messages: state.messages,
    isSubmitted,
  };
};

export default connect(mapStateToProps)(Home);
