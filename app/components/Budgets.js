import React from 'react';
import Program from './Program';
import Paper from 'material-ui/Paper';

class Budgets extends React.Component {
  render() {
    return (
      <div className="budgets">
        <Paper zDepth={1}>
          <Program name="Program Name 1" value="$1,236,170"></Program>
          <Program name="Program Name 2" value="$4,586,210"></Program>
          <Program name="Program Name 3" value="$726,180"></Program>
        </Paper>
      </div>
    );
  }
}

export default Budgets;
