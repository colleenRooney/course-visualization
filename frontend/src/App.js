import React, { Component } from "react";
import "./App.css";
import Graph from "./components/Graph.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      setting: "CS",
      selected: {}
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/");
      const courses = await res.json();
      this.setState({
        courses
      });
    } catch (error) {
      console.log(error);
    }
  }

  setCS() {
    this.setState({ setting: "CS" });
  }

  setMTH() {
    this.setState({ setting: "MTH" });
  }

  render() {
    console.log(this.state);
    return (
      <div className="core">
        <div className="grph">
          <Graph crs={this.state.courses} depart={this.state.setting} />
        </div>
        <div className="panel">
          <div className="core">
            <button onClick={this.setCS.bind(this)}>CS</button>
            <button onClick={this.setMTH.bind(this)}>Math</button>
          </div>
          {this.state.courses.map(item => (
            <div key={item.id}>
              <h1>
                {item.depart} {item.cid}
              </h1>
              <p>name: {item.name}</p>
              <p>preqs: {item.pre}</p>
              <p>credits: {item.cred}</p>
              <p>description: {item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
