import React, { Component } from 'react'
import {  MenuItem, Zoom, IconButton, Popper, Grow, Paper, ClickAwayListener, MenuList,withStyles } from '@material-ui/core';
import { AccountCircleRounded , ExitToAppRounded} from '@material-ui/icons/';

import { logout } from "../../actions/auth";

const style = theme => ({

    menuListRoot: {
        "& *" : {
            display: "flex",
            gap: "10px"
        }
    },
    
})

 class UserMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.anchorRef = React.createRef();
    }

    handleClose = (event) => {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return;
        }

        this.setState({
            open: false
        })
    }

    handleListKeyDown = (event) =>{
        if (event.key === 'Tab') {
          event.preventDefault();
          this.setState({
            open: false
        })
        }
      }

    render() {
        const { dispatch ,classes} = this.props
        return (
            <>
                <Zoom in={this.props.loggedIn} mountOnEnter unmountOnExit>
                    <IconButton
                        ref={this.anchorRef}
                        aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={(event) => {
                            this.setState({ open: true })
                        }}
                    >
                        <AccountCircleRounded />
                    </IconButton>
                </Zoom>
                <Popper open={this.state.open} anchorEl={this.anchorRef.current} placement="bottom-end" role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper >
                                <ClickAwayListener onClickAway={(event) => this.handleClose(event)}>
                                    <MenuList autoFocusItem={this.state.open} id="menu-list-grow" onKeyDown={(event) => {this.handleListKeyDown(event)}} className={classes.menuListRoot}>
                                        <MenuItem onClick={(event) => this.handleClose(event)}>Profile</MenuItem>
                                        <MenuItem onClick={(event) => this.handleClose(event)}>My account</MenuItem>
                                        <MenuItem onClick={(event) => {
                                            dispatch(logout())
                                            this.handleClose(event)
                                        }}> <ExitToAppRounded />Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>

            </>
        )
    }
}


export default withStyles(style)(UserMenu)