import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#d3d3d3"
    },
    color: "black",
    fontWeight: "bold",
    boxShadow: "0 3px 5px 2px #d3d3d3"
  }
});

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: props.classes
    };
  }

  render() {
    return (
      <div className="button-container">
        <Button
          variant="contained"
          onClick={() => this.props.onCS()}
          className={this.state.classes.button}
        >
          CS
        </Button>
        <Button
          variant="contained"
          onClick={() => this.props.onMTH()}
          className={this.state.classes.button}
        >
          Math
        </Button>
        <br />
        <Button
          variant="contained"
          onClick={() => this.props.onGrad()}
          className={this.state.classes.button}
        >
          {this.props.gradButton}
        </Button>
      </div>
    );
  }
}

Buttons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buttons);
