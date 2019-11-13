import React, { Fragment } from "react";
import PropTypes, { nominalTypeHack } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Paper, InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { alert } from "redux/reducers/header";
import StarIcon from "@material-ui/icons/Star";
import Launch from "@material-ui/icons/Launch";
import { IconButton } from "@material-ui/core";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import amber from "@material-ui/core/colors/amber";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import AutoComplete from "components/Autocomplete";

import { deepPurple } from "@material-ui/core/colors";
import Slider from "@material-ui/lab/Slider";

import { Divider, Link } from "@material-ui/core";
import Warning from "@material-ui/icons/Warning";
import AttachFile from "@material-ui/icons/AttachFile";

import FileUpload from "components/SmartUploadField";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

import Chip from "@material-ui/core/Chip";
import CompleteToggle from "./completeToggle";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = theme => ({});

class TableElement extends React.Component {
  constructor() {
    super();
    this.state = {
      task: {
        ownerId: "",

        attachment: "",
        name: "",
        progress: 0,
        urgent: false,
        seccion: "",
        fechaVencimiento: ""
      }
    };
  }

  clearTask(task) {
    this.setState({
      task: task || {
        ownerId: this.props.user.id,

        attachment: "",
        name: "",
        progress: 0,
        urgent: false,
        seccion: "",
        fechaVencimiento: ""
      }
    });
  }

  componentDidMount() {
    this.clearTask(this.props.task);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task && this.state.task.taskId && nextProps !== this.state.task)
      this.clearTask(nextProps.task);
  }

  handleChange = name => event => {
    this.setState({ task: { ...this.state.task, [name]: event.target.value } });
  };

  handleBoolean = name => event => {
    this.setState({ task: { ...this.state.task, [name]: event.target.checked } });
  };

  onChangeOwner = (key, value, extra) => {
    this.setState({
      task: { ...this.state.task, ownerId: value, __ownerId: extra.name, __ownerId: extra.name }
    });
  };

  onEdit = item => {
    return () => {
      if (item.ownerId != this.props.user.id && item.createdById != this.props.user.id)
        return this.props.dispatch(alert("Solo puede editar tareas propias.", "warning"));

      this.setState({ task: item, creating: true });
    };
  };

  onChangeProgress = (item, progress) => {
    var task = { ...this.state.task, progress: progress };
    this.setState({ task: task });
  };

  handleProgressChange = () => {
    return (event, value) => {
      var task = { ...this.state.task, progress: value };
      this.setState({ task: task });
    };
  };

  handleComplete = (fileKey, path, fullPath) => {
    this.setState({
      task: { ...this.state.task, attachment: fullPath }
    });
  };

  valuetext(value) {
    return `${value}°C`;
  }

  onSaveTarea = () => {
    this.props.onSave(this.state.task);
  };

  renderEisenHower() {
    const { classes } = this.props;

    if (this.props.hideEisenhower) return null;
    return (
      <div style={{ marginLeft: 10 }}>
        <Grid container>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  labelPlacement="start"
                  checked={this.state.task.important}
                  onChange={this.handleBoolean("important")}
                  value="important"
                  color="primary"
                />
              }
              label="Importante"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  labelPlacement="start"
                  checked={this.state.task.urgent}
                  onChange={this.handleBoolean("urgent")}
                  value="urgent"
                  color="primary"
                />
              }
              label="Urgente"
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  renderCreate() {
    const { classes } = this.props;
    var task = this.state.task;

    return (
      <div>
        <Paper elevation={1}>
          <div style={{ padding: 15 }}>
            <Grid container justify="flex-end">
              <Button
                onClick={() => {
                  this.onChangeProgress(this.props.task, this.props.task.progress == 100 ? 0 : 100);
                }}
                variant={this.state.task.progress == 100 ? "contained" : "outlined"}
                color="primary">
                Completo
              </Button>
            </Grid>
            <TextField
              label="Titulo"
              style={{ marginBottom: 15 }}
              placeHolder="Crear Tarea"
              className={classes.textField}
              value={this.state.task.name}
              onClick={this.onClick}
              autoFocus
              inputStyle={{
                fontSize: 11
              }}
              fullWidth
              onChange={this.handleChange("name")}
            />

            <Grid container spacing={3}>
              <Grid xs={6} item>
                <AutoComplete
                  onChange={this.onChangeOwner}
                  className={classes.textField}
                  item={{ ...this.state.task, __ownerId: this.state.task.ownerName }}
                  column={{
                    title: "Propietario",
                    key: "ownerId",
                    type: "integer",
                    table: "owner",
                    filterable: true,
                    sortable: true,
                    route: "owner/findLikeName",
                    metadataType: "owner",
                    element: "autocomplete",
                    elementOptions: {
                      primary: "name"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  style={{ marginTop: 12 }}
                  label="Vencimiento"
                  className={classes.textField}
                  value={this.state.task.fechaVencimiento}
                  type="date"
                  onChange={this.handleChange("fechaVencimiento")}
                />
              </Grid>
            </Grid>

            <TextField
              placeHolder="Descripcion"
              className={classes.textField}
              value={this.state.task.description}
              variant="outlined"
              onClick={this.onClick}
              inputStyle={{
                fontSize: 11
              }}
              rows={3}
              multiline
              maxRows={4}
              rowsMax={4}
              label="Descripcion"
              fullWidth
              onChange={this.handleChange("description")}
            />

            <div style={{ marginLeft: 8, paddingRight: 20 }}>
              <FileUpload
                metadata={this.state.task}
                fileKey="attachment"
                route={"files/upload"}
                onComplete={this.handleComplete}
                onClose={this.handleClose}
                label={"Archivo Adjunto"}
              />
            </div>

            <div style={{ paddingTop: 10, paddingBottom: 5, paddingLeft: 1, paddingRight: 1 }}>
              <TextField
                label="Comentarios"
                multiline
                variant="outlined"
                maxRows={6}
                rows={6}
                fullWidth
                className={classes.textField}
                value={this.state.task.comentarios}
                type="date"
                onChange={this.handleChange("comentarios")}
              />
            </div>
            <Grid container justify="space-between" style={{ marginTop: 20 }}>
              <Button
                style={{ marginRight: 10 }}
                variant="outlined"
                color="default"
                onClick={this.props.onCancel}
                className={classes.button}>
                Cancelar
              </Button>
              <Button
                style={{ marginRight: 10 }}
                variant="outlined"
                color="default"
                onClick={this.props.onDelete}
                className={classes.button}>
                Borrar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSaveTarea}
                className={classes.button}>
                Guardar
              </Button>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }

  render() {
    let column = this.props.column;

    const { classes } = this.props;
    return this.renderCreate();
  }
}

export default withStyles(styles, { withTheme: true })(TableElement);
