import React from "react";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

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

import Close from "@material-ui/icons/Close";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import { onLoadMetaData, selectMetadataByType } from "redux/reducers/metadata";

import { connect } from "react-redux";

import BaseElement from "components/SmartForm/elements/base";
import Integer from "components/SmartForm/elements/integer";
import String from "components/SmartForm/elements/string";
import Number from "components/SmartForm/elements/number";
import Monto from "./monto";
import Lookup from "components/SmartForm/elements/lookup";
import Select from "components/SmartForm/elements/select";
import Date from "components/SmartForm/elements/date";
import Autocomplete from "components/SmartForm/elements/autocomplete";
import { simpleApi, selectApiResponseByFormId } from "redux/reducers/api";
import { Grid } from "@material-ui/core";

import numeral from "numeral";

import {
  onCreateForm,
  onFieldChange,
  onArrayFieldChange,
  onUpdateField,
  onUpdateItem,
  selectFormById
} from "redux/reducers/form";

const typeMap = {
  monto: Monto,
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
    minHeight: "300px"
  },
  listContainerRoot: {
    position: "relative"
  },
  listRoot: {
    maxHeight: "100%",
    overflow: "scroll"
  },
  listItem: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px"
  },
  listItemText: {
    textTransform: "capitalize",
    fontSize: "12px"
  }
});

const mapStateToProps = (store, props) => {
  return {
    metadata: selectMetadataByType(store, props.column.key)
  };
};

class TableElement extends BaseElement {
  constructor() {
    super();
    this.state = {
      loadingDocumentos: false,
      columns: [],
      items: [],
      loading: true,
      pendientes: [],
      pendientesMap: {}
    };
  }

  componentDidMount() {
    //Comes from link, load metadata
    if (!this.props.metadata) this.props.dispatch(onLoadMetaData(this.props.column.key));
  }

  componentWillReceiveProps(nextProps) {
    var metadata = nextProps.metadata;

    if (!metadata || !metadata.properties) return;
    this.loadColumns(nextProps);
    this.loadPendientes(nextProps);
  }

  loadPendientes(nextProps) {
    var metadata = nextProps.metadata;
    var column = nextProps.column;

    if (!nextProps.item[column.parentKey] || this.state.loadingDocumentos) return;

    this.setState({ loadingDocumentos: true });

    this.props
      .dispatch(simpleApi(column.route, { id: nextProps.item[column.parentKey] }))
      .then(res => {
        var pendientesMap = {};
        res.forEach(pendiente => {
          pendientesMap[pendiente.id] = pendiente;
        });

        this.setState({ pendientes: res, pendientesMap: pendientesMap, loading: false });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  }

  loadColumns(nextProps) {
    var metadata = nextProps.metadata;

    var keys = this.props.column.fields;

    var columns = keys
      .filter(key => {
        if (key == "id") return false;
        return true;
      })
      .map(function(key) {
        if (key.indexOf("__") == 0) key = key.replace("__", "");
        return Object.assign(
          metadata.properties[key],
          { name: metadata.properties[key].title, key: key },
          {}
        );
      });

    this.setState({ columns: columns });
  }

  getValue() {
    let column = this.props.column;
    return this.props.item[column.key] || [];
  }

  onRemove = e => {
    var newValues = this.getValue().filter(item => {
      var idField = this.props.column.idField;
      if (e.currentTarget.dataset.id == item[idField]) return false;
      return true;
    });

    this.props.onChange(this.props.column.key, newValues);
  };

  onInnerFieldChange = (name, value, id) => {
    var newValues = this.getValue().map(item => {
      var idField = this.props.column.idField;
      if (parseInt(id) == item[idField]) {
        item[name] = value;
        return item;
      }
      return item;
    });
    this.props.onChange(this.props.column.key, newValues);
  };

  onPendienteClick = e => {
    var value = e.currentTarget.dataset.id;
    var pendiente = this.state.pendientesMap[value];

    var newValues = this.getValue();
    var exists = false;

    var newValues = this.getValue();

    newValues.forEach(item => {
      if (item[this.props.column.idField] == pendiente.id) exists = true;
    });

    if (exists) return;

    var newValue = { _pendiente: pendiente };
    this.props.column.map.forEach(mapItem => {
      var key = Object.keys(mapItem)[0];
      newValue[key] = pendiente[mapItem[key]];
    });

    newValues.unshift(newValue);

    this.props.onChange(this.props.column.key, newValues);
  };

  renderPendientes() {
    const { classes, column } = this.props;
    if (!this.state.pendientes) return null;

    return this.state.pendientes.map(item => {
      var secondaryName =
        numeral(item[column.valueKey]).format("0,0.00") + " (" + item[column.plazoKey] + " días)";
      var primaryName = (item.tipo || "") + " " + item[column.consecutivoKey].replace("0010000101", "");
      return (
        <ListItem
          onClick={this.onPendienteClick}
          className={classes.listItem}
          key={item.id}
          data-id={item.id}
          button>
          <ListItemText className={classes.listItemText} secondary={secondaryName} primary={primaryName} />
        </ListItem>
      );
    });
  }

  renderEditableField(column, item, index) {
    var BaseElement = typeMap[column.key || column.element || column.subType || column.type];
    if (!BaseElement) BaseElement = typeMap["string"];
    const elementId = Math.random();
    var fieldStatus = this.props.fieldStatus[this.props.column.key]
      ? this.props.fieldStatus[this.props.column.key][index] || {}
      : {};

    return (
      <BaseElement
        id={item[this.props.column.idField]}
        key={column.key}
        dispatch={this.props.dispatch}
        dispatchSimpleApi={this.dispatchSimpleApi}
        elementId={column.key}
        size={12}
        onChange={this.onInnerFieldChange}
        item={item}
        column={column}
        fieldStatus={fieldStatus}
        showCreateModal={this.props.showCreateModal}
      />
    );
  }

  getData() {
    let column = this.props.column;
    let value = this.getValue();
    if (value.length == 0) return [];

    const { classes } = this.props;

    const buttons = [{ color: "danger", icon: Close }].map((prop, key) => {
      return (
        <Fab mini onClick={this.onRemove} color={"primary"} customClass={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Fab>
      );
    });

    var data = value.map((item, index) => {
      var keys = this.props.column.fields;
      var keyArray = keys.map(key => {
        var column = this.props.metadata.properties[key];
        if (this.props.column.editables.indexOf(key) > -1)
          return this.renderEditableField(column, item, index);
        else return item[key];
      });

      keyArray.push(
        <Button
          mini
          data-id={item[this.props.column.idField]}
          onClick={this.onRemove}
          color={"danger"}
          customClass={classes.actionButton}>
          <Close className={classes.icon} />
        </Button>
      );
      return keyArray;
    });

    return data;
  }

  render() {
    if (!this.props.metadata) return null;

    let column = this.props.column;
    let value = this.getValue();
    if (typeof value == "undefined") value = "";
    var size = this.props.size;
    if (column.ui.fullWidth) size = 12;

    const { classes } = this.props;

    return (
      <Grid container className={classes.containerRoot}>
        <Grid item className={classes.listContainerRoot} xs={3}>
          <List className={classes.listRoot} component="nav">
            {this.renderPendientes()}
          </List>
        </Grid>

        <Grid item xs={9}>
          <Table
            tableHead={this.state.columns.map(column => column.title).concat(["Actions"])}
            tableData={this.getData()}
            customCellClasses={[classes.center, classes.right, classes.right]}
            // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
            customClassesForCells={[0, 4, 5]}
            customHeadCellClasses={[classes.center, classes.right, classes.right]}
            // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
            customHeadClassesForCells={[0, 4, 5]}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(TableElement));
