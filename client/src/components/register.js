import React, { Component } from 'react'
import { withStyles, Dialog, Backdrop, DialogTitle, Button, Divider, DialogContent, FilledInput, DialogActions, InputLabel, FormControl, InputAdornment, Tooltip, IconButton, FormHelperText } from '@material-ui/core'
import { Visibility, VisibilityOff, KeyboardCapslock } from '@material-ui/icons/';
import { connect } from "react-redux";
import { register } from "../actions/auth";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = {
    body: {
        minWidth: '350px',
        width: 'calc(25vw)'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUp: {
        padding: '10px 20px',
        fontWeight: '700',
    },
    divider: {
        margin: '16px'
    },
    button: {
        padding: '10px 20px',
        fontWeight: '700',
        margin: '10px auto 0 auto',
        display: 'block'
    },
    gapCon: {
        display: 'grid',
        gridAutoFlow: 'column',
        gap: '20px'
    },
    '@media screen and (max-width: 600px)': {
        body: {
            width: '100%'
        },
        button: {
            width: '100%'
        },
    }
}


export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
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
            confirmPassword: "",
            confirmPasswordError: false,
            confirmPasswordErrorMessage: "",
            firstName: "",
            lastName: ""
        }
        this.handleClose = this.handleClose.bind(this)
        this.registerClick = this.registerClick.bind(this)
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
        else if (variable == 'password') {
            if ((event.target.value).length == 0)
                this.setState({ passwordError: false, passwordErrorText: "" })
            else {
                const re_uc = /[A-Z]/
                const re_lc = /[a-z]/
                const re_nm = /[0-9]/
                if (!(re_uc.test(event.target.value) && re_lc.test(event.target.value) && re_nm.test(event.target.value)) || ((event.target.value).length < 8 && (event.target.value).length > 0))
                    this.setState({ passwordError: true })
                else
                    this.setState({ passwordError: false })

                if (this.state.confirmPassword.length > 0) {
                    if (event.target.value != this.state.confirmPassword)
                        this.setState({ confirmPasswordError: true, confirmPasswordErrorMessage: "Passwords do not match" })
                    else
                        this.setState({ confirmPasswordError: false, confirmPasswordErrorMessage: "" })
                }
            }

        }
        else if (variable == 'confirmPassword') {
            if (event.target.value.length > 0 && event.target.value != this.state.password)
                this.setState({ confirmPasswordError: true, confirmPasswordErrorMessage: "Passwords do not match" })
            else
                this.setState({ confirmPasswordError: false, confirmPasswordErrorMessage: "" })
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

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    registerClick = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        //this.form.validateAll();

        const { dispatch, history } = this.props;
        if (!this.state.emailError && !this.state.passwordError && !this.state.confirmPasswordError) {
            dispatch(register(this.state.email, this.state.password, this.state.confirmPassword,this.state.firstName,this.state.lastName))
                .then(() => {
                    this.setState({
                        loading: false,
                        modalOpen: false,
                        messageType: "success",
                        open: true
                    })
                })
                .catch(() => {
                    this.setState({
                        loading: false,
                        messageType: "error",
                        open: true
                    });
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
        const { classes } = this.props
        return (
            <div>
                <Snackbar anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }} open={this.state.open} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity={this.state.messageType}>
                        {this.props.message}
                    </MuiAlert>
                </Snackbar>

                <Divider variant="inset" className={classes.divider} />
                <Button
                    variant="contained"
                    color='PRIMARY'
                    size="small"
                    className={classes.signUp}
                    type='submit'
                    onClick={this.registerClick}
                >
                    CREATE NEW ACCOUNT
                    </Button>
                <Dialog
                    className={classes.modal}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    disableAutoFocus={true}
                    maxWidth={false}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}

                    fullWidth
                >
                    <DialogTitle >Sign Up</DialogTitle>
                    <DialogContent dividers={true} className={classes.body}>
                        <form
                            className={classes.formRoot}
                            onSubmit={this.handleLogin}
                        >
                            <div className={classes.gapCon}>
                                <FormControl variant="filled" margin="normal" fullWidth>
                                    <InputLabel htmlFor="filled-adornment-password">First Name</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-firstName"
                                        type='text'
                                        value={this.state.firstName}
                                        onChange={this.handleChange('firstName')}
                                        autoFocus={true}
                                        required
                                    />
                                </FormControl>
                                <FormControl variant="filled" margin="normal" fullWidth>
                                    <InputLabel htmlFor="filled-adornment-password">Last Name</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-lastName"
                                        type='text'
                                        value={this.state.lastName}
                                        onChange={this.handleChange('lastName')}
                                        required
                                    />
                                </FormControl>
                            </div>
                            <FormControl variant="filled" margin="normal" error={this.state.emailError} fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                                <FilledInput
                                    id="filled-adornment-username"
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}

                                    required
                                />
                                <FormHelperText margin="none" id="component-error-text" required>{this.state.emailErrorText}</FormHelperText>
                            </FormControl>
                            <div className={classes.gapCon}>
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
                                    <FormHelperText margin="none" id="component-error-text" required>Use 8 or more characters with a mix of uppercase letters, lowercase letters & numbers</FormHelperText>
                                </FormControl>
                                <FormControl variant="filled" margin="normal" error={this.state.confirmPasswordError} fullWidth>
                                    <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange('confirmPassword')}
                                        onKeyUp={this.handleChangeCapsLock}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                {this.state.capsLockOn ? <Tooltip title="Caps Lock On" className={classes.capsLock}>
                                                    <KeyboardCapslock color='secondary' />
                                                </Tooltip> : ""}

                                            </InputAdornment>

                                        }
                                        required
                                    />
                                    <FormHelperText margin="none" id="component-error-text" required>{this.state.confirmPasswordErrorMessage}</FormHelperText>
                                </FormControl>

                            </div>
                            <Button
                                variant="contained"
                                color='secondary'
                                size="small"
                                className={classes.button}
                                type='submit'
                            >
                                SIGN UP
                    </Button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message
    };
}
const RegisterWithRedux = connect(mapStateToProps)(Register);
export default withStyles(useStyles)(RegisterWithRedux)
