import React, { Component } from "react";
import _ from "lodash";
import * as d3 from "d3";

var courses = [];
var links = [];
var height = 800;
var width = 1000;
var radius = 10;
var lineWidth = 1;
var linkDist = 100;
var radiusLarge = 100;
var selected = false;

var departColor = ["#53cf8d", "#f7d283"];
var simulation = d3
  .forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force(
    "collide",
    d3.forceCollide().radius(function(d) {
      return d.radius * 2;
    })
  )
  .force("charge", d3.forceManyBody().distanceMax(radius * 5))
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(this.props);
    if (
      this.props.depart === nextProps.depart &&
      this.props.grad === nextProps.grad &&
      this.props.crs === nextProps.crs
    ) {
      return false;
    } else {
      return true;
    }
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
    links = [];
    d3.selectAll("svg > *").remove();
    let max = 499;
    let min = 90;
    if (this.props.grad) {
      max = 699;
      min = 500;
    }
    let preqs = {};
    courses = _.chain(this.props.crs)
      .filter(d => d.cid < max)
      .filter(d => d.cid > min)
      .filter(d => d.depart === this.props.depart)
      .map(d => {
        var ID = d.depart.toUpperCase() + d.cid;
        var ID_pre = d.pre
          .toUpperCase()
          .replace(/'|\[|\]| /g, "")
          .split(",");
        preqs[ID] = ID_pre;

        return {
          cid: d.cid,
          id: ID,
          depart: d.depart,
          desc: d.desc,
          cred: d.cred,
          pre: d.pre,
          name: d.name,
          r: radius,
          selected: false,
          focusY: d.cid + 100
        };
      })
      .value();

    for (let i = 0; i < this.props.crs.length; i++) {
      for (let t in preqs) {
        let s = this.props.crs[i];
        if (preqs[t].includes(s.depart + s.cid)) {
          courses.push({
            cid: s.cid,
            id: s.depart + s.cid,
            depart: s.depart,
            desc: s.desc,
            cred: s.cred,
            pre: s.pre,
            name: s.name,
            r: radius,
            selected: false,
            focusY: s.cid
          });
          var link = {
            source: s.depart + s.cid,
            target: t,
            value: 5
          };
          links.push(link);
        }
      }
    }
    var edges = [];
    links.forEach(function(e) {
      var sourceNode = courses.filter(function(n) {
          if ((n.id === e.source) !== undefined) {
            return n.id === e.source;
          } else {
            return 0;
          }
        })[0],
        targetNode = courses.filter(function(n) {
          if ((n.id === e.target) !== undefined) {
            return n.id === e.target;
          } else {
            return 0;
          }
        })[0];
      edges.push({
        source: sourceNode,
        target: targetNode
      });
    });
    links = edges;
    this.renderLinks();
    simulation.force(
      "link",
      d3
        .forceLink(links)
        .id(d => d.id)
        .distance(linkDist)
    );
  }

  renderLinks() {
    this.lines = this.container.selectAll("link").data(links);

    this.lines.exit().remove();

    this.lines = this.lines
      .enter()
      .insert("line", "g")
      .attr("stroke-width", lineWidth)
      .attr("stroke", "#d3d3d3")
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
      .attr("r", d => d.r)
      .attr("id", d => d.id)
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
      .attr("fill-opacity", 0.5)
      .on("click", function(d) {
        d3.selectAll("circle")
          .transition()
          .attr("r", radius);
        if (!d.selected) {
          selected = this.__data__;
          d3.select(this)
            .transition()
            .attr("r", radiusLarge);
          d.selected = true;
          d.r = radiusLarge;
        } else {
          selected = false;
          d.selected = false;
          d.r = radius;
        }
        simulation.force(
          "collide",
          d3.forceCollide().radius(function(d) {
            return d.r;
          })
        );
      });
  }

  forceTick() {
    this.props.onSelect(selected);
    simulation.force("y", d3.forceY(d => d.focusY)).restart();

    this.circles
      .attr("cx", function(d) {
        return (d.x = Math.max(d.r + 5, Math.min(width - d.r - 5, d.x)));
      })
      .attr("cy", function(d) {
        return (d.y = Math.max(d.r + 5, Math.min(width - d.r - 5, d.y)));
      });
    this.lines
      .attr("x1", function(d) {
        let dist = Math.sqrt(
          Math.pow(d.target.x - d.source.x, 2) +
            Math.pow(d.target.y - d.source.y, 2)
        );
        let t = d.source.r / dist;
        return (1 - t) * d.source.x + t * d.target.x;
      })
      .attr("x2", function(d) {
        let dist = Math.sqrt(
          Math.pow(d.source.x - d.target.x, 2) +
            Math.pow(d.source.y - d.target.y, 2)
        );
        let t = d.target.r / dist;
        return (1 - t) * d.target.x + t * d.source.x;
      })
      .attr("y1", function(d) {
        let dist = Math.sqrt(
          Math.pow(d.target.x - d.source.x, 2) +
            Math.pow(d.target.y - d.source.y, 2)
        );
        let t = d.source.r / dist;
        return (1 - t) * d.source.y + t * d.target.y;
      })
      .attr("y2", function(d) {
        let dist = Math.sqrt(
          Math.pow(d.source.x - d.target.x, 2) +
            Math.pow(d.source.y - d.target.y, 2)
        );
        let t = d.target.r / dist;
        return (1 - t) * d.target.y + t * d.source.y;
      });
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
