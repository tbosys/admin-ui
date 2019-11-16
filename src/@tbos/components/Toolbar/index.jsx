import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import CircularProgress from "@material-ui/core/CircularProgress";
import Badge from "@material-ui/core/Badge";

import Create from "./components/Create";
import Edit from "./components/Edit";
import Table from "./components/Table";

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
  },
  progress: {
    marginRight: 9,
    width: "25px !important",
    height: "25px !important"
  }
}));

export default function PrimarySearchAppBar(props) {
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

  return (
    <div style={{ marginTop: 0, borderBottom: "1px solid #ddd" }} className={classes.grow}>
      <AppBar color="default" elevation={0} position="static">
        <Toolbar>
          {props.loading ? <CircularProgress className={classes.progress} /> : null}

          <StyledBadge max={999} style={{}} badgeContent={props.rowCount || ""} color="secondary">
            <Typography className={classes.title} variant="h6" noWrap>
              {props.title}
            </Typography>
          </StyledBadge>

          <div className={classes.grow} />

          {props.isCreate ? <Create {...props} /> : null}
          {props.isEdit ? <Edit {...props} /> : null}
          {props.isTable ? <Table {...props} /> : null}
          {props.actions}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const StyledBadge = withStyles(theme => ({
  badge: {
    top: "50%",
    right: -13,
    // The border color match the background color.
    border: `2px solid ${theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[900]}`
  }
}))(Badge);
