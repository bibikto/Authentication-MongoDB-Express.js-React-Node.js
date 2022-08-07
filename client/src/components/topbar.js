import {
    AppBar, Button,
    Grid, Icon, IconButton, Slide, Toolbar, Tooltip, Zoom, Stack
} from '@mui/material';
import { ArrowBack, Brightness4, Brightness7, HomeRounded, PersonRounded } from '@mui/icons-material/';
import { makeStyles } from '@mui/styles/';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

//Custom Impots
import XDButton from '../assets/XDButton';
import {
    themeSwitch
} from "../redux/theme/theme.actions";
import { useTheme } from '@mui/material/styles';
import UserMenu from './TopBar/userMenu';

// import Clock from './clock'



const useStyles = makeStyles((theme) => ({

    homeIcon: {
        width: '48px',
        height: '48px',
        overflowX: 'hidden',
        borderRadius: '15px',
        backgroundColor: `${theme.palette.secondary[theme.palette.mode]} !important`
    }
}));

export default function TopBar(props) {
    const { loggedIn } = props;
    const classes = useStyles();

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [previousPath, setPreviousPath] = useState(null);
    const [homeIcon, setHomeIcon] = useState('default')


    useEffect(() => {
        if (location.pathname !== currentPath) {
            setPreviousPath(currentPath)
            setCurrentPath(location.pathname)
        }
    }, [location.pathname]);


    return (
        <AppBar color="transparent">
            <Toolbar>
                <Grid
                    container
                    justifyContent='space-between'
                    wrap='nowrap'
                >
                    <Stack direction="row" spacing={1}>

                        <Zoom in={previousPath && previousPath !== "/login"} mountOnEnter unmountOnExit>
                            <Tooltip title="Go Back">
                                <IconButton onClick={() => navigate(-1)} size="large">
                                    <ArrowBack />
                                </IconButton>
                            </Tooltip >
                        </Zoom>

                        <IconButton
                            onClick={() => navigate("/")}
                            className={classes.homeIcon}
                            onMouseEnter={() => { setHomeIcon("hover") }}
                            onMouseLeave={() => { setHomeIcon("default") }}
                            size="large">

                            <Slide direction="right" in={homeIcon !== "default"} mountOnEnter unmountOnExit>
                                <HomeRounded />
                            </Slide>
                            <Slide direction="left" in={homeIcon !== "hover"} mountOnEnter unmountOnExit>
                                <Icon>
                                    <XDButton />
                                </Icon>
                            </Slide>
                        </IconButton>

                    </Stack >
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Toggle theme">
                            <IconButton onClick={() => dispatch(themeSwitch())} size="large">
                                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Tooltip >


                        <UserMenu loggedIn={loggedIn} dispatch={dispatch} />

                        <Zoom in={!currentPath !== "/login" && !loggedIn} mountOnEnter unmountOnExit>

                            <Button
                                onClick={() => navigate("/login")}
                                variant="outlined"
                                color='secondary'
                                size="small"
                                className={classes.button}
                                startIcon={<PersonRounded />}
                            >
                                LOG IN
                            </Button>

                        </Zoom>

                        {/* <Clock></Clock> */}
                    </Stack>
                </Grid>
            </Toolbar>
        </AppBar >
    );

}

