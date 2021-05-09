import React, { Component } from 'react'
import { withStyles, IconButton, Tooltip, Button, Grid, Slide, Icon, AppBar, Toolbar, Zoom } from '@material-ui/core'
import { Brightness7, Brightness4, ArrowBack, HomeRounded, PersonRounded } from '@material-ui/icons/';
import { connect } from "react-redux"
import { logout } from "../actions/auth";
import { withRouter } from "react-router";
import XDButton from '../assets/XDButton'
import {
    themeSwitch
} from "../redux/theme/theme.actions"

// import Clock from './clock'



const style = theme => ({

    barSectionRight: {
        display: 'flex',
        gap: '5px'
    },
    homeIcon: {
        width: '48px',
        height: '48px',
        overflowX: 'hidden',
        borderRadius: '15px',
        backgroundColor: `${theme.palette.secondary[theme.palette.type]} !important`
    }
})

export class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: '00:00:00 AM',
            interval: '',
            currentPath: this.props.location.pathname,
            prevPath: null,
            homeIcon: 'default'
        }

    }

    static getDerivedStateFromProps(props, state) {
        const currentPath = state.currentPath
        if (props.location.pathname !== currentPath) {
            return { prevPath: currentPath, currentPath: props.location.pathname }
        }
        return null
    }

    render() {
        const { dispatch, history } = this.props;
        const { classes } = this.props

        return (
            <AppBar color="transparent">
                <Toolbar>
                    <Grid
                        container
                        justify='space-between'
                        wrap='nowrap'
                    >
                        <div className={classes.barSection}>

                            <Zoom in={this.state.prevPath && this.state.prevPath !== "/login"} mountOnEnter unmountOnExit>
                                <Tooltip title="Go Back">
                                    <IconButton
                                        onClick={() => history.goBack()}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                </Tooltip >
                            </Zoom>
                            <IconButton
                                onClick={() => history.push('/')}
                                className={classes.homeIcon}
                                onMouseEnter={() => {
                                    this.setState({
                                        homeIcon: "hover"
                                    })
                                }}
                                onMouseLeave={() => {
                                    this.setState({
                                        homeIcon: "default"
                                    })
                                }}
                            >

                                <Slide direction="right" in={this.state.homeIcon !== "default"} mountOnEnter unmountOnExit>
                                    <HomeRounded />
                                </Slide>
                                <Slide direction="left" in={this.state.homeIcon !== "hover"} mountOnEnter unmountOnExit>
                                    <Icon>
                                        <XDButton />
                                    </Icon>
                                </Slide>
                            </IconButton>

                        </div>
                        <div className={classes.barSectionRight}>
                            <Tooltip title="Toggle theme">
                                <IconButton
                                    onClick={() => dispatch(themeSwitch())}
                                >
                                    {this.props.theme.palette.type === 'dark' ? <Brightness7 /> : <Brightness4 />}
                                </IconButton>
                            </Tooltip >

                            <Zoom in={this.props.loggedIn} mountOnEnter unmountOnExit>

                                <Button
                                    variant="outlined"
                                    color='primary'
                                    size="small"
                                    className={classes.button}
                                    onClick={() => { dispatch(logout()) }}

                                >
                                    LOG OUT
                        </Button>
                            </Zoom>

                            <Zoom in={this.state.currentPath !== "/login" && !this.props.loggedIn} mountOnEnter unmountOnExit>
                                <Button
                                    variant="outlined"
                                    color='secondary'
                                    size="small"
                                    className={classes.button}
                                    startIcon={<PersonRounded />}
                                    onClick={() => { history.push('/login') }} >

                                    LOG IN
                        </Button>
                            </Zoom>

                            {/* <Clock></Clock> */}
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}



const TopBarWithRouter = withRouter(TopBar);
const TopBarWithStore = connect(mapStateToProps)(TopBarWithRouter)
export default withStyles(style)(TopBarWithStore)
