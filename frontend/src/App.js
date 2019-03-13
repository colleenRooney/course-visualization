import React, { Component } from "react";
import "./App.css";
import Graph from "./components/Graph.jsx";
import Buttons from "./components/Buttons";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundcolor: "#383838",
    "&:hover": {
      backgroundcolor: "#282828"
    },
    color: "white",
    fontweight: "bold",
    boxshadow: "0 3px 5px 2px #ccffcc"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      setting: "CS",
      grad: true,
      gradButton: "Undergraduate",
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

  setGrad() {
    if (this.state.grad) {
      this.setState({ grad: false });
      this.setState({ gradButton: "Graduate" });
    } else {
      this.setState({ grad: true });
      this.setState({ gradButton: "Undergraduate" });
    }
  }

  handleSelected = selected => {
    console.log(selected);
  };

  render() {
    console.log(this.state);
    return (
      <div className="core">
        <div className="graph">
          <Graph
            crs={this.state.courses}
            depart={this.state.setting}
            grad={this.state.grad}
            onSelect={this.handleSelected}
          />
        </div>
        <div className="panel">
          <div className="core">
            <Buttons
              styles={styles}
              onCS={() => this.setCS()}
              onMTH={() => this.setMTH()}
              onGrad={() => this.setGrad()}
              gradButton={this.state.gradButton}
            />
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
