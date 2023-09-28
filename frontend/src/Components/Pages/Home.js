import React, { Component } from "react";



import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import LoginPanel from "../Panels/LoginPanel";
import TopicsPanel from "../Panels/TopicsPanel";
import FeedsPanel from "../Panels/FeedsPanel";

import REST from "../Code/REST.js";
var restFunctions = new REST();



export class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      showTopics: false,
      topics: [],
      selectedTopic: "",
      selectedFeeds: []
    };
    this.nameHandleChange = this.nameHandleChange.bind(this);
    this.topicHandleChange = this.topicHandleChange.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.topicClick = this.topicClick.bind(this);
  }

  // ***************************************************
  // Process Functions
  // ***************************************************

  getFeedsFromTopic = (id) => {
    var selectedTopic = null;
    for (var t of this.state.topics) {
      if (t._id === id) {
        selectedTopic = t;
      }
    }
    this.setState({ selectedTopic: selectedTopic });

    this.setState({ selectedFeeds: selectedTopic.feeds }, () => {
      restFunctions.getSelectedFeeds(selectedTopic.feeds).then(response => {
        this.setState({ selectedFeeds: response })
      })

    });

  }


  // ***************************************************
  // Event Handlers
  // ***************************************************
  componentDidMount = () => {

  };

  nameHandleChange(event) {
    this.setState({ name: event.target.value });
  }

  topicHandleChange(event) {
    //this.setState({ topic: event.target.value });
  }




  async buttonClick(n) {
    var response = await restFunctions.getTopics()
    if (Object.keys(response).length === 0)
      response = [];
    
    await this.setState({ name: n });
    await this.setState({ showTopics: true });
    await this.setState({ topics: response });
  };


  topicClick(topic) {
    this.setState({ selectedTopic: topic }, () => {
      this.getFeedsFromTopic(topic);
    })
  }

  resetClick() {
    this.setState({ showTopics: false });
    this.setState({ name: "" });
  }

  // ***************************************************
  // Render
  // ***************************************************
  render() {
    var showAlert = this.state.showTopics && this.state.selectedTopic !== ""

    return (

      <Box data-testid="app">
        {!this.state.showTopics && (<LoginPanel buttonClick={this.buttonClick} />)}
        {this.state.showTopics && (<TopicsPanel topics={this.state.topics} topicsClick={this.topicClick} />)}

        {showAlert && (
          <Container fixed sx={{ bgcolor: "#bfb8b8", height: "50vh" }}>
            {(<FeedsPanel selectedFeeds={this.state.selectedFeeds} />)}


            <Grid item xs={12}>
              <Alert severity="success"> Success: {this.state.name} is displaying papers for: {this.state.selectedTopic.name}</Alert>

            </Grid>


            <Grid item xs={12}>
              {(<Button color="secondary" onClick={this.resetClick} variant="contained">
                Logout
              </Button>)}
            </Grid>


          </Container>
        )}
      </Box >
    );
  }
}
export default Home;
