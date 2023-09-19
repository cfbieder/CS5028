import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import LogoBox from "../Box/LogoBox"

export default function LoginPanel(props) {

    const [name, setName] = useState("");
    useEffect(() => { });


    const nameHandleChange = event => {
        setName(event.target.value)
    }

    const buttonClick = () => {
        props.buttonClick(name);
    }

    return (
        <Container fixed sx={{ bgcolor: "#bfb8b8" }}>
            <Grid container columnSpacing={2} rowSpacing={2}>
            <LogoBox/>
                <Grid item xs={8}>
                    <Stack spacing={2}>
                        <h2>Welcome to HITS.  Enter you name to login</h2>

                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="Enter Name"
                            variant="standard"
                            value={name}
                            onChange={nameHandleChange}
                        />

                        <Button onClick={buttonClick} variant="contained">
                            Click to Submit
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Container>

    );
}