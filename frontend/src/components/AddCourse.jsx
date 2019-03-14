import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#efefef"
    },
    color: "black",
    fontWeight: "bold",
    boxShadow: "0 3px 5px 2px #efe4ce"
  }
});

class AddCourse extends Component {
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
          onClick={() => this.props.onAdd()}
          className={this.state.classes.button}
        >
          {this.props.text}
        </Button>
        <Button
          variant="contained"
          onClick={() => this.props.onClear()}
          className={this.state.classes.button}
        >
          Clear Courses
        </Button>
      </div>
    );
  }
}

AddCourse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddCourse);
