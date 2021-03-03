import { ThemeProvider  } from '@material-ui/core'
import Login from './components/Login'
import TopBar from './components/TopBar'
import { connect } from "react-redux"


function App(props) {
  return (
    <div className="App">
      <ThemeProvider theme={props.theme}>
        <TopBar></TopBar>
        <Login></Login>
      </ThemeProvider >
    </div>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
  }
}

export default connect(mapStateToProps)(App);
