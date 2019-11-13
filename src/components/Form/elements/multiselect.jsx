import React from "react";
import BaseElement from "./base";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import TextField from "@material-ui/core/TextField";

import CustomInput from "components/CustomInput/CustomInput";
import Fab from "@material-ui/core/Fab";
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

// material-ui components

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Menu from "@material-ui/core/Menu";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import AddIcon from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";

import CircularProgress from "@material-ui/core/CircularProgress";

import { onCreateForm } from "redux/reducers/form";

// material-ui icons
import Close from "@material-ui/icons/Close";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Table from "components/Table/Table.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import { Typography } from "../../../../node_modules/@material-ui/core";
import { alert } from "../../../redux/reducers/header";
import { Grid } from "@material-ui/core";
import { Fragment } from "react";

const styles = theme => ({
  ...customSelectStyle,
  ...extendedTablesStyle,
  root: {
    position: "relative",
    width: "100%"
  },
  icon_green: {
    color: "green"
  },
  icon_red: {
    color: "red"
  },
  listRoot: {
    minWidth: "400px",
    maxHeight: "400px",
    minHeight: "400px",
    overFlow: "scroll",
    backgroundColor: theme.palette.background.paper
  },
  listItem: {},
  listItemText: {},
  button: {
    marginLeft: "10px"
  },
  fabButton: {
    position: "absolute",
    right: "10px",
    top: "-70px"
  }
});

class MultiSelectElement extends BaseElement {
  constructor() {
    super();
    this.state = {
      selectedName: null,
      open: false,
      initialSearchText: null,
      loading: false,
      searchTerm: "",
      items: [],
      originalItems: []
    };
  }

  componentDidMount() {
    this.setState({ open: false });
  }

  componentWillReceiveProps(nextProps) {
    //if (nextProps.item !== this.props.item) this.setState({ open: false })
  }

  transformValue(value) {
    return value;
  }

  getValue() {
    let column = this.props.column;

    var value = this.props.item[column.key];
    if (!value || value == "") return [];
    if (Array.isArray(value)) return value;
    value = value.split(",");
    return value;
  }

  isError() {
    let column = this.props.column;
    if (this.props.fieldStatus[column.key] == false) return true;
    return Array.isArray(this.props.fieldStatus[column.key]);
  }

  getIconColor() {
    let column = this.props.column;
    var color = "";
    if (this.props.fieldStatus[column.key] == true) color = "icon_green";
    else if (this.isError()) color = "icon_red";

    return color;
  }

  onOpen = e => {};

  onFastCreate = e => {
    if (!this.props.formId) this.prop.dispatch(alert("No se puede crear desde esta seccion."));
    var formId = this.props.formId + "-" + parseInt(Math.random() * 10000);

    this.props.dispatch(
      onCreateForm({ id: formId, type: this.props.column.metadataType }, { name: this.state.searchTerm })
    );

    this.props.onFastCreate(
      this.props.metadata.namespace,
      this.props.column.metadataType,
      "create",
      formId,
      this.props.column.key
    );
  };

  onTextFieldChange = e => {
    this.setState({
      open: true,
      initialSearchText: e.currentTarget.value
    });
  };

  getIcon() {
    let column = this.props.column;

    if (this.props.fieldStatus[column.key] == true) return Check;
    else if (this.isError()) return ErrorIcon;
    else return ArrowDropDownIcon;
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  onSearchFieldChange = e => {
    var value = e.currentTarget.value;

    var newRows;

    if (!value || value.length == 0) newRows = this.state.originalItems;
    else
      newRows = this.state.items.filter(item => {
        if (item.name.indexOf(value) > -1) return true;
        return false;
      });
    this.setState({ items: newRows });
  };

  onItemClick = e => {
    var name = e.currentTarget.dataset.name;
    var rows = this.getValue();
    if (rows.indexOf(name) == -1) {
      rows.push(name);
      this.onFieldChange({ value: rows.join(","), name: this.props.column.key });
    }
  };

  renderItems() {
    const { classes } = this.props;
    if (!this.state.items) return null;
    return this.state.items.map(item => {
      var primaryName = item[this.props.column.elementOptions.primary || "name"];

      return (
        <ListItem
          onClick={this.onItemClick}
          className={classes.listItem}
          key={item.id}
          data-name={item.name}
          data-name={item[this.props.column.elementOptions.primary]}
          button>
          <ListItemText className={classes.listItemText} primary={primaryName} />
        </ListItem>
      );
    });
  }

  renderLoading() {
    const { classes } = this.props;

    if (!this.state.loading) return null;
    return <CircularProgress className={classes.progress} />;
  }

  onCreateClick = () => {
    this.setState({ open: true });
    if (this.state.originalItems.length > 0) return;

    this.setState({ loading: true });
    this.props
      .dispatchSimpleApi(this.column, this.props.column.route, {})
      .then(res => {
        this.setState({ loading: false });
        var itemMap = {};
        res.forEach(function(item) {
          itemMap[item.id] = item;
        });
        res.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name <= a.name) return -1;
          else return 0;
        });
        this.setState({ originalItems: res, items: res, itemMap: itemMap });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  onRemoveClick = e => {
    var index = e.currentTarget.dataset.id;
    var rows = this.getValue();
    rows.splice(index, 1);
    this.onFieldChange({ value: rows.join(","), name: this.props.column.key });
  };

  getButtons = row => {
    const { classes } = this.props;
    return (
      <Button
        onClick={this.onRemoveClick}
        data-id={row[0]}
        color={"danger"}
        customClass={classes.actionButton}>
        <Close className={classes.icon} />
      </Button>
    );
  };

  renderDialog() {
    const { classes } = this.props;
    return (
      <Dialog
        fullScreen={false}
        keepMounted
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <Typography variant="title">Escoja uno o mas articulos de la lista</Typography>

          <CustomInput
            labelText="Buscar"
            autoFocus={true}
            inputProps={{
              defaultValue: this.state.initialSearchText,
              placeholder: "",
              type: "text",
              autoFocus: true,
              onChange: this.onSearchFieldChange
            }}
            formControlProps={{
              fullWidth: true
            }}
          />

          {this.renderLoading()}
          <List className={classes.listRoot} component="nav">
            {this.renderItems()}
          </List>
        </DialogContent>
      </Dialog>
    );
  }

  renderTable() {
    const { classes } = this.props;
    const getButtons = this.getButtons;
    return (
      <div>
        <Fab onClick={this.onCreateClick} className={classes.fabButton}>
          <AddIcon />
        </Fab>
        <Table
          tableHead={["#", "Name", "Actions"]}
          tableData={this.getValue().map((item, key) => {
            return [key, item].concat([getButtons]);
          })}
          customCellClasses={[classes.center, classes.right, classes.right]}
          // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
          customClassesForCells={[0, 4, 5]}
          customHeadCellClasses={[classes.center, classes.right, classes.right]}
          // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
          customHeadClassesForCells={[0, 4, 5]}
        />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    let column = this.props.column;
    let value = this.getValue();
    if (typeof value == "undefined") value = "";
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;

    var options = column.enum;

    return (
      <div className={classes.root}>
        <Fragment>
          {this.renderTable()}
          {this.renderDialog()}
        </Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(MultiSelectElement);
