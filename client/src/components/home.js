import { Stack, Typography } from '@mui/material'
import React from 'react'
import Typewriter from 'typewriter-effect';

import { renderToString } from 'react-dom/server'
import { useSelector } from 'react-redux';

//Custom import 
import "./Home.css"
import { useTheme } from '@mui/material/styles';

export default function Home() {
    const theme = useTheme();

    const convertToString = (params) => renderToString(
        <Typography
            variant={params.variant}
            gutterBottom
            style={{ display: 'inline', color: 'color' in params ? theme.palette[params.color].main : theme.palette.text.primary }} >
            {params.text}
        </Typography >
    )

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            className={["fullHeight"]}
        >
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .changeCursor(convertToString({ variant: "h4", color: "secondary", text: "|", }))
                        .typeString(convertToString({ variant: "h3", color: "secondary", text: "Hi!", }))
                        .typeString("<br>")
                        .pauseFor(300)
                        .typeString(convertToString({ variant: "h4", text: "This website is the collection of all my weird" }))
                        .pauseFor(300)
                        .deleteChars(5)
                        .typeString(convertToString({ variant: "h4", text: "<strong>LIT &#128541;</strong> web development projects!" }))
                        .typeString("<br>")
                        .pauseFor(300)
                        .typeString(convertToString({ variant: "h4", text: "But..." }))
                        .pauseFor(300)
                        .typeString(convertToString({ variant: "h4", text: "how did you get here?!" }))
                        .typeString("<br>")
                        .pauseFor(600)
                        .typeString(convertToString({ variant: "h4", text: "Anyway..." }))
                        .pauseFor(300)
                        .typeString(convertToString({ variant: "h4", text: "you need to log in to reach the weirdness :)" }))
                        .pauseFor(1000)
                        .start()
                }}
            />
        </Stack>
    );

}

