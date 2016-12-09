import React, { PropTypes, Component } from 'react'

export default class Programs extends Component {
  render() {
    return (
      <ul>
        {this.props.programs.map((program, i) =>
          <li key={i}>{program.value}</li>
        )}
      </ul>
    )
  }
}

Programs.propTypes = {
  programs: PropTypes.array.isRequired
}
