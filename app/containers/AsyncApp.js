import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectYear, fetchProgramsIfNeeded, invalidateYear } from '../actions/fetch'
import Picker from '../components/Picker'
import Programs from '../components/Programs'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedYear } = this.props
    dispatch(fetchProgramsIfNeeded(selectedYear))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedYear !== this.props.selectedYear) {
      const { dispatch, selectedYear } = nextProps
      dispatch(fetchProgramsIfNeeded(selectedYear))
    }
  }

  handleChange(nextYear) {
    this.props.dispatch(selectYear(nextYear))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedYear } = this.props
    dispatch(invalidateYear(selectedYear))
    dispatch(fetchProgramsIfNeeded(selectedYear))
  }

  render() {
    const { selectedYear, programs, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker value={selectedYear}
                onChange={this.handleChange}
                options={[ 2015, 2016 ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && programs.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && programs.length === 0 &&
          <h2>Empty.</h2>
        }
        {programs.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Programs programs={programs} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedYear: PropTypes.number.isRequired,
  programs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  console.log("STATE")
  console.log(state)
  const { selectedYear, programsByYear } = state
  const {
    isFetching,
    lastUpdated,
    items: programs
  } = programsByYear[selectedYear] || {
    isFetching: true,
    items: []
  }

  return {
    selectedYear,
    programs,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
