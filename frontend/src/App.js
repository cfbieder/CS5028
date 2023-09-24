import React, { Component } from "react";
import Home from "./Components/Pages/Home";
import './App.css';

class App extends Component {


  render() {

    var mode = process.env.NODE_ENV;
    console.log("[FE] mode: %s", mode);

    return (
    <Home />
    )
  }




}

export default App;