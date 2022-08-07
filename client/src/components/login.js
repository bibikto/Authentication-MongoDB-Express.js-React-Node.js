import { AccountCircle, KeyboardCapslock, Visibility, VisibilityOff } from '@mui/icons-material/';
import { Avatar, Button, Fade, FilledInput, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Alert, FormControlLabel, FormGroup, Checkbox, Zoom, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles/';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';
import { styled } from '@mui/system'

//Custom Component Import
import Register from './Register';
import { login } from "../actions/auth";
import EmailNotVerified from "./emailNotVerified";

const useStyles = makeStyles((theme) => ({
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
}));

const CustomCheckbox = styled(Checkbox)({
    paddingBottom: 3,
    paddingTop: 3
})

// const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
//     paddingTop: 3,
//     color: "rgba(255, 255, 255, 0.7)"
// }));


export default function Login(props) {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailNotVerified, setEmailNotVerified] = useState(false);
    const [passwordError, setPasswordError] = useState(false)

    const emailErrorMessage = "That Doesn't Look Like A Valid Email Address!"
    const message = useSelector(state => state.auth.message);
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const handleChange = (event, _var) => {
        switch (_var) {
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const newEmailInput = event.target.value;

                setEmail(newEmailInput);

                if (newEmailInput && !re.test(String(newEmailInput).toLowerCase())) {
                    setEmailError(true);
                    break;
                }

                setEmailError(false);
                break;
            case 'password':
                setPassword(event.target.value);

        }
    }

    const handleClickShowPassword = async () => {

        setShowPassword((prevState) => !prevState)

    };

    const handleMouseDownPassword = async (event) => {
        event.preventDefault();
    };



    const handleLogin = async (e) => {
        e.preventDefault();


        setLoading(true)

        if (!emailError && !passwordError) {
            dispatch(login(email, password))
                .then(() => {
                    navigate("/profile");
                    setLoading(false)
                    setOpen(true)

                })
                .catch(() => {
                    setLoading(false)
                    setOpen(true)
                    if (message.info === "Email not verified!")
                        emailNotVerified(true)
                });
        }

    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false)
    };


    return (
        <Fade in={true}>
            <Grid
                container
                justifyContent="center"
                alignItems='center'
                wrap='nowrap'
                direction='column'
                className={classes.rootPaper} >
                {emailNotVerified && <EmailNotVerified email={email} emailNotVerified={emailNotVerified} login={handleLogin} />}
                <div className={classes.innerDiv}>
                    <Avatar className={classes.avatar}></Avatar>
                    <form
                        className={classes.formRoot}
                        onSubmit={handleLogin}
                    // ref={(input) => { formLogin = input }}
                    >

                        <FormControl variant="filled" margin="normal" error={emailError} fullWidth>
                            <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                            <FilledInput
                                id="filled-adornment-username"
                                type='email'
                                value={email}
                                onChange={(event) => handleChange(event, 'email')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton size="large">
                                            <AccountCircle />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                autoFocus={true}
                                required
                            />
                            <FormHelperText id="component-error-text" required>{emailError ? emailErrorMessage : ""}</FormHelperText>
                        </FormControl>

                        <FormControl variant="filled" margin="normal" error={passwordError} fullWidth>
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => handleChange(event, 'password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <ReactIsCapsLockActive>
                                            {active =>
                                                active && <Tooltip title="Caps Lock On" className={classes.capsLock}>
                                                    <KeyboardCapslock color='secondary' />
                                                </Tooltip>}
                                        </ReactIsCapsLockActive>
                                        <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                size="large">
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                }

                                required
                            />
                        </FormControl>
                        {/* {Object.keys(message).map((item, index) => {
                            return (<Zoom in={open} mountOnEnter unmountOnExit>
                                <Alert className={classes.alert} severity={item}>{message[item]}</Alert>
                            </Zoom>)
                        })} */}

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
                    }} open={open} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity={messageType}>
                            {message}
                        </MuiAlert>
                    </Snackbar> */}



            </Grid>
        </Fade>
    );

}


