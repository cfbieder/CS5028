import React, { Component } from "react";


import { createTheme  } from "@mui/material/styles";
import { green,blue } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';



const themeX = createTheme({
    palette: {
        primary: green,
        secondary: blue,
      },
    });

export class Home extends Component {
  state = {
    name: ""
  };

  componentDidMount = () => {
    console.log("Page Loaded");
   
  };

  render() {
    return (
        <ThemeProvider theme={themeX}>
        <Container fixed sx={{ bgcolor: '#cfe8fc', height: '10vh' }}>
                <h1 align="center">Main Home Page</h1>
        </Container>

        <Paper color="secondary" sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: 200}}>
          <Button variant="contained">Button 1</Button>
          <Button variant="contained">Button 2</Button>
          <Button color="secondary" variant="contained">Button 3</Button>
        </Paper>
        </ThemeProvider>
    );
  }
}
export default Home;
