import React, { Component } from 'react';
import './App.css';
import Graph from './components/Graph.jsx';

const core = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
};

const grph = {

};

const panel = {
  width: 500
};

class App extends Component {
  state = {
    courses: [],
    setting: 'CS',
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const courses = await res.json();
      this.setState({
        courses
      });
    } catch (error) {
      console.log(error);
    }
    console.log(this.state.courses);
  };

  setCS() {
  this.setState({setting: 'CS'});
  }

  setMTH() {
    this.setState({setting: 'MTH'});
  }

  render() {
    return (
      <div style={core}>
        <div style={grph}>
          <Graph crs = {this.state.courses}/>
        </div>
        <div style={panel}>
          <div style={core}>
          <button onClick={this.setCS.bind(this)}>
          CS
          </button>
          <button onClick={this.setMTH.bind(this)}>
            Math
          </button>
          </div>
          {this.state.courses.map(item => (
            <div key={item.id}>
              <h1>{item.depart} {item.cid}</h1>
              <p>name: {item.name}</p>
              <p>description: {item.desc}</p>
              <p>credits: {item.cred}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App;
