import React from 'react'
import Program from './Program'
import Paper from 'material-ui/Paper'
import AsyncApp from '../containers/AsyncApp'
import { createStore } from 'redux'
import { addProgram, toggleProgram } from '../actions/budget'
import programApp from '../reducers/budget'
// import AsyncApp from '../containers/AsyncApp'

class Budgets extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {

    return (
      <div className="budgets">
        <Paper zDepth={1}>
          <Program name="Program Name 1" value="$1,236,170"></Program>
          <Program name="Program Name 2" value="$4,586,210"></Program>
          <Program name="Program Name 3" value="$726,180"></Program>
        </Paper>
        <AsyncApp />
      </div>
    );
  }
}

export default Budgets;
