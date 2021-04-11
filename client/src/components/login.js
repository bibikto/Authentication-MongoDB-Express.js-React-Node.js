import React, { Component } from 'react'
import { Avatar, withStyles, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Button, Tooltip, FormHelperText } from '@material-ui/core'
import { Visibility, VisibilityOff, AccountCircle, KeyboardCapslock } from '@material-ui/icons/';
import Register from './register'
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EmailNotVerified from "./emailNotVerified"

const useStyles = {
    rootPaper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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
            passwordError: false,
            passwordErrorText: "",
            emailNotVerified: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
        this.handleChangeCapsLock = this.handleChangeCapsLock.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleChange = (variable) => (event) => {
        if (variable == 'email') {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (event.target.value && !re.test(String(event.target.value).toLowerCase()))
                this.setState({ emailError: true, emailErrorText: "Invalid Email Address!" })
            else
                this.setState({ emailError: false, emailErrorText: "" })
        }
        else {
            if ((event.target.value).length == 0)
                this.setState({ passwordError: false, passwordErrorText: "" })
            else {
                const re_uc = /[A-Z]/
                const re_lc = /[a-z]/
                const re_nm = /[0-9]/
                if (!(re_uc.test(event.target.value) && re_lc.test(event.target.value) && re_nm.test(event.target.value)) || ((event.target.value).length < 8 && (event.target.value).length > 0))
                    this.setState({ passwordError: true, passwordErrorText: "Password contains 8 or more characters with a mix of uppercase letters, lowercase letters & numbers" })
                else
                    this.setState({ passwordError: false, passwordErrorText: "" })
            }
        }
        this.setState({
            [variable]: event.target.value
        })
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleChangeCapsLock = (event) => {
        this.setState({
            capsLockOn: event.getModifierState('CapsLock')
        })
    }

    componentDidMount() {

    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        //this.form.validateAll();

        const { dispatch, history } = this.props;

        //if (this.checkBtn.context._errors.length === 0) {
        if (!this.state.emailError && !this.state.passwordError) {
            dispatch(login(this.state.email, this.state.password))
                .then(() => {
                    history.push("/profile");
                    window.location.reload();
                    this.setState({
                        loading: false,
                        messageType: "success",
                        open: true
                    });
                })
                .catch(() => {
                    this.setState({
                        loading: false,
                        messageType: "error",
                        open: true
                    });
                    if (this.props.message == "Email not verified!"){
                        this.setState({
                            emailNotVerified: true,
                            
                        });
                    }
                });
        }
        // } else {
        //   this.setState({
        //     loading: false,
        //   });
        // }
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };


    render() {
        const { classes } = this.props;
        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/profile" />;
        }

        return (
            <div className={classes.rootPaper} onMouseOver={this.handleChangeCapsLock}>
                {this.state.emailNotVerified && <EmailNotVerified email={this.state.email} emailNotVerified={this.state.emailNotVerified} login={this.handleLogin}/> }
                <div className={classes.innerDiv}>
                    <Avatar className={classes.avatar}></Avatar>
                    <form
                        className={classes.formRoot}
                        onSubmit={this.handleLogin}
                        ref={(input) => {this.formLogin = input}}
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
                            <FormHelperText margin="none" id="component-error-text" required>{this.state.emailErrorText}</FormHelperText>
                        </FormControl>

                        <FormControl variant="filled" margin="normal" error={this.state.passwordError} fullWidth>
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                onKeyUp={this.handleChangeCapsLock}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.capsLockOn ? <Tooltip title="Caps Lock On" className={classes.capsLock}>
                                            <KeyboardCapslock color='secondary' />
                                        </Tooltip> : ""}
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
                            <FormHelperText margin="none" id="component-error-text" required>{this.state.passwordErrorText}</FormHelperText>
                        </FormControl>

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
                <Snackbar anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }} open={this.state.open} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity={this.state.messageType}>
                        {message}
                    </MuiAlert>
                </Snackbar>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

const LoginWithRedux = connect(mapStateToProps)(Login);
export default withStyles(useStyles)(LoginWithRedux)
