import React, { Component } from 'react'
import { withStyles, Paper } from '@material-ui/core'

const style = {
    
    clockPaper: {
        padding: '10px 15px',
        fontSize: '1.3rem'
    }
}

export class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: '00:00:00 AM ',
            interval : ''
        }
    }

    getTime() {
        const current = new Date();
        const curTime = current.toLocaleTimeString()
        return curTime
    }

    componentDidMount() {
        const interval = setInterval(() => {
            this.setState({
                time: this.getTime()
            })
          }, 1000)

        this.setState({
            interval: interval
        })
    }

    componentWillUnmount () {
        clearInterval(this.state.interval)
    }
    render() {
        const { classes } = this.props
        return (
                <Paper className={classes.clockPaper}>{this.state.time}</Paper>
        )
    }
}

export default withStyles(style)(TopBar)
