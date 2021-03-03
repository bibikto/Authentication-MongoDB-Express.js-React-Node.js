import React, { Component } from 'react'
import { withStyles, IconButton ,Tooltip } from '@material-ui/core'
import { Brightness7, Brightness4 } from '@material-ui/icons/';
import { connect } from "react-redux"
import {
    themeSwitch
} from "../redux/Theme/theme.actions"

import Clock from './Clock'

const style = {
    rootPaper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        position: 'absolute',
        top:0,
        width: '100%'
    },
    rightBar: {
        display: 'flex',
        '&*': {
            marginLeft: '5000px'
        }
    },
}
export class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: '00:00:00 AM ',
            interval: ''
        }
    }
    render() {
        const { classes } = this.props
        console.log()
        return (
            <div className={classes.rootPaper}>
                <div></div>
                <div className={classes.rightBar}>
                    <Tooltip title="Toggle theme">
                        <IconButton
                            onClick={() => this.props.themeSwitch()}
                        >
                            {this.props.theme.palette.type === 'dark' ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip >
                    <Clock></Clock>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        themeSwitch: () => dispatch(themeSwitch()),
    }
}


const TopBarWithStore = connect(mapStateToProps, mapDispatchToProps)(TopBar)
export default withStyles(style)(TopBarWithStore)
