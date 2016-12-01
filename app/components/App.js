import React from 'react';
import Header from './Header';
import Footer from './Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    const muiTheme = getMuiTheme({
      fontFamily: 'Roboto, Open Sans, sans-serif',
    });
    const style = {
      fontFamily: 'Roboto, Open Sans, sans-serif',
    };
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={style}>
  	      <Header/>
  	      {this.props.children}
          <Footer/>
	      </div>
	    </MuiThemeProvider>
    );
  }
}

export default App;
