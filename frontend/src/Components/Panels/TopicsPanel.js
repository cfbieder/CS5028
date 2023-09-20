import React, { useState, useEffect, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import LogoBox from "../Box/LogoBox"

export default function TopicsPanel(props) {

    const handleClick = (topic) => {

        props.topicsClick(topic);
    }

    return (
        <Container fixed sx={{ bgcolor: "#bfb8b8" }}>
            <Grid container columnSpacing={2} rowSpacing={2}>
                <LogoBox />
                <Grid item xs={8}>
                    <Stack spacing={2}>
                        <h2>Select topics from the list you are monitoring below
                            <Paper style={{ maxHeight: 120, overflow: 'auto' }}>
                                <List style={{ maxHeight: '100%', overflow: 'auto' }} >
                                    {props.topics.map((topic) => <ListItemButton key = {topic._id} onClick={() => handleClick(topic._id)}><ListItemText primary={topic.name} /></ListItemButton>)}
                                </List>
                            </Paper>
                        </h2>
                    </Stack>
                </Grid>
            </Grid>
        </Container >

    )

}