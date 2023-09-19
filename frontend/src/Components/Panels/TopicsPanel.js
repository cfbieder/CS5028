import React, { useState, useEffect, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import LogoBox from "../Box/LogoBox"

export default function TopicsPanel(props) {

    return (
        <Container fixed sx={{ bgcolor: "#bfb8b8" }}>
            <Grid container columnSpacing={2} rowSpacing={2}>
            <LogoBox/>
            </Grid>
        </Container>

    )

}