import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper, Typography } from '@mui/material';


import withStyles from '@mui/styles/withStyles';


const useStyles = {
  rootDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render() {
    const { user: currentUser } = this.props;
    const { classes } = this.props
    return (
      <div className={classes.rootDiv}>
        <Paper>
          <Typography variant="h4">
             Profile
          </Typography>
          <Typography>
            <strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography>
            <strong>Id:</strong> {currentUser.id}
          </Typography>
          <Typography>
            <strong>Email:</strong> {currentUser.email}
          </Typography>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

const ProfileStyles = withStyles(useStyles)(Profile)

export default connect(mapStateToProps)(ProfileStyles);