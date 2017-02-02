import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
class Program extends React.Component {
  render() {
    const programStyle = {
      height: 136.3
    }
    var value = this.props.value + '원';
    return (
      <div>
        <Paper zDepth={2}>
          <Card style={programStyle}>
            <CardHeader
              title={this.props.name}
              subtitle={value}
            />
            <CardActions>
              <FlatButton label="관련 있음" />
              <FlatButton label="관련 없음" />
            </CardActions>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default Program;
