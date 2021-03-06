import React, { Component } from "react";
import "./App.css";
import Graph from "./components/Graph.jsx";
import Buttons from "./components/Buttons";
import AddCourse from "./components/AddCourse";

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
      selected: {},
      add: "Add Course",
      highlighted: [],
      list: ""
    };
    this.handleSelected = this.handleSelected.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClear = this.handleClear.bind(this);
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

  handleSelected = (sel, high) => {
    if (sel !== this.state.selected && sel) {
      this.setState({ selected: sel, highlighted: high });
      let name = sel.depart + " " + sel.cid;
      console.log(name);
      if (this.state.list.includes(name)) {
        this.setState({ add: "Remove Course" });
      } else {
        this.setState({ add: "Add Course" });
      }
    }
  };

  handleAdd() {
    let name = this.state.selected.depart + " " + this.state.selected.cid;
    if (this.state.add === "Add Course") {
      let temp = this.state.list + name + ", ";
      console.log("add", this.state.highlighted);
      for (let i = 0; i < this.state.highlighted.length; i++) {
        console.log(this.state.highlighted[i]);
        let temp_pre = this.state.highlighted[i].pre
          .toUpperCase()
          .replace(/'|\[|\]|/g, "")
          .split(",");
        for (let j = 0; j < temp_pre.length; j++) {
          if (temp_pre[j] !== "" && !temp.includes(temp_pre[j])) {
            temp += temp_pre + ", ";
          }
        }
      }
      this.setState({ add: "Remove Course" });
      this.setState({ list: temp });
    } else {
      this.setState({ add: "Add Course" });
      let re = new RegExp(name + ", ", "g");
      let temp = this.state.list.replace(re, "");
      this.setState({ list: temp });
    }
  }

  handleClear() {
    this.setState({ add: "Add Course" });
    this.setState({ list: "" });
  }

  render() {
    return (
      <div className="container-page">
        <div className="banner">
          <h1>Portland State University</h1>
          <p>course visualization</p>
        </div>
        <div className="container-content">
          <div className="graph">
            <Graph
              crs={this.state.courses}
              depart={this.state.setting}
              grad={this.state.grad}
              onSelect={this.handleSelected}
            />
          </div>
          <div className="panel">
            <div>
              <Buttons
                styles={styles}
                onCS={() => this.setCS()}
                onMTH={() => this.setMTH()}
                onGrad={() => this.setGrad()}
                gradButton={this.state.gradButton}
              />
            </div>
            <div className="myCard">
              <h1>
                {this.state.selected.depart} {this.state.selected.cid}
              </h1>
              <p>name: {this.state.selected.name}</p>
              <p>preqs: {this.state.selected.pre}</p>
              <p>credits: {this.state.selected.cred}</p>
              <p>description: {this.state.selected.desc}</p>
            </div>
            <AddCourse
              text={this.state.add}
              onClear={() => this.handleClear()}
              onAdd={() => this.handleAdd()}
            />
            <div className="myCard" id="courseList">
              <p>{this.state.list}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
