import { KeyboardCapslock, Visibility, VisibilityOff } from '@mui/icons-material/';
import { Alert, Backdrop, Button, Dialog, Checkbox, DialogActions, FormGroup, FormControlLabel, DialogContent, DialogTitle, Divider, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Tooltip, Zoom } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from "../actions/auth";
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
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
}))

const CustomCheckbox = styled(Checkbox)({
    paddingBottom: 0,
    paddingTop: 3
})


export default function Register() {

    const [modalOpen, setModalOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [capsLockOn, setCapsLockOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [open, setOpen] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const emailErrorMessage = "Invalid Email Address!"
    const confirmPasswordErrorMessage = "Passwords do not match"


    const message = useSelector(state => state.auth.message);

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChangeEmail = async (event) => {
        setEmail(event.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (event.target.value && !re.test(String(event.target.value).toLowerCase())) {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }
    }

    const handleChangePassword = async (event) => {
        setPassword(event.target.value);
        if ((event.target.value).length === 0)
            setPasswordError(false)
        else {
            const re_uc = /[A-Z]/
            const re_lc = /[a-z]/
            const re_nm = /[0-9]/
            if (!(re_uc.test(event.target.value) && re_lc.test(event.target.value) && re_nm.test(event.target.value)) || ((event.target.value).length < 8 && (event.target.value).length > 0))
                setPasswordError(true)
            else
                setPasswordError(false)

            if (confirmPassword.length > 0) {
                if (event.target.value !== confirmPassword)
                    setConfirmPasswordError(true)

                else
                    setConfirmPasswordError(false)

            }
        }
    }

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value.length > 0 && event.target.value !== password)
            setConfirmPasswordError(true)

        else
            setConfirmPasswordError(false)
    }

    const handleClickShowPassword = async () => {
        setShowPassword((prevState) => !prevState)
    };


    const handleChangeCapsLock = async (event) => {
        setCapsLockOn(event.getModifierState('CapsLock'))
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (!emailError && !passwordError && !confirmPasswordError) {
            dispatch(register(email, password, confirmPassword, firstName, lastName))
                .then(() => {
                    setLoading(false)
                    setModalOpen(false)
                    setMessageType("success")
                    setOpen(true)
                })
                .catch(() => {
                    setLoading(false)
                    setMessageType("error")
                    setOpen(true)
                });
        }
    }



    return (
        <>
            <Divider variant="inset" className={classes.divider} />
            <Button
                variant="contained"
                size="small"
                className={classes.signUp}
                type='submit'
                onClick={() => setModalOpen(true)}
            >
                CREATE NEW ACCOUNT
            </Button>
            <Dialog
                className={classes.modal}
                open={modalOpen}
                onClose={() => { setModalOpen(false) }}
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
                        onSubmit={handleLogin}
                    >
                        <div className={classes.gapCon}>
                            <FormControl variant="filled" margin="normal" fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">First Name</InputLabel>
                                <FilledInput
                                    id="filled-adornment-firstName"
                                    type='text'
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    autoFocus={true}
                                    required
                                />
                            </FormControl>
                            <FormControl variant="filled" margin="normal" fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">Last Name</InputLabel>
                                <FilledInput
                                    id="filled-adornment-lastName"
                                    type='text'
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                />
                            </FormControl>
                        </div>
                        <FormControl variant="filled" margin="normal" error={emailError} fullWidth>
                            <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                            <FilledInput
                                id="filled-adornment-username"
                                type='email'
                                value={email}
                                onChange={handleChangeEmail}

                                required
                            />
                            <FormHelperText id="component-error-text" required>{emailError ? emailErrorMessage : ""}</FormHelperText>
                        </FormControl>
                        <div className={classes.gapCon}>
                            <FormControl variant="filled" margin="normal" error={passwordError} fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handleChangePassword}
                                    onKeyUp={handleChangeCapsLock}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {capsLockOn ? <Tooltip title="Caps Lock On" className={classes.capsLock}>
                                                <KeyboardCapslock color='secondary' />
                                            </Tooltip> : ""}
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
                                <FormGroup>
                                    <FormControlLabel componentsProps={{ typography: { variant: 'body2', color: 'primary' } }} control={<CustomCheckbox disabled size='small' />} label="8 Or More Characters" />
                                    <FormControlLabel componentsProps={{ typography: { variant: 'body2', color: 'primary' } }} control={<CustomCheckbox disabled size='small' />} label="Uppercase Letter" />
                                    <FormControlLabel componentsProps={{ typography: { variant: 'body2', color: 'primary' } }} control={<CustomCheckbox disabled size='small' />} label="Lowercase Letter" />
                                    <FormControlLabel componentsProps={{ typography: { variant: 'body2', color: 'primary' } }} control={<CustomCheckbox disabled size='small' />} label="Number" />
                                </FormGroup>
                                {/* <FormHelperText id="component-error-text" required>Use 8 or more characters with a mix of uppercase letters, lowercase letters & numbers</FormHelperText> */}
                            </FormControl>
                            <FormControl variant="filled" margin="normal" error={confirmPasswordError} fullWidth>
                                <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleChangeConfirmPassword}
                                    onKeyUp={handleChangeCapsLock}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {capsLockOn ? <Tooltip title="Caps Lock On" className={classes.capsLock}>
                                                <KeyboardCapslock color='secondary' />
                                            </Tooltip> : ""}

                                        </InputAdornment>

                                    }
                                    required
                                />
                                <FormHelperText id="component-error-text" required>{confirmPasswordError ? confirmPasswordErrorMessage : ""}</FormHelperText>
                            </FormControl>

                        </div>
                        {/* {Object.keys(message['item']).map((item) => {
                            return (<Zoom in={open} mountOnEnter unmountOnExit>
                                <Alert className={classes.alert} variant="outlined" severity={item}>{message[item]}</Alert>
                            </Zoom>)
                        })} */}
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
        </ >
    );
}



