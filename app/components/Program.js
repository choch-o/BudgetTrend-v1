import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
class Program extends React.Component {
  render() {
    const programStyle = {
      height: 200
    }
    return (
      <div>
        <Paper zDepth={2}>
          <Card style={programStyle}>
            <CardHeader
              title={this.props.name}
              subtitle={this.props.value}
            />
            <CardActions>
              <FlatButton label="Action1" />
              <FlatButton label="Action2" />
            </CardActions>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default Program;
