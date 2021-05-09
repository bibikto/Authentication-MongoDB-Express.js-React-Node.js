import { Grid, withStyles, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import Typewriter from 'typewriter-effect';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, } from '@material-ui/core/styles';
import "./home.css"
const useStyles = {
    
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.text = [


        ]
        this.sheets = new ServerStyleSheets();
    }

    convertToString = (params) => {
        return ReactDOMServer.renderToString(
            this.sheets.collect(
                <Typography variant={params.variant} gutterBottom display="inline" color={params.color ? params.color : "initial"} dangerouslySetInnerHTML={{ __html: params.text }} />
            ),
        )
    }



    render() {
        const { classes } = this.props
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={["fullHeight"]}
            >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeCursor(this.convertToString({ variant: "h4", color: "secondary", text: "|", }))
                            .typeString(this.convertToString({ variant: "h3", color: "secondary", text: "Hi!", }))
                            .typeString("<br>")
                            .pauseFor(300)
                            .typeString(this.convertToString({ variant: "h4", text: "This website is the collection of all my weird" }))
                            .pauseFor(300)
                            .deleteChars(5)
                            .typeString(this.convertToString({ variant: "h4", text: "<strong>LIT &#128541;</strong> web development projects!" }))
                            .typeString("<br>")
                            .pauseFor(300)
                            .typeString(this.convertToString({ variant: "h4", text: "But..." }))
                            .pauseFor(300)
                            .typeString(this.convertToString({ variant: "h4", text: "how did you get here?!" }))
                            .typeString("<br>")
                            .pauseFor(600)
                            .typeString(this.convertToString({ variant: "h4", text: "Anyway..." }))
                            .pauseFor(300)
                            .typeString(this.convertToString({ variant: "h4", text: "you need to log in to reach the weirdness :)" }))
                            .pauseFor(1000)
                            .start()
                    }}
                />
            </Grid>
        )
    }
}


export default withStyles(useStyles)(Home)