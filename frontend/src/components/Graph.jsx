import React, { Component } from "react";
import * as d3 from "d3";

//will probably want to change if we get to it, this was fastest
let entries = [];
let names = [];
let posns = []
let graph = undefined;

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
    return 20;
  } else {
    return 10;
  }
}

function selectCircle(entry) {
  console.log("clicked");
  let found = false;
  let sel = entries[0];
  console.log("entry: " + entry.id);
  for (let i = 0; i < entries.length; i++) {
    if (entry.depart + " " + entry.id === entries[i].info) {
      console.log("found");
      found = true;
      sel = entries[i];
    } else {
      entries[i].selected = false;
      entries[i].highlighted = false;
    }
  }

  if (found === true) {
    if (entry.selected === false) {
      entry.selected = true;
      entry.highlighted = true;
      console.log("sel highlighted: " + sel.highlighted + " should be true");
      for (let i = 0; i < entries.length; i++) {
        for (let k = 0; k < entries.length; k++) {
          let name = entries[k].depart + " " + entries[k].id;
          if (sel.pre.includes(name)) {
            console.log("highlighting");
            entries[k].highlighted = true;
          } else {
            if (entry.depart + " " + entry.id !== name) {
              entries[k].highlighted = false;
            }
          }
        }
      }
      console.log("sel highlighted: " + sel.highlighted + " should be true");
    } else {
      entry.selected = false;
      entry.highlighted = false;
      for (let i = 0; i < entries.length; i++) {
        for (let k = 0; k < entries.length; k++) {
          let name = entries[k].depart + " " + entries[k].id;
          if (sel.pre.includes(name)) {
            entries[k].highlighted = false;
          } else {
            entries[k].highlighted = false;
          }
        }
      }
    }
    console.log("sel highlighted: " + sel.highlighted + " should be true");
    console.log("made it this far");
    draw();
  }
}

function getText(entry) {
  if (entry.selected === false) {
    return entry.id;
  } else {
    return (
      entry.depart + " " + entry.id + ": " + entry.name
    );
  }
}

function draw() {
  graph.selectAll("*").remove();

  //draw lines
  //arrows will seem to rquire the use of svg polygons. calculating them will probably be a little complex and I'd rather finalize how
  //we will calculate the positions of everything else before we figure that out

  for (let i = 0; i < entries.length; i++) {
    console.log("entries 1:" + entries);
    let me = entries[i];
    let name = me.depart + " " + me.id;
    console.log(name);

    for (let k = 0; k < entries.length; k++) {
      let name = entries[k].depart + " " + entries[k].id;
      if (me.pre.includes(name)) {
        graph
          .append("line")
          .attr("x1", me.x)
          .attr("x2", entries[k].x)
          .attr("y1", me.y)
          .attr("y2", entries[k].y)
          .attr("stroke", "black")
          .attr("stroke-width", ".5");
      }
    }
  }

  //draw circles
  let verts = graph.selectAll("g").data(entries);

  let vert = verts.enter();
  let grp = vert
    .append("g")
    .attr("id", function (entry) {
      return entry.depart + " " + entry.id;
    })
    .on("click", function (entry) {
      return selectCircle(entry);
    });
  grp
    .append("circle")
    .attr("cx", function (entry) {
      return entry.x;
    })
    .attr("cy", function (entry) {
      return entry.y;
    })
    .attr("r", function (entry) {
      return getSize(entry);
    })
    .attr("fill", function (entry) {
      return getColor(entry);
    });
  grp
    .append("text")
    .attr("x", function (entry) {
      return entry.x - getSize(entry);
    })
    .attr("y", function (entry) {
      return entry.y;
    })
    .attr("style", "font-size: 8px")
    .attr("textLEngth", "20px")
    .text(function (entry) {
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
    let x1 = 30;
    let x2 = 30;
    let x3 = 30;
    let x4 = 30;
    let x5 = 30;
    let x6 = 30;
    let x7 = 30;
    for (let i = 0; i < this.props.crs.length; i++) {
      let entry = {};
      console.log(this.props.crs);
      entry.depart = this.props.crs[i].depart;
      entry.id = this.props.crs[i].cid;
      entry.name = this.props.crs[i].name;
      entry.desc = this.props.crs[i].desc;
      entry.cred = this.props.crs[i].cred;
      entry.pre = this.props.crs[i].pre;
      entry.info = this.props.crs[i].depart + " " + this.props.crs[i].cid;

      if (this.props.crs[i].cid < 200) {
        entry.y = 50;
        entry.x = x1;
        x1 = x1 + 100;
      } else if (this.props.crs[i].cid < 300) {
        entry.y = 75;
        entry.x = x2;
        x2 = x2 + 75;
      } else if (this.props.crs[i].cid > 700) {
        entry.y = 950;
        entry.x = x3;
        x3 = x3 + 100;
      } else {
        let cat = (this.props.crs[i].cid / 100);
        if (cat < 4) {
          entry.y = Math.floor(Math.random() * 100 + 100);
          entry.x = x4;
          x4 = x4 + 30;
        } else if (cat < 5) {
          entry.y = Math.floor(Math.random() * 300 + 200);
          entry.x = x5;
          x5 = x5 + 12;
        } else if (cat < 6) {
          entry.y = Math.floor(Math.random() * 300 + 500);
          entry.x = x6;
          x6 = x6 + 12;
        } else {
          entry.y = Math.floor(Math.random() * 150 + 800);
          entry.x = x7;
          x7 = x7 + 20;
        }
      }

      entry.selected = false;
      entry.highlighted = false;
      if (names.includes(entry.depart + " " + entry.id) === false) {
        entries.push(entry);
        names.push(entry.depart + " " + entry.id);
      }
    }

    this.img = d3.select(this.refs.vis).attr("viewBox", "0 0 1000 1000");
    start(this.img);
    draw();
  }

  render() {
    return <svg ref="vis" className="Graph" />;
  }
}

export default Graph;
