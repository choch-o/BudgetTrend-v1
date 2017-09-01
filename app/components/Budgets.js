import React, { Component, PropTypes } from 'react'
import Program from './Program'
import Paper from 'material-ui/Paper'
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import AsyncApp from '../containers/AsyncApp'
import { connect } from 'react-redux'
import { addProgram, toggleProgram, saveSelectedPrograms } from '../actions/budget'
import { selectCategory, fetchProgramsIfNeeded, invalidateCategory } from '../actions/fetch'
import { Treemap } from 'react-d3'
// import Picker from '../components/Picker'
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
  },
  nextButton: {
    width: '100%',
    color: '#eee',
    backgroundColor: "#009999",
    fontSize: 18,
    textAlign: 'center', 
  },
  submitButton: {
    width: '100%',
    color: '#fff',
    backgroundColor: "#ffb944",
    fontSize: 18,
    textAlign: 'center', 
  },
  introTitle: {
    marginBottom: 30
  },
  introContent: {
    marginBottom: 30
  },
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
    /*
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchProgramsIfNeeded(selectedCategory, this.state.pIndices.pop()))
    this.setState(this.state)
    */
  }

  componentWillReceiveProps(nextProps) {
/*    if (nextProps.selectedYear !== this.props.selectedYear) {
      const { dispatch, selectedYear } = nextProps
      dispatch(fetchProgramsIfNeeded(selectedYear, 1))
    }*/
  }

  handleChange(nextCategory) {
    this.props.dispatch(selectCategory(nextCategory))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    this.setState({ selected: [] })
    const { dispatch, selectedCategory } = this.props
    dispatch(invalidateCategory(selectedCategory))
    console.log("pIndices")
    console.log(this.state.pIndices)
    if (this.state.pIndices.length > 0) {
      dispatch(fetchProgramsIfNeeded(selectedCategory, this.state.pIndices.pop()))
    } else {
      dispatch(fetchProgramsIfNeeded(selectedCategory, 5))
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
    console.log("CURR PROPS STATE")
    console.log(this.props)
  }

  handleSaveClick() {
    this.props.dispatch(saveSelectedPrograms(this.props.selectedPrograms, this.props.selectedPromise))
  }

  isSelected(i) {
    var index = this.state.selected.indexOf(i)
    if (index > -1) return true
    else return false
  }

  render() {
    const { dispatch, selectedCategory, selectedPromise, programs, isFetching, lastUpdated } = this.props
    /*
    <Picker value={selectedYear}
            onChange={this.handleChange}
            options={[ 2015, 2016 ]} />
    */
    return (
      <div className="budgets">
        {programs.length === 0 &&
          <Paper
            zDepth={1}
            style={{ padding: 30 }}
            >
            <h2 style={styles.introTitle}>제목제목제목제목</h2>
            <p style={styles.introContent}>
              공약이행에 우리의 돈은 얼마나, 또 어떻게 쓰였을까요? <br/>
              각각의 공약과 연관된 예산 프로그램을 직접 찾아보고, <br/>
              다른 사람들의 생각과 비교해보세요! <br/>
            </p>
            <h4>지금까지 모인 예산</h4>
            <div style={styles.budgetmap}>
              <Treemap
                data={this.props.promiseValue}
                width={600}
                height={250}
                textColor="#484848"
                fontSize="12px"
                hoverAnimation={true} 
              />
            </div>  
          </Paper>
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
              <Subheader>Select all budget programs related to {this.props.selectedCategory}</Subheader>
              {this.props.programs.map((program, i) =>
                <GridTile key={i}>
                  <FlatButton
                    style={this.isSelected(i) ? styles.selectedGridTile : styles.gridTile }
                    onClick={() => this.handleBudgetClick(i, program.ACTV_NM, program.Y_YY_DFN_MEDI_KCUR_AMT)}>
                    {program.ACTV_NM}
                    <br />
                    <small>{program.Y_YY_DFN_MEDI_KCUR_AMT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ',000 원'}</small>
                  </FlatButton>
                </GridTile>
              )}
            </GridList>
          </Paper>
        }
        <h2> </h2>
        {programs.length > 0 && !this.state.isTaggingDone &&
          <FlatButton style={styles.nextButton} href='#'
             onClick={this.handleRefreshClick}>
             NEXT
          </FlatButton>
        }
        {programs.length > 0 && this.state.isTaggingDone &&
          <FlatButton style={styles.submitButton} href='#'
            onClick={this.handleSaveClick}>
            SUBMIT
          </FlatButton>
        }
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedCategory: PropTypes.number.isRequired,
  programs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  selectedPrograms: PropTypes.array,
  selectedPromise: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  console.log("STATE")
  console.log(state)
  const { selectedCategory, programsByCategory, selectedPrograms, selectedPromise } = state
  const {
    isFetching,
    lastUpdated,
    items: programs
  } = programsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }

  return {
    selectedCategory,
    selectedPromise,
    programs,
    isFetching,
    lastUpdated,
    selectedPrograms
  }
}

export default connect(mapStateToProps)(Budgets);
