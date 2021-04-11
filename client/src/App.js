import { ThemeProvider } from '@material-ui/core'
import { connect } from "react-redux"
import { Component } from 'react'

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import { Router, Switch, Route, Redirect } from "react-router-dom";

import Login from './components/login'
import TopBar from './components/topbar'
import Profile from './components/profile'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user.isLoggedIn) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.setState({
      currentUser: undefined
    })
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    console.log(currentUser)
    return (
      <Router history={history}>
        <div className="App">
          <ThemeProvider theme={this.props.theme}>
            <TopBar user={currentUser} logOut={this.logOut}/>
            <Switch>
              <Route exact path="/" >
                {currentUser ?<Redirect to="/profile" />:<Redirect to="/login" />}
              </Route>
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/register" component={Register} /> */}
              <Route exact path="/profile" component={Profile} />
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
