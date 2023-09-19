import React, { Component } from "react";



import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import LoginPanel from "../Panels/LoginPanel";
import TopicsPanel from "../Panels/TopicsPanel";



export class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      showMessage: false,
      topic: "A",
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

  buttonClick(n) {
    this.setState({ showMessage: true });
    console.log("State", this.state.showMessage);
    console.log(n);
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

        {!this.state.showMessage && (<LoginPanel buttonClick={this.buttonClick}/> )}
        {this.state.showMessage && (<TopicsPanel/> )}
        <Container fixed sx={{ bgcolor: "#bfb8b8", height: "50vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>

              <p>Select Topics of Interest</p>

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


            </Grid>
          </Grid>

          <Grid item xs={12}>

          </Grid>

          <Grid item xs={12}>
            {this.state.showMessage && (<Button color="secondary" onClick={this.resetClick} variant="contained">
              Select New Item
            </Button>)}
          </Grid>

          <Grid item xs={12}>
            {this.state.showMessage && (
              <Alert severity="success"> Success: {this.state.name} has selected Topic {this.state.topic}</Alert>
            )}
          </Grid>
        </Container>
      </Box >
    );
  }
}
export default Home;
