import React from "react";
import BaseElement from "./base";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import TextField from "@material-ui/core/TextField";

import CustomInput from "components/CustomInput/CustomInput";

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

import Remove from "@material-ui/icons/NotInterested";

import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";

import CircularProgress from "@material-ui/core/CircularProgress";

import { onCreateForm } from "redux/reducers/form";
import { throttle, debounce } from "throttle-debounce";

import InputAdornment from "@material-ui/core/InputAdornment";
import { alert } from "../../../redux/reducers/header";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { showFastCreate } from "redux/reducers/ui/fastCreate";

const styles = theme => ({
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
  listItem: {
    textTransform: "capitalize"
  },
  listItemText: {
    textTransform: "capitalize"
  },
  button: {
    marginLeft: "10px"
  },
  selectFormControlTable: {
    marginTop: -8
  }
});

class AutoCompleteElement extends BaseElement {
  constructor() {
    super();
    this.state = {
      selectedName: null,
      open: false,
      initialSearchText: null,
      loading: false,
      searchTerm: "",
      items: []
    };
    this.dispatchFilterDebounced = debounce(500, this.dispatchFilter);
    this.dispatchFilterThrottled = throttle(500, this.dispatchFilter);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.querying != true &&
      nextProps.item[nextProps.column.key] &&
      !nextProps.item[`__${nextProps.column.key}`]
    ) {
      this.setState({ querying: true });

      nextProps
        .dispatchSimpleApi(
          nextProps.column,
          (nextProps.column.api
            ? nextProps.column.api + "/" + nextProps.column.table
            : nextProps.column.table) + "/query",
          {
            filters: [[`${nextProps.column.table}.id`, "=", nextProps.item[nextProps.column.key]]]
          }
        )
        .then(response => {
          if (response && response.length > 0) this.setState({ selectedName: response[0].name });
        });
    }

    if (nextProps.item !== this.props.item) this.setState({ open: false });
  }

  transformValue(item) {
    return item;
  }

  getValue() {
    let column = this.props.column;
    if (this.state.selectedName) return this.state.selectedName;

    return this.props.item[`__${column.key}`];
  }

  isError() {
    let column = this.props.column;
    if (!this.props.fieldStatus) return false;
    if (this.props.fieldStatus && this.props.fieldStatus[column.key] == false) return true;
    return Array.isArray(this.props.fieldStatus[column.key]);
  }

  getIconColor() {
    let column = this.props.column;
    var color = "";
    if (this.props.fieldStatus && this.props.fieldStatus[column.key] == true) color = "icon_green";
    else if (this.isError()) color = "icon_red";

    return color;
  }

  onOpen = e => {};

  onFastCreate = e => {
    var props = this.props;
    this.setState({ open: false });
    this.props.dispatch(
      showFastCreate(
        {
          parentFormId: this.props.formId,
          metadataType: this.props.column.table,
          assignToType: this.props.column.key,
          operation: "create",

          onCreateComplete: createdObject => {
            if (this.props.isTable) this.props.onChange(this.props.column.key, createdObject.id);
          }
        },
        { name: this.state.searchTerm }
      )
    );
  };

  onTextFieldChange = e => {
    this.setState({
      open: true,
      initialSearchText: e.currentTarget.value
    });
  };

  onRemove = e => {
    this.props.onChange(this.props.column.key, null, {});
    this.setState({ open: false, selectedName: "" });
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

  onItemClick = (e, value, extra) => {
    if (!value) value = e.currentTarget.dataset.id;
    if (this.props.column.type == "integer") value = parseInt(value);
    this.props.onChange(this.props.column.key, value, extra || this.state.itemMap[value]);

    this.setState({ open: false, selectedName: extra ? extra.name : e.currentTarget.dataset.name });
  };

  onSearchFieldChange = e => {
    var searchTerm = e.currentTarget.value;
    if (searchTerm.length == 0) return this.setState({ items: [] });

    this.setState({ loading: true, searchTerm: searchTerm, items: [] });

    this.dispatchFilterDebounced(searchTerm);
  };

  dispatchFilter = searchTerm => {
    var filter = {};

    if (this.props.column.filter) {
      var key = this.props.column.filter;
      if (this.props.item[key]) filter[this.props.column.filter] = this.props.item[key];
    }

    this.props
      .dispatchSimpleApi(this.column, this.props.column.route, { name: searchTerm, ...filter })
      .then(res => {
        this.setState({ loading: false });
        var itemMap = {};
        res.forEach(function(item) {
          itemMap[item.id] = item;
        });
        this.setState({ items: res, itemMap: itemMap });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  renderItems() {
    const { classes } = this.props;
    if (!this.state.items) return null;
    return this.state.items.map(item => {
      var secondaryName = item[this.props.column.elementOptions.secondary] || null;
      var primaryName = item[this.props.column.elementOptions.primary || "name"];

      return (
        <ListItem
          onClick={this.onItemClick}
          className={classes.listItem}
          key={item.id}
          data-id={item.id}
          data-name={item[this.props.column.elementOptions.primary]}
          button>
          <ListItemText className={classes.listItemText} secondary={secondaryName} primary={primaryName} />
        </ListItem>
      );
    });
  }

  renderLoading() {
    const { classes } = this.props;

    if (!this.state.loading && this.state.searchTerm.length > 0 && this.state.items.length == 0) {
      return (
        <div>
          No se encontro información
          <Button onClick={this.onFastCreate} variant="outlined" color="primary" className={classes.button}>
            Lo creamos?
          </Button>
        </div>
      );
    } else if (!this.state.loading) return null;
    return <CircularProgress className={classes.progress} />;
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    let column = this.props.column;
    let value = this.getValue() || "";
    if (typeof value == "undefined") value = "";
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;

    var options = column.enum;
    var fieldStatus = this.props.fieldStatus || {};
    var isTable = this.props.isTable;

    var content = (
      <FormControl
        error={this.isError()}
        fullWidth
        className={isTable ? classes.selectFormControlTable : classes.selectFormControl}>
        <CustomInput
          labelText={isTable ? "" : column.title}
          success={fieldStatus[column.key] == true}
          error={Array.isArray(fieldStatus[column.key])}
          inputProps={{
            name: column.key,
            placeholder: "",
            value: value,

            type: "text",
            onClick: this.onTextFieldChange,
            endAdornment:
              value && !isTable ? (
                <InputAdornment onClick={this.onRemove} position="end">
                  <Remove />
                </InputAdornment>
              ) : null
          }}
          formControlProps={{
            fullWidth: true
          }}
        />

        <Dialog
          fullScreen={false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogContent>
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
      </FormControl>
    );

    if (!isTable) return content;
    else
      return (
        <div>
          <Tooltip placement="right" title={value || ""}>
            {content}
          </Tooltip>
        </div>
      );
  }
}

export default withStyles(styles)(AutoCompleteElement);
