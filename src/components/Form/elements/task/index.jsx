import React, { Fragment } from "react";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Divider from "@material-ui/core/Divider";

import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
// material-ui icons
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import { alert } from "redux/reducers/header";
import { Close, DragIndicator, Create, AddBox, ArrowDropDown, Delete, ArrowDropUp } from "@material-ui/icons";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import { onLoadMetaData, selectMetadataByType } from "redux/reducers/metadata";

import { connect } from "react-redux";

import OrderMenu from "./orderMenu";
import CompleteToggle from "./completeToggle";

import BaseElement from "components/SmartForm/elements/base";
import Integer from "components/SmartForm/elements/integer";
import String from "components/SmartForm/elements/string";
import Number from "components/SmartForm/elements/number";
import Lookup from "components/SmartForm/elements/lookup";
import Select from "components/SmartForm/elements/select";
import Date from "components/SmartForm/elements/date";
import Autocomplete from "components/SmartForm/elements/autocomplete";
import { simpleApi, selectApiResponseByFormId } from "redux/reducers/api";
import { Grid, Box } from "@material-ui/core";

import moment from "moment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import numeral from "numeral";
import { queryTasksByType, createTask, deleteTask } from "redux/reducers/ui/task";
import { blue, red } from "@material-ui/core/colors";
import Input from "@material-ui/core/Input";

import Avatar from "@material-ui/core/Avatar";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import EditComponent from "./edit";

const typeMap = {
  string: String,
  number: Number,
  lookup: Lookup,
  select: Select,
  autocomplete: Autocomplete,
  date: Date
};

const styles = theme => ({
  ...extendedTablesStyle,
  containerRoot: {
    position: "relative",
    paddingTop: 25
  },
  listContainerRoot: {},
  listRoot: {},
  listItem: {},
  listItemText: {},
  row: {
    borderBottom: "1px solid rgba(220,220,220,0.8)",
    marginTop: 2
  },
  rowHover: {
    marginLeft: 0,
    paddingLeft: 0,
    cursor: "pointer",
    "& .showOnHover": {
      visibility: "hidden"
    },
    "&:hover .showOnHover": {
      visibility: "visible"
    }
  },
  rowWrapper: {
    paddingTop: 4,
    display: "inline-block"
  },
  sectionRow: {
    borderBottom: "2px solid rgba(33,33,33,0.6)",
    color: "#000",
    fontSize: 14
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  date: {
    color: blue[600],
    fontSize: 12,
    paddingTop: 3
  },
  avatar: {
    backgroundColor: blue[500],
    fontSize: "0.714285714285714rem",
    width: 26,
    height: 26
  },
  button: {
    marginLeft: 5
  }
});

const mapStateToProps = (store, props) => {
  return {
    user: store.user.user,
    tasks: store.task.tasksByTypeAndId[`${props.metadataType}-${props.item.id}`] || []
  };
};

class TableElement extends BaseElement {
  constructor() {
    super();
    this.state = {
      selectedTask: null,
      loadingDocumentos: false,
      columns: [],
      items: [],
      tasks: [],
      loading: true,
      pendientes: [],
      categorias: [],
      pendientesMap: {}
    };
  }

  componentDidMount() {
    //Comes from link, load metadata
    this.props.dispatch(queryTasksByType(this.props.metadataType, this.props.item.id));
  }

  componentWillReceiveProps(nextProps) {
    var tasks = nextProps.tasks;
    if (tasks && tasks.length > 0 && tasks != this.state.tasks.length) {
      this.sortArray(tasks);
      this.setState({ tasks: tasks });
    }
  }

  getItemIndex(item, useProp = false) {
    var foundItem, index;
    var tasks = useProp ? this.props.tasks : this.state.tasks;

    tasks.forEach((loopItem, loopIndex) => {
      if (item.id == loopItem.id) {
        foundItem = loopItem;
        index = loopIndex;
      }
    });

    return { foundItem, index, tasks };
  }

  onSaveTarea = task => {
    if (!task.name || task.name.length < 1)
      return this.props.dispatch(alert("Ingrese su tarea antes de guardarla "));
    task.accountTypeId = `${this.props.metadataType}-${this.props.item.id}`;
    return this.props
      .dispatch(createTask(task))
      .then(e => {
        return this.props.dispatch(alert("Se guardaron los cambios", "success"));
      })
      .catch(e => {
        return this.props.dispatch(alert("No se pudo guardar los cambios a la tarea... intente de nuevo..."));
      });
  };

  onDeleteTarea = task => {
    return this.props
      .dispatch(deleteTask(task, this.props.metadataType, this.props.item.id))
      .then(e => {
        return this.props.dispatch(alert("Se borro la tarea", "info"));
      })
      .catch(e => {
        return this.props.dispatch(alert("No se pudo borrar la tarea... intente de nuevo..."));
      });
  };

  sortArray(tasks) {
    var lastNumber = tasks.length;
    tasks.sort((a, b) => {
      if (a.order == null) a.order = lastNumber && lastNumber--;
      if (b.order == null) b.order = lastNumber && lastNumber--;
      if (a.order > b.order) return 1;
      else if (a.order < b.order) return -1;
      else return 0;
    });
  }

  onChangeProgress = (item, progress) => {
    var { foundItem, index, tasks } = this.getItemIndex(item);
    tasks[index].progress = progress;
    this.onSaveTarea(tasks[index]);
    this.setState({ tasks: tasks.concat([]) });
  };

  onMove = (item, direction) => {
    var { foundItem, index, tasks } = this.getItemIndex(item);
    tasks[index].order += direction;

    if (direction > 0) {
      //move next itiem
      tasks[index + 1].order += direction * -1;
    } else {
      tasks[index - 1].order += direction * -1;
    }

    this.sortArray(tasks);
    this.onSaveTarea(tasks[index]);
    this.setState({ tasks: tasks.concat([]) });
  };

  onCreateSection = () => {
    var tasks = this.state.tasks;
    var task = {
      isSection: true,
      ownerId: this.props.user.id,

      name: "Nueva Sección",
      order: tasks.length
    };
    tasks.push(task);

    this.onSaveTarea(task);
    this.setState({ tasks: tasks.concat([]) });
  };

  onCreateTarea = () => {
    var tasks = this.state.tasks;
    var task = {
      isSection: false,
      ownerId: this.props.user.id,
      fechaVencimiento: "",
      name: "Nueva Tarea",
      order: tasks.length
    };
    tasks.push(task);

    this.setState({ tasks: tasks.concat([]), selectedTask: task });
  };

  onDeleteTask = () => {
    var item = this.state.selectedTask;
    var { foundItem, index, tasks } = this.getItemIndex(item);

    this.onDeleteTarea(tasks[index]);
    tasks.splice(index, 1);
    this.setState({ tasks: tasks.concat([]), selectedTask: null });
  };

  onItemBorrar = item => {
    var { foundItem, index, tasks } = this.getItemIndex(item);

    this.onDeleteTarea(tasks[index]);
    tasks.splice(index, 1);
    this.setState({ tasks: tasks.concat([]), selectedTask: null });
  };

  onChangeInput = item => {
    return e => {
      var { foundItem, index, tasks } = this.getItemIndex(item);
      tasks[index] = { ...tasks[index], name: e.currentTarget.value };
      this.setState({ tasks: tasks.concat([]) });
    };
  };

  onSaveChangedInput = item => {
    return e => {
      var { foundItem } = this.getItemIndex(item, true);
      debugger;
      if (foundItem.name != item.name) this.onSaveTarea(item);
    };
  };

  selectTask = task => {
    return () => {
      this.setState({ selectedTask: task });
    };
  };

  onSaveEditedTask = task => {
    var { foundItem, index, tasks } = this.getItemIndex(task);

    tasks[index] = task;
    this.setState({ tasks: tasks.concat([]), selectedTask: null });
    this.onSaveTarea(task);
  };

  onCancelTask = () => {
    this.setState({ selectedTask: null });
  };

  renderTask(task) {
    const { classes } = this.props;
    return (
      <Fragment>
        <ListItem onClick={this.selectTask(task)} className={classes.rowHover} key={task.id} dense>
          <ListItemIcon>
            <span className="showOnHover">
              <OrderMenu borrar={this.onItemBorrar} item={task} move={this.onMove} />
            </span>
            <CompleteToggle onClick={this.onChangeProgress} item={task} />
          </ListItemIcon>
          <ListItemText style={{ maxWidth: "80%" }} primary={task.order + " " + task.name} />

          <ListItemSecondaryAction>
            <Grid container spacing={1}>
              <Grid item>
                <div className={classes.date}>{moment(task.fechaVencimiento).format("DD MMM")}</div>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  {(task.__ownerId || "")
                    .split(" ")
                    .map(name => name[0])
                    .join("")}
                </Avatar>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </Fragment>
    );
  }

  renderSection(section) {
    const { classes } = this.props;

    return (
      <Fragment>
        <ListItem
          onClick={this.onCancelTask}
          className={classes.rowHover}
          key={section.id}
          role={undefined}
          dense>
          <ListItemIcon>
            <span className="showOnHover">
              <OrderMenu borrar={this.onItemBorrar} item={section} move={this.onMove} />
            </span>
          </ListItemIcon>
          <Input
            onBlur={this.onSaveChangedInput(section)}
            disableUnderline
            onChange={this.onChangeInput(section)}
            value={section.order + " " + section.name}
            fullWidth
          />
          <Divider />
        </ListItem>
        <Divider variant="inset" component="li" />
      </Fragment>
    );
  }

  renderHeader() {
    const { classes } = this.props;

    return (
      <div style={{ position: "absolute", top: -17, right: 10, width: 300 }}>
        <Grid direction="row" justify="flex-end" spacing={2} className={classes.rowHeader} container>
          <Grid item>
            <Button
              style={{ marginRight: 10 }}
              small
              onClick={this.onCreateSection}
              variant="outlined"
              color="primary"
              className={classes.button}>
              Sección
              <AddBox className={classes.rightIcon} />
            </Button>

            <Button
              onClick={this.onCreateTarea}
              small
              variant="outlined"
              color="primary"
              className={classes.button}>
              Tarea
              <AddBox className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    let column = this.props.column;

    const { classes } = this.props;

    return (
      <div className={classes.containerRoot}>
        {this.renderHeader()}
        <Grid spacing={4} container>
          <Grid item xs={this.state.selectedTask ? 7 : 12}>
            <List className={classes.root}>
              {this.state.tasks.map(task => {
                if (task.isSection) return this.renderSection(task);
                return this.renderTask(task);
              })}
            </List>
          </Grid>
          {this.state.selectedTask ? (
            <Grid item xs={5}>
              <Box borderLeft>
                <EditComponent
                  hideEisenhower={true}
                  task={this.state.selectedTask}
                  onSave={this.onSaveEditedTask}
                  onDelete={this.onDeleteTask}
                  onCancel={this.onCancelTask}
                  user={this.props.user}
                />
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(TableElement));
