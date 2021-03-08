import React, { Component } from 'react'
import { Avatar, withStyles, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Button, Tooltip, Divider, } from '@material-ui/core'
import { Visibility, VisibilityOff, AccountCircle, KeyboardCapslock } from '@material-ui/icons/';
import Register from './Register'


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
        width: '25vw',
        display: 'inherit',
        flexDirection: 'inherit',
        alignItems: 'inherit'
    },
    avatar: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: '13vh',
        width: '13vh',
        marginBottom: '40px'
    },
    formRoot: {
        marginBottom: '20px',
        width: '100%',
        display: 'inherit',
        flexDirection: 'inherit',
        alignItems: 'inherit'
    },
    formBase: {
        width: '100%',
        marginBottom: '20px'
    },
    button: {
        padding: '10px 20px',
        fontWeight: '700'
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
            username: '',
            capsLockOn : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
        this.handleChangeCapsLock = this.handleChangeCapsLock.bind(this)
        
    }

    handleChange = (variable) => (event) => {
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


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.rootPaper} onMouseOver={this.handleChangeCapsLock}>
                <div className={classes.innerDiv}>
                    <Avatar className={classes.avatar}></Avatar>
                    <form className={classes.formRoot}>
                        <FormControl variant="filled" className={classes.formBase}>
                            <InputLabel htmlFor="filled-adornment-password">Username</InputLabel>
                            <FilledInput
                                id="filled-adornment-username"
                                type='text'
                                value={this.state.username}
                                onChange={this.handleChange('username')}
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
                        </FormControl>

                        <FormControl variant="filled" className={classes.formBase}>
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.handleChangePassword}
                                onChange={this.handleChange('password')}
                                onKeyUp={this.handleChangeCapsLock}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.capsLockOn ? <Tooltip title="Caps Lock On" className={classes.capsLock}>
                                            <KeyboardCapslock color='secondary'/>
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
                        </FormControl>
                        
                        <Button
                            variant="contained"
                            color='secondary'
                            size="small"
                            className={classes.button}
                            type='submit'
                        >
                            LOG IN
                    </Button>
                    </form>
                    <Divider variant="inset" flexItem={true} />
                    <Register />
                </div>

            </div>
        )
    }
}

export default withStyles(useStyles)(Login)
