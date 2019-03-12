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
var drag = d3.drag();

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      depart: null,
      grad: null
    };

    this.forceTick = this.forceTick.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  componentWillMount() {
    simulation.on("tick", this.forceTick);
    drag
      .on("start", this.dragStart)
      .on("drag", this.dragCourse)
      .on("end", this.dragEnd);
  }

  componentDidMount() {
    this.container = d3.select(this.refs.container);
    this.renderCourses();
    this.renderLinks();

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
          id: d.depart + " " + d.cid,
          depart: d.depart,
          desc: d.desc,
          cred: d.cred,
          pre: d.pre,
          name: d.name,
          focusY: d.cid
        };
      })
      .value();

    for (let i = 0; i < this.props.crs.length; i++) {
      if (
        preqs
          .toUpperCase()
          .includes(
            this.props.crs[i].depart.toUpperCase() + " " + this.props.crs[i].cid
          )
      ) {
        let d = this.props.crs[i];
        courses.push({
          cid: d.cid,
          id: d.depart + " " + d.cid,
          depart: d.depart,
          desc: d.desc,
          cred: d.cred,
          pre: d.pre,
          name: d.name,
          focusY: d.cid
        });
        var depends = d.pre
          .replace(/'|\[|\]/g, "")
          .toUpperCase()
          .split(",");
        for (let i = 0; i < depends.length; i++) {
          if (depends[i] !== "") {
            var link = {
              source: depends[i],
              target: d.depart + " " + d.cid,
              value: 2
            };
            links.push(link);
          }
        }
      }
      this.renderLinks();
    }
  }

  renderLinks() {
    this.lines = this.container.selectAll("line").data(links);

    this.lines.exit().remove();

    this.lines = this.lines
      .enter()
      .insert("line", "g")
      .attr("stroke", "black")
      .merge(this.lines);
  }

  renderCourses() {
    this.circles = this.container.selectAll("circle").data(courses, d => d.id);

    this.circles.exit().remove();

    this.circles = this.circles
      .enter()
      .append("circle")
      .call(drag)
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
    this.lines
      .attr("x1", d => d.source.x)
      .attr("x2", d => d.target.x)
      .attr("y1", d => d.source.y)
      .attr("y2", d => d.target.y);
  }

  dragStart() {
    simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  dragCourse() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  dragEnd() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  render() {
    return <svg width={width} height={height} ref="container" />;
  }
}

export default Graph;
