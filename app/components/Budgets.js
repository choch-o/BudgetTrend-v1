import React, { Component, PropTypes } from 'react'
import Program from './Program'
import Paper from 'material-ui/Paper'
import AsyncApp from '../containers/AsyncApp'
import { connect } from 'react-redux'
import { addProgram, toggleProgram } from '../actions/budget'
import { selectYear, fetchProgramsIfNeeded, invalidateYear } from '../actions/fetch'
import Picker from '../components/Picker'
import Programs from '../components/Programs'
// import AsyncApp from '../containers/AsyncApp'

class Budgets extends React.Component {
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
    const refreshStyle = {
      color: '#111',
      fontSize: 18,
      padding: 10
    }
    /*
    <Picker value={selectedYear}
            onChange={this.handleChange}
            options={[ 2015, 2016 ]} />
    */
    return (
      <div className="budgets">
        {isFetching && programs.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && programs.length === 0 &&
          <h2>Empty.</h2>
        }
        {programs.length > 0 &&
          <Paper zDepth={1}>
            {this.props.programs.map((program, i) =>
              <Program key={i} name={program.ACTV_NM} value={program.Y_YY_DFN_MEDI_KCUR_AMT}></Program>
            )}
          </Paper>
        }
        <h2> </h2>
        {!isFetching &&
            <a style={refreshStyle} href='#'
               onClick={this.handleRefreshClick}>
               다음
            </a>
          }
      </div>
    );
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

export default connect(mapStateToProps)(Budgets);
