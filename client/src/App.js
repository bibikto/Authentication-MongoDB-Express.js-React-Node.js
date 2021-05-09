import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { connect } from "react-redux"
import { Component } from 'react'

// import SessionService from "./services/session.service";

import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import { Router, Switch, Route, Redirect } from "react-router-dom";

import Login from './components/login'
import TopBar from './components/topbar'
import Profile from './components/profile'
import Home from './components/home'

import ProtectedRoute from './routes/protectedRoute'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showModeratorBoard: false,
      // showAdminBoard: false,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }



  render() {
    const currentUser = this.props.user;
    return (
      <Router history={history}>
        <div className="App">
          <ThemeProvider theme={this.props.theme}>
            <CssBaseline />
            <TopBar loggedIn={currentUser.isLoggedIn} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" render={({ location }) => currentUser.isLoggedIn ? <Redirect to="/profile" /> : <Login location={location}/>} />
              {/* <Route exact path="/register" component={Register} /> */}
              <ProtectedRoute exact user={currentUser} path="/profile" component={Profile} />
              {/* <Route path="/user" component={BoardUser} /> */}
              {/* <Route path="/mod" component={BoardModerator} /> */}
              {/* <Route path="/admin" component={BoardAdmin} /> */}
            </Switch>
          </ThemeProvider >

        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
    user: state.auth
  }
}

export default connect(mapStateToProps)(App);



// window.addEventListener('beforeunload', (e) => {
//   SessionService.destroy()
// });
