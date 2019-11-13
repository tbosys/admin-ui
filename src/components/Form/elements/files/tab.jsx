import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%"
  },

  chip: {
    margin: 5
  }
};

class IconTabs extends React.Component {
  state = {
    key: ""
  };

  handleChange = event => {
    this.setState({ key: event.currentTarget.dataset.key });
    this.props.onChange(event.currentTarget.dataset.key, event.currentTarget.dataset.type);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {(this.props.attachments || []).map(file => {
          return (
            <Chip
              color={this.state.key == file.key ? "primary" : "secondary"}
              data-key={file.key}
              key={file.fileName}
              avatar={<Avatar>{file.type}</Avatar>}
              onClick={this.handleChange}
              label={file.fileName.substring(0, 5)}
              data-type={file.type}
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }
}

IconTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconTabs);
