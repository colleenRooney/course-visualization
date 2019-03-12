import React, { Component } from "react";
import _ from "lodash";
import * as d3 from "d3";

var courses = [];
var links = [];
var height = 700;
var width = 700;
var radius = 10;

var departColor = ["#53cf8d", "#f7d283"];
var simulation = d3
  .forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("charge", d3.forceManyBody().distanceMax(radius * 5))
  .force("collide", d3.forceCollide(radius))
  .force("y", d3.forceY(d => d.focusY))
  .stop();

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      depart: null,
      grad: null
    };

    this.forceTick = this.forceTick.bind(this);
  }

  componentWillMount() {
    simulation.on("tick", this.forceTick);
  }

  componentDidMount() {
    this.container = d3.select(this.refs.container);
    this.renderCourses();

    simulation
      .nodes(courses)
      .alpha(0.9)
      .restart();
  }

  componentDidUpdate() {
    courses = this.props.crs;
    this.setCourses();

    this.renderCourses();
    simulation
      .nodes(courses)
      .alpha(0.9)
      .restart();
  }

  setCourses() {
    courses = [];
    let max = 499;
    let min = 90;
    if (this.props.grad) {
      max = 699;
      min = 500;
    }
    let preqs = "";
    courses = _.chain(this.props.crs)
      .filter(d => d.cid < max)
      .filter(d => d.cid > min)
      .filter(d => d.depart === this.props.depart)
      .map(d => {
        preqs += d.pre;
        return {
          cid: d.cid,
          id: d.name,
          depart: d.depart,
          desc: d.desc,
          cred: d.cred,
          pre: d.pre,
          info: d.depart + " " + d.cid,
          focusY: d.cid
        };
      })
      .value();

    for (let i = 0; i < this.props.crs.length; i++) {
      if (
        preqs.includes(this.props.crs[i].depart + " " + this.props.crs[i].cid)
      ) {
        let d = this.props.crs[i];
        courses.push({
          cid: d.cid,
          id: d.name,
          depart: d.depart,
          desc: d.desc,
          cred: d.cred,
          pre: d.pre,
          info: d.depart + " " + d.cid,
          focusY: d.cid
        });
        console.log(d.pre.replace(/'|\[|\]/g, "").split(","));
      }
    }
  }

  renderCourses() {
    this.circles = this.container.selectAll("circle").data(courses, d => d.id);

    this.circles.exit().remove();

    this.circles = this.circles
      .enter()
      .append("circle")
      .merge(this.circles)
      .attr("r", radius)
      .attr("stroke-width", 3)
      .attr("fill", function(d) {
        if (d.depart === "CS") {
          return departColor[0];
        }
        return departColor[1];
      })
      .attr("stroke", function(d) {
        if (d.depart === "CS") {
          return departColor[0];
        }
        return departColor[1];
      })
      .attr("fill-opacity", 0.5);
  }

  forceTick() {
    this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
  }

  render() {
    return <svg width={width} height={height} ref="container" />;
  }
}

export default Graph;
