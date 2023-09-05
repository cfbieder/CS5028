import React, { Component } from "react";

import { createTheme } from "@mui/material/styles";
import { green, blue } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

const themeX = createTheme({
  palette: {
    primary: green,
    secondary: blue,
  },
});

const Item = styled(Paper)(({ theme }) => ({
  height: "90%",
}));

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      showMessage: false,
      topic : "A",
    };
    this.nameHandleChange = this.nameHandleChange.bind(this);
    this.topicHandleChange = this.topicHandleChange.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount = () => {
    console.log("Page Loaded");
  };

  nameHandleChange(event) {
    this.setState({ name: event.target.value });
  }

  topicHandleChange(event) {
    this.setState({ topic: event.target.value });
  }

  buttonClick() {
    this.setState({ showMessage: true });
    console.log("State", this.state.showMessage);
  }

  resetClick() {
    this.setState({ showMessage: false });
    this.setState({ name: "" });
    this.setState({ topic: "A" });
  }

  render() {
    const topics = [
      {
        value: "A",
        label: "Topic A",
      },
      {
        value: "B",
        label: "Topic B",
      },
      {
        value: "C",
        label: "Topic C",
      },
      {
        value: "D",
        label: "Topic D",
      },
    ];

    return (
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={themeX}>
          <Container fixed sx={{ bgcolor: "#cfe8fc", height: "10vh" }}>
            <h1 align="center">Main Home Page</h1>
          </Container>

          <Container fixed sx={{ bgcolor: "#cfe8fc", height: "50vh" }}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              <Grid item xs={6}>
                <Item>Enter User Name</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Enter Name"
                    variant="standard"
                    value={this.state.name}
                    onChange={this.nameHandleChange}
                  />
                </Item>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item>Select Topics of Interest</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <TextField
                    id="outlined-select-currency"
                    select
                    defaultValue="A"
                    value={this.state.topic}
                    onChange={this.topicHandleChange}
                  >
                    {topics.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                       
                      </MenuItem>
                    ))}
                  </TextField>
                </Item>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              { !this.state.showMessage && (<Button onClick={this.buttonClick} variant="contained">
                Click to Submit
              </Button>)}
            </Grid>

            <Grid item xs={12}>
              { this.state.showMessage && (<Button color="secondary" onClick={this.resetClick} variant="contained">
                Select New Item
              </Button>)}
            </Grid>

            <Grid item xs={12}>
              {this.state.showMessage && (
                <Alert severity="success"> Success: {this.state.name} has selected Topic {this.state.topic}</Alert>
              )}
            </Grid>
          </Container>
        </ThemeProvider>
      </Box>
    );
  }
}
export default Home;
