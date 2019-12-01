import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import AddCircleIcon from "@material-ui/icons/AddCircleOutline";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    width: 30,
    height: 27,
    paddingTop: 5
  },
  iconAdd: {
    marginRight: 5
  }
}));

export default function FilterModal(props) {
  const classes = useStyles();
  const [filterMenu, setFilterMenu] = React.useState(null);

  //Filters are centralized at this level, but they also are shared with the parent

  const [showFilterDialog, setShowFilterDialog] = React.useState(false);

  const handleFilterIconClick = event => {
    setFilterMenu(event.currentTarget);
  };

  const handleFilterMenuClose = event => {
    setFilterMenu(null);
  };

  function onCreate() {
    setShowFilterDialog(true);
  }

  function onSave(name) {
    setShowFilterDialog(false);
    props.onSave(name);
  }

  function onClose() {
    setShowFilterDialog(false);
  }

  function onAll() {}

  function onSelectView(e) {
    var filter = data.filter(item => {
      return e.currentTarget.dataset.value == item.name;
    })[0];

    if (!filter) return;
    var filters = JSON.parse(filter.filters);
    var columns = JSON.parse(filter.columns);

    var newFilters = filters.map(filter => {
      return {
        key: filter[0].split(".").reverse()[0],
        operation: filter[1],
        value: filter[2]
      };
    });

    props.onFilter({
      filters: newFilters,
      columns: columns,
      filterName: filter.name
    });
  }

  return (
    <div className={classes.root}>
      <Button
        color="inherit"
        aria-haspopup="true"
        onClick={handleFilterIconClick}
      >
        <span className={classes.language}>
          <props.icon className={classes.icon} />
        </span>
        <ExpandMoreIcon fontSize="small" />
      </Button>

      <Menu
        id="language-menu"
        anchorEl={filterMenu}
        open={Boolean(filterMenu)}
        onClose={handleFilterMenuClose}
      >
        {props.data.map(filter => (
          <MenuItem
            component="a"
            data-no-link="true"
            key={filter.name}
            value={filter.name}
            data-value={filter.name}
            selected={false}
            onClick={onSelectView}
          >
            {filter.name}
          </MenuItem>
        ))}

        <Box my={1}>
          <Divider />
        </Box>
        {props.enableAllFilter ? (
          <MenuItem
            component="a"
            data-no-link="true"
            rel="noopener nofollow"
            target="_blank"
            key={"o"}
            onClick={onAll}
          >
            <AllInclusiveIcon fontSize="small" />
          </MenuItem>
        ) : null}

        <MenuItem
          component="a"
          data-no-link="true"
          rel="noopener nofollow"
          target="_blank"
          key={"o"}
          onClick={onCreate}
        >
          <AddCircleIcon className={classes.iconAdd} /> _______
        </MenuItem>
      </Menu>
    </div>
  );
}
