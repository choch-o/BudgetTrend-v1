import React, { Component, PropTypes } from 'react'
import Program from './Program'
import Paper from 'material-ui/Paper'
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import AsyncApp from '../containers/AsyncApp'
import { connect } from 'react-redux'
import { addProgram, toggleProgram } from '../actions/budget'
import { selectYear, fetchProgramsIfNeeded, invalidateYear } from '../actions/fetch'
import Picker from '../components/Picker'
// import Programs from '../components/Programs'
// import AsyncApp from '../containers/AsyncApp'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 600,
    overflowY: 'auto',
  },
  gridTile: {
    width: '100%',
    height: 100,
    backgroundColor: "#f2f8f6",
    justifyContent: 'center', 
    lineHeight: '170%'
  },
  selectedGridTile: {
    width: '100%',
    height: 100,
    backgroundColor: "#c0ddd4",
    justifyContent: 'center', 
    lineHeight: '170%'
  }
};

class Budgets extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleBudgetClick = this.handleBudgetClick.bind(this)
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

  handleBudgetClick(name, value) {
    this.props.dispatch(toggleProgram(name, value))
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
          <Paper zDepth={1}
            style={styles.root}
            >
            <GridList
              cellHeight={100}
              style={styles.gridList}
              cols={4}
            >
              <Subheader>사용 예산</Subheader>
              {this.props.programs.map((program, i) =>
                <GridTile key={i}>
                  <FlatButton
                    style={styles.gridTile}
                    onClick={() => this.handleBudgetClick(program.ACTV_NM, program.Y_YY_DFN_MEDI_KCUR_AMT)}>
                    {program.ACTV_NM}
                    <br />
                    <small>{program.Y_YY_DFN_MEDI_KCUR_AMT + '원'}</small>
                  </FlatButton>
                </GridTile>
              )}
            </GridList>
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
