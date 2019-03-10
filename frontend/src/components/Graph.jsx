import React, { Component } from "react";
import * as d3 from "d3";

//will probably want to change if we get to it, this was fastest
let nodes = [];
let links = [];
let cnames = [];
let graph = undefined;

function clearGraph() {
  nodes = [];
  links = [];
  cnames = [];
}
function addNode(course) {
  let name = course.depart + " " + course.id;
  if (cnames.includes(name) === false) {
    cnames.push(name);
    let node = {};
    node.depart = course.depart;
    node.cid = course.cid;
    node.id = course.name;
    node.desc = course.desc;
    node.cred = course.cred;
    node.pre = course.pre;
    node.info = course.depart + " " + course.cid;
    node.selected = false;
    node.highlighted = false;
    node.x = Math.floor(Math.random() * 950 + 50);
    node.y = Math.floor(Math.random() * 950 + 50);
    nodes.push(node);
  }
}

function addLink(source, target) {
  let link = {};
  link.source = source.name;
  link.target = target.name;
  link.value = 2;
  links.push(link);
}

function readData(data, depart) {
  clearGraph();
  for (let i = 0; i < data.length; i++) {
    let target = data[i];
    if (target.depart == depart) {
      addNode(target);
      for (let j = 0; j < data.length; j++) {
        let source = data[j];
        let name = source.depart + " " + source.cid;
        if (target.pre.includes(name)) {
          addNode(source);
          addLink(source, target);
        }
      }
    }
  }
}

function getColor(entry) {
  if (entry.depart === "CS") {
    if (entry.highlighted === true) {
      return "GreenYellow";
    } else {
      return "Green";
    }
  } else {
    if (entry.highlighted === true) {
      return "Cyan";
    } else {
      return "Blue";
    }
  }
}

function getSize(entry) {
  if (entry.selected === true) {
    return 200;
  } else {
    return 10;
  }
}

function selectCircle(entry) {
  let found = false;
  let sel = nodes[0];
  for (let i = 0; i < nodes.length; i++) {
    if (entry.info === nodes[i].info) {
      found = true;
      sel = nodes[i];
    } else {
      nodes[i].selected = false;
      nodes[i].highlighted = false;
    }
  }

  if (found === true) {
    if (entry.selected === false) {
      entry.selected = true;
      entry.highlighted = true;
      for (let i = 0; i < nodes.length; i++) {
        for (let k = 0; k < nodes.length; k++) {
          let name = nodes[k].info;
          if (sel.pre.includes(name)) {
            nodes[k].highlighted = true;
          } else {
            if (entry.info !== name) {
              nodes[k].highlighted = false;
            }
          }
        }
      }
    } else {
      entry.selected = false;
      entry.highlighted = false;
      for (let i = 0; i < nodes.length; i++) {
        for (let k = 0; k < nodes.length; k++) {
          let name = nodes[k].info;
          if (sel.pre.includes(name)) {
            nodes[k].highlighted = false;
          } else {
            nodes[k].highlighted = false;
          }
        }
      }
    }
    draw();
  }
}

function getText(entry) {
  if (entry.selected === false) {
    return entry.info;
  } else {
    return entry.depart + " " + entry.id + ": " + entry.name;
  }
}

function draw() {
  graph.selectAll("*").remove();

  //draw lines
  //arrows will seem to rquire the use of svg polygons. calculating them will probably be a little complex and I'd rather finalize how
  //we will calculate the positions of everything else before we figure that out

  for (let i = 0; i < nodes.length; i++) {
    let me = nodes[i];

    for (let k = 0; k < nodes.length; k++) {
      let name = nodes[k].info;
      if (me.pre.includes(name)) {
        graph
          .append("line")
          .attr("x1", me.x)
          .attr("x2", nodes[k].x)
          .attr("y1", me.y)
          .attr("y2", nodes[k].y)
          .attr("stroke", "black")
          .attr("stroke-width", ".5");
      }
    }
  }

  //draw circles
  let verts = graph.selectAll("g").data(nodes);

  let vert = verts.enter();
  let grp = vert
    .append("g")
    .attr("id", function(entry) {
      return entry.depart + " " + entry.id;
    })
    .on("click", function(entry) {
      return selectCircle(entry);
    });
  grp
    .append("circle")
    .attr("cx", function(entry) {
      return entry.x;
    })
    .attr("cy", function(entry) {
      return entry.y;
    })
    .attr("r", function(entry) {
      return getSize(entry);
    })
    .attr("fill", function(entry) {
      return getColor(entry);
    });
  grp
    .append("text")
    .attr("x", function(entry) {
      return entry.x - getSize(entry);
    })
    .attr("y", function(entry) {
      return entry.y;
    })
    .attr("style", "font-size: 8px")
    .attr("textLEngth", "20px")
    .text(function(entry) {
      return getText(entry);
    });
}

function start(inc) {
  graph = inc;
  draw();
}

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    //have selected department setting, display only if in that department or dependent on it
    readData(this.props.crs, this.props.depart);

    this.img = d3.select(this.refs.vis).attr("viewBox", "0 0 1000 1000");
    start(this.img);
    draw();
  }

  render() {
    return <svg ref="vis" className="Graph" />;
  }
}

export default Graph;
