import React, { Fragment } from "react";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";

import NewIcon from "@material-ui/icons/CreateNewFolder";

import AccountCircle from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";

import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import FilterIcon from "@material-ui/icons/FilterList";
import MenuOpen from "@material-ui/icons/BlurLinear";

import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function TableToolbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function onNew() {
    props.history.push(props.match.path + "new");
  }

  function onEdit() {
    props.history.push(props.match.path + props.selectedRows[0].id);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge style={{ zIndex: 8000 }} badgeContent={4} color="secondary">
            <NewIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge style={{ zIndex: 8000 }} badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <div className={classes.sectionDesktop}>
        <IconButton onClick={onNew} aria-label="show 4 new mails" color="inherit">
          <NewIcon />
        </IconButton>

        <IconButton onClick={props.onShowFilters} aria-label="show 4 new mails" color="inherit">
          <Badge style={{ zIndex: 8000 }} badgeContent={props.filterCount} color="secondary">
            <FilterIcon />
          </Badge>
        </IconButton>

        <IconButton onClick={props.onShowGroups} aria-label="show 4 new mails" color="inherit">
          <Badge style={{ zIndex: 8000 }} badgeContent={props.groupCount} color="secondary">
            <MenuOpen />
          </Badge>
        </IconButton>

        <IconButton onClick={props.onFetchLast} aria-label="show 4 new mails" color="inherit">
          <Badge style={{ zIndex: 8000 }} badgeContent={props.groupCount} color="secondary">
            <ChevronLeft />
          </Badge>
        </IconButton>

        <a>
          {props.pageNumber}-{props.pageCount}
        </a>

        <IconButton onClick={props.onFetchMore} aria-label="show 4 new mails" color="inherit">
          <Badge style={{ zIndex: 8000 }} badgeContent={props.groupCount} color="secondary">
            <ChevronRight />
          </Badge>
        </IconButton>

        {props.selectedRows.length == 1 ? (
          <IconButton onClick={onEdit} aria-label="show 17 new notifications" color="inherit">
            <Badge style={{ zIndex: 8000 }} badgeContent={17} color="secondary">
              <EditIcon />
            </Badge>
          </IconButton>
        ) : null}
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit">
          <MoreIcon />
        </IconButton>
      </div>
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
          onClick: () => child.props.onClick(child.props.name, props.selectedRows)
        });
      })}
    </Fragment>
  );
}

export default withRouter(TableToolbar);
