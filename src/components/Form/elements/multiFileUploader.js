import React, { Fragment } from "react";
import BaseElement from "./base";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput";
import withStyles from "@material-ui/core/styles/withStyles";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";
import { simpleApi, selectApiResponseByFormId } from "redux/reducers/api";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton";
import MoreHoriz from "@material-ui/icons/Add";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  chip: {
    margin: theme.spacing
  },
  hidden: {
    visibility: "hidden"
  }
});

class StringElement extends BaseElement {
  state = {
    upload: false
  };

  getValue() {
    let column = this.props.column;
    return this.props.item[column.key] || [];
  }

  handleClickOpen = e => {
    this.setState({ upload: true });
  };

  handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    this.refs.fileInput.click();
  };

  onComplete = key => {
    console.log(key);
  };

  upload = (response, file) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", response.signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) this.onComplete(response.key);
      }
    };
    xhr.send(file);
  };

  handleImageChange = e => {
    const { onComplete, onClose } = this.props;

    e.stopPropagation();
    e.preventDefault();
    this.setState({ loading: true });
    var _this = this;

    let reader = new FileReader();
    let file = e.target.files[0];

    this.props
      .dispatch(
        simpleApi("files/getUploadSignature", {
          fileName: file.name
        })
      )
      .then(res => {
        let value = this.getValue();
        value.push({ key: res.key, type: res.type, prefix: "https://uploads.efactura.io" });
        this.props.onChange(this.props.column.key, value);
        _this.upload(res, file);
      })
      .catch(e => {
        alert("Error cargando archivo");
        console.log(e);
        onClose();
      });
  };

  onClickChip() {}

  handleDelete() {}

  renderDialog() {
    if (!this.state.upload) return null;
    var { avatar, addButtonProps, changeButtonProps, removeButtonProps } = this.props;
    return (
      <div>
        <Dialog
          open={true}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="form-dialog-title">Cargar Archivo</DialogTitle>
          <DialogContent>
            <DialogContentText>Escoja un archivo de su computadora.</DialogContentText>
            <div className="fileinput text-center">
              <input
                type="file"
                onClick={e => e.stopPropagation()}
                onChange={this.handleImageChange}
                ref="fileInput"
              />

              {this.state.loading ? <CircularProgress size={50} /> : null}
              <div>
                {this.state.file === null ? (
                  <Button {...addButtonProps} onClick={this.handleClick}>
                    {avatar ? "Add Photo" : this.props.label || ""}
                  </Button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  render() {
    let { classes, column, size } = this.props;

    let value = this.getValue();
    if (typeof value == "undefined") value = [];
    if (column.ui && column.ui.fullWidth) size = 12;

    return (
      <Fragment>
        {this.renderDialog()}
        <InputLabel>
          {column.title}
          <IconButton onClick={this.handleClick} color="primary" aria-label="Ver detalles">
            <MoreHoriz />
          </IconButton>
        </InputLabel>
        <div>
          {value.length == 0 ? (
            <div>No hay archivos</div>
          ) : (
            value.map(item => {
              var url = item.key;
              if (column.prefix) url = this.props.column.prefix + item.key;

              return (
                <Tooltip title={item.name || item.key}>
                  <Chip
                    label={item.type}
                    onDelete={this.handleDelete}
                    onClick={this.onClickChip}
                    className={classes.chip}
                    color="primary"
                  />
                </Tooltip>
              );
            })
          )}
        </div>

        <div className="hidden">
          <input
            type="file"
            onClick={e => e.stopPropagation()}
            onChange={this.handleImageChange}
            ref="fileInput"
          />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(StringElement);
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
