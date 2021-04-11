import React, { Component } from 'react'
import { withStyles, Dialog, Backdrop, DialogTitle, DialogContentText, DialogContent, Typography, DialogActions, Button } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons/';
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
    button: {
        fontWeight: '700',
        marginTop: '7px',
        float: 'right'
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

class emailNotVerified extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: this.props.emailNotVerified,
        }
        this.handleClose = this.handleClose.bind(this)

    }


    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Dialog
                open={this.state.modalOpen}
                onClose={this.handleClose}
                disableAutoFocus={true}
                maxWidth={false}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}


            >
                <DialogTitle className={classes.body} >Email Verification</DialogTitle>
                <DialogContent dividers={true} >
                    <Typography color="error" variant="h4" gutterBottom>Your email is not verified!</Typography>
                    <Typography color="textPrimary"  >We have sent the verification mail to <Typography color="primary" display="inline">{this.props.email}</Typography>. If you cannot find the mail in the main inbox, please check the Junk/Spam folder.</Typography>
                    <Typography color="textPrimary"  >Please continue once you've verified your email.</Typography>
                    <Button
                        color='primary'
                        size="medium"
                        className={classes.button}
                        onClick={this.props.login}
                    >
                        Continue  <ArrowForward />
                    </Button>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(useStyles)(emailNotVerified)