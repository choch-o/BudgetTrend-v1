import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import { getPopularTags } from '../actions/result'
import { Treemap } from 'react-d3'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    flexGrow: '1',
  },
  tagList: {
    alignSelf: 'auto',
    flexGrow: '1',
  },
  budgetmap: {
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    alignContent: 'center',
  },
  myTagItem: {
    backgroundColor: '#f9f4ed'
  },
  popularTagItem: {
    backgroundColor: '#d6e6d6'
  }
} 

class Result extends React.Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
    console.log("result get popular tags")
    dispatch(getPopularTags())
  }

  render() {
    const { programs, popularTags } = this.props
    console.log(this.props)
    return (
      <div className="result">
        <Paper zDepth={1}
          style={styles.root} 
          >
          <div style={styles.budgetmap}>
            <Treemap
              style={{ alignSelf : 'auto', flexGrow: '1' }}
              data={this.props.programs}
              width={600}
              height={250}
              textColor="#484848"
              fontSize="12px"
              title="BudgetMap for 교육비 걱정 덜기"
              hoverAnimation={true}
            />
          </div>
          <div style={styles.listContainer}>
            <div className="myTags" style={styles.tagList}>
              <h4>MY TAGS</h4>
              <List style={{ margin: 5 }}>
                {this.props.programs.map((program, i) => 
                  <ListItem key={i} primaryText={program.label}
                    secondaryText={program.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ',000 원'}
                    style={styles.myTagItem}
                  />
                )}            
              </List>      
            </div>
            <div className="popularTags" style={styles.tagList}>
              <h4>POPULAR TAGS</h4>
              <List style={{ margin: 5 }}>
                {this.props.popularTags.popularTags.map((tag, i) => 
                  <ListItem key={i} primaryText={tag.label}
                    secondaryText={tag.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ',000 원'}
                    rightIconButton={<h4 style={{paddingRight: 10}}>{tag.count}</h4>}
                    style={styles.popularTagItem} 
                  />
                )}
              </List>
            </div>
          </div>
        </Paper>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { selectedPrograms, popularTags } = state
  const {
    programs
  } = selectedPrograms
  return {
    programs,
    popularTags
  }
}

export default connect(mapStateToProps)(Result);
