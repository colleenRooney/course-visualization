import React, { Component } from "react";
import * as d3 from "d3";
import { nextTick } from "q";

//will probably want to change if we get to it, this was fastest
let nodes = [];
let links = [];
let cnames = [];
let graph = undefined;
let selected = undefined;
let selection = {};

function clearGraph() {
  nodes = [];
  links = [];
  cnames = [];
  selection = {};
}

function addNode(course, grad) {
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
    node.visited = false;
    let cat = course.cid / 100;
    node.x = Math.floor(Math.random() * 900 + 50);
    let lim = [2, 3, 4, 5];
    if (grad) {
      lim = [3, 4, 5, 6];
    }
    if (cat < lim[0]) {
      node.y = Math.floor(Math.random() * 100 + 50);
    } else if (cat < lim[1]) {
      node.y = Math.floor(Math.random() * 100 + 200);
    } else if (cat < lim[2]) {
      node.y = Math.floor(Math.random() * 100 + 350);
    } else if (cat < lim[3]) {
      node.y = Math.floor(Math.random() * 250 + 450);
    } else {
      node.y = Math.floor(Math.random() * 100 + 750);
    }
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

function readData(data, depart, grad) {
  clearGraph();
  let max = 499;
  let min = 90;
  if (grad) {
    max = 699;
    min = 500;
  }
  for (let i = 0; i < data.length; i++) {
    let target = data[i];
    if (target.depart === depart && target.cid <= max && target.cid >= min) {
      addNode(target, grad);
      for (let j = 0; j < data.length; j++) {
        let source = data[j];
        let name = source.depart + " " + source.cid;
        if (target.pre.includes(name)) {
          addNode(source, grad);
          addLink(source, target);
        }
      }
    }
  }
}

function getColor(entry) {
  if (entry.depart === "CS") {
    if (entry.highlighted === true) {
      return "#CCFF66";
    } else {
      return "#CCDD66";
    }
  } else {
    if (entry.highlighted === true) {
      return "#00FF99";
    } else {
      return "#00CC99";
    }
  }
}

function getSize(entry) {
  if (entry.selected === true) {
    return 20;
  } else {
    return 10;
  }
}

function selectCircle(entry) {
  selection = entry;
  let found = false;
  let sel = nodes[0];
  for (let i = 0; i < nodes.length; i++) {
    if (entry.info === nodes[i].info) {
      found = true;
      sel = nodes[i];
      entry.visited = false;
    } else {
      nodes[i].selected = false;
      nodes[i].highlighted = false;
      nodes[i].visited = false;
    }
  }

  if (found === true) {
    if (entry.selected === false) {
      entry.selected = true;
      entry.highlighted = true;
      selected = entry;
      selPre(entry, true);
    } else {
      entry.selected = false;
      entry.highlighted = false;
      selected = entry;
      selPre(entry, false);
    }
    draw();
  }
}

function selPre(entry, res) {
  if(entry) {
    if(entry.visited === false) {
      entry.visited = true;
      for (let k = 0; k < nodes.length; k++) {
        let name = nodes[k].info;
        if (entry.pre.includes(name)) {
          nodes[k].highlighted = res;
          selPre(nodes[k], res);
        }
      }
    }
  }
}

function getText(entry) {
  if (entry.selected === false) {
    return entry.cid;
  } else {
    return entry.info;
    //return entry.depart + " " + entry.cid + ": " + entry.id;
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
    .attr("style", "font-size: 12px, position: center")
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
    this.state = {
      selected: {}
    };
  
  }

  shouldComponentUpdate(nextProps, nextState) {
    if((this.props.depart != nextProps.depart) || (this.props.grad != nextProps.grad) || (this.props.crs != nextProps.crs)) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    //have selected department setting, display only if in that department or dependent on it
    readData(this.props.crs, this.props.depart, this.props.grad);

    this.img = d3.select(this.refs.vis).attr("viewBox", "0 0 1000 1000");
    start(this.img);
    draw();
  }

  /*updateSel(){
    if(sel1 != selection){
      let sel1 = selection;
      sel1 = selection;
      this.setState({
        selected: selection
      });
    }
  }*/


  render() {
    
    return <svg ref="vis" className="Graph" onMouseOver={(event) => this.props.handleSelected(selection)}/>;
  }
}

export default Graph;
