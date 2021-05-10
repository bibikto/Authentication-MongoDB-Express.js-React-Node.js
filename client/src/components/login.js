import React, { Component } from 'react'
import { Avatar, withStyles, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Button, Tooltip, FormHelperText, Grid, Fade, Zoom } from '@material-ui/core'
import { Visibility, VisibilityOff, AccountCircle, KeyboardCapslock } from '@material-ui/icons/';
import Register from './register'
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Alert } from '@material-ui/lab';

import EmailNotVerified from "./emailNotVerified"
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'


const useStyles = {
    rootPaper: {
        padding: '15px',
        flex: 1,

    },
    innerDiv: {
        minWidth: '300px',
        width: '25vw',
        display: 'inherit',
        flexDirection: 'inherit',
        alignItems: 'inherit'
    },
    avatar: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: '13vh',
        width: '13vh',
        marginBottom: '20px'
    },
    formRoot: {
        width: '100%',
        display: 'inherit',
        flexDirection: 'inherit',
        alignItems: 'inherit'
    },
    formBase: {
        marginBottom: '20px'
    },
    button: {
        fontWeight: '700',
        marginTop: '7px'
    },
    capsLock: {
        border: '1px solid red',
        borderRadius: '5px'
    },
    alert: {
        margin: '5px 0px'
    },
    '@media screen and (max-width: 600px)': {
        innerDiv: {
            width: '100%'
        },
        button: {
            width: '100%'
        },
    }
};

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            password: '',
            email: '',
            capsLockOn: false,
            loading: false,
            messageType: "",
            open: false,
            emailError: false,
            emailErrorText: "",
            emailNotVerified: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleChange = (variable) => (event) => {
        if (variable === 'email') {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (event.target.value && !re.test(String(event.target.value).toLowerCase()))
                this.setState({ emailError: true, emailErrorText: "Invalid Email Address!" })
            else
                this.setState({ emailError: false, emailErrorText: "" })
        }
        this.setState({
            [variable]: event.target.value
        })
    };

    handleClickShowPassword = async () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    };

    handleMouseDownPassword = async (event) => {
        event.preventDefault();
    };



    handleLogin = async (e) => {
        e.preventDefault();

        this.setState({
            loading: true,
        });


        const { dispatch, history } = this.props;

        if (!this.state.emailError && !this.state.passwordError) {
            dispatch(login(this.state.email, this.state.password))
                .then(() => {
                    history.push("/profile");
                    this.setState({
                        loading: false,
                        messageType: "success",
                        open: true
                    });
                })
                .catch(() => {
                    this.setState({
                        loading: false,
                        open: true
                    });
                    if (this.props.message === "Email not verified!") {
                        this.setState({
                            emailNotVerified: true,

                        });
                    }
                });
        }

    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };


    render() {
        const { classes } = this.props;
        const { message } = this.props;
        console.log(message)
        return (
            <Fade in={true}>
                <Grid
                    container
                    justify="center"
                    alignItems='center'
                    wrap='nowrap'
                    direction='column'
                    className={classes.rootPaper} >
                    {this.state.emailNotVerified && <EmailNotVerified email={this.state.email} emailNotVerified={this.state.emailNotVerified} login={this.handleLogin} />}
                    <div className={classes.innerDiv}>
                        <Avatar className={classes.avatar}></Avatar>
                        <form
                            className={classes.formRoot}
                            onSubmit={this.handleLogin}
                            ref={(input) => { this.formLogin = input }}
                        >

                            <FormControl variant="filled" margin="normal" error={this.state.emailError} fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                                <FilledInput
                                    id="filled-adornment-username"
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton >
                                                <AccountCircle />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    autoFocus={true}
                                    required
                                />
                                <FormHelperText id="component-error-text" required>{this.state.emailErrorText}</FormHelperText>
                            </FormControl>

                            <FormControl variant="filled" margin="normal" error={this.state.passwordError} fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <ReactIsCapsLockActive>
                                                {active =>
                                                    active && <Tooltip title="Caps Lock On" className={classes.capsLock}>
                                                        <KeyboardCapslock color='secondary' />
                                                    </Tooltip>}
                                            </ReactIsCapsLockActive>
                                            <Tooltip title={this.state.showPassword ? 'Hide Password' : 'Show Password'}>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}

                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    }

                                    required
                                />
                            </FormControl>
                            {Object.keys(message).map((item, index) => {
                                return (<Zoom in={this.state.open} mountOnEnter unmountOnExit>
                                    <Alert className={classes.alert} severity={item}>{message[item]}</Alert>
                                </Zoom>)
                            })}

                            <Button
                                variant="contained"
                                color='secondary'
                                size="large"
                                className={classes.button}
                                type='submit'
                            >
                                LOG IN
                    </Button>
                        </form>
                        <Register />
                    </div>
                    {/* <Snackbar anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }} open={this.state.open} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity={this.state.messageType}>
                            {message}
                        </MuiAlert>
                    </Snackbar> */}



                </Grid>
            </Fade>
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message
    };
}

const LoginWithRedux = connect(mapStateToProps)(Login);
export default withStyles(useStyles)(LoginWithRedux)
