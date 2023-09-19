import React, { useState, useEffect, Fragment } from "react";
import Logo from "../Graphics/HITS.png";
import Grid from "@mui/material/Grid";

export default function LogoBox(props) {

    return (<Fragment>
        <Grid item xs={12} alignitems="center">
            <h1>HITS Home Page</h1>
        </Grid>
        <Grid item xs={4} alignitems="center"

            justify="center"
        >

            <img width='100%' src={Logo} alignitems="center"
                justify="center" component="img">
            </img>
        </Grid>
    </Fragment>
    )


}