import React, { Component } from 'react';
import './App.css';
import Graph from './components/Graph.jsx';

class App extends Component {
  state = {
    courses: []
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
  }

  render() {
    return (
      <div>
        <div>
          <Graph crs = {this.state.courses}/>
        </div>
        <div>
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
