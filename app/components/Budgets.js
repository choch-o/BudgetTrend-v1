import React, { Component, PropTypes } from 'react'
import Program from './Program'
import Paper from 'material-ui/Paper'
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import AsyncApp from '../containers/AsyncApp'
import { connect } from 'react-redux'
import { addProgram, toggleProgram, saveSelectedPrograms } from '../actions/budget'
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
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.state = {
      selected: [],
      pIndices: [1, 2, 3, 4],
      isTaggingDone: false
    }
    this.state.pIndices.shuffle();
    this.setState(this.state);
    console.log("Initial pIndices")
    console.log(this.state.pIndices)
  }

  componentDidMount() {
    const { dispatch, selectedYear } = this.props
    dispatch(fetchProgramsIfNeeded(selectedYear, this.state.pIndices.pop()))
    this.setState(this.state)
  }

  componentWillReceiveProps(nextProps) {
/*    if (nextProps.selectedYear !== this.props.selectedYear) {
      const { dispatch, selectedYear } = nextProps
      dispatch(fetchProgramsIfNeeded(selectedYear, 1))
    }*/
  }

  handleChange(nextYear) {
    this.props.dispatch(selectYear(nextYear))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    this.setState({ selected: [] })
    const { dispatch, selectedYear } = this.props
    dispatch(invalidateYear(selectedYear))
    console.log("pIndices")
    console.log(this.state.pIndices)
    if (this.state.pIndices.length > 0) {
      dispatch(fetchProgramsIfNeeded(selectedYear, this.state.pIndices.pop()))
    } else {
      dispatch(fetchProgramsIfNeeded(selectedYear, 5))
      this.setState({isTaggingDone: true})
    }
  }

  handleBudgetClick(i, name, value) {
    var index = this.state.selected.indexOf(i)
    if (index > -1) this.setState(this.state.selected.splice(index, 1))
    else {
      this.state.selected.push(i)
      this.setState(this.state.selected)
    }
    this.props.dispatch(toggleProgram(name, value))
  }

  handleSaveClick() {
    this.props.dispatch(saveSelectedPrograms(this.props.selectedPrograms))
  }

  isSelected(i) {
    console.log("is selected")
    console.log(this.state.selected)
    var index = this.state.selected.indexOf(i)
    if (index > -1) return true
    else return false
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
                    style={this.isSelected(i) ? styles.selectedGridTile : styles.gridTile }
                    onClick={() => this.handleBudgetClick(i, program.ACTV_NM, program.Y_YY_DFN_MEDI_KCUR_AMT)}>
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
        {!isFetching && !this.state.isTaggingDone &&
          <a style={refreshStyle} href='#'
             onClick={this.handleRefreshClick}>
             다음
          </a>
        }
        {!isFetching && this.state.isTaggingDone &&
          <a style={refreshStyle} href='#'
            onClick={this.handleSaveClick}>
            SUBMIT
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
  dispatch: PropTypes.func.isRequired,
  selectedPrograms: PropTypes.array
}

function mapStateToProps(state) {
  console.log("STATE")
  console.log(state)
  const { selectedYear, programsByYear, selectedPrograms } = state
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
    lastUpdated,
    selectedPrograms
  }
}

export default connect(mapStateToProps)(Budgets);
