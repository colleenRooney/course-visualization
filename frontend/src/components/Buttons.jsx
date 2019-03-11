import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#383838",
    "&:hover": {
      backgroundColor: "black"
    },
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 3px 5px 2px #cccc99"
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
      <div>
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
