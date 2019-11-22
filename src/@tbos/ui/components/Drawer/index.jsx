import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import MailIcon from "@material-ui/icons/Mail";

import TabletMac from "@material-ui/icons/TabletMac";
import LocationCity from "@material-ui/icons/LocationCity";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Camera from "@material-ui/icons/Camera";
import MoveToInbox from "@material-ui/icons/MoveToInbox";
import Payment from "@material-ui/icons/Payment";
import Exit from "@material-ui/icons/ExitToApp";
import Visibility from "@material-ui/icons/Visibility";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Settings from "@material-ui/icons/Settings";

import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const iconMap = {
  TabletMac: TabletMac,
  LocationCity: LocationCity,
  AccountBalance: AccountBalance,
  MoveToInbox: MoveToInbox,
  Payment: Payment,
  AttachMoney: AttachMoney,
  Settings: Settings,
  Visibility: Visibility,
  Camera: Camera
};

export default function CustomDrawer(props) {
  const classes = useStyles();
  const [openId, setOpenId] = React.useState(-1);

  function onOpen(e) {
    var id = e.currentTarget.dataset.id;
    if (openId == id) setOpenId(-1);
    else setOpenId(id);
  }

  function onClose() {
    setOpenId();
  }

  return (
    <Drawer
      className={classes.drawer}
      variant={props.open ? "permanent" : "temporary"}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />

      <List
        subheader={
          <ListSubheader
            inset={false}
            classes={{ root: classes.subheader }}
            component="div"
          >
            {props.user ? props.user.name : ""}
          </ListSubheader>
        }
        className={classes.list}
      >
        {Object.keys(props.menu).map(menuKey => {
          const menuValue = props.menu[menuKey];

          const Wrapper = typeof menuValue == "string" ? Link : React.Fragment;
          const subKeys =
            typeof menuValue != "string" ? Object.keys(menuValue) : [];

          return (
            <Fragment key={menuKey}>
              <ListItem
                data-id={menuKey}
                onClick={onOpen}
                className={classes.item}
                key={menuKey}
                button
              >
                <Wrapper to={"/" + menuKey}>
                  <ListItemText
                    className={classes.text}
                    primary={menuKey}
                    classes={{ primary: classes.text }}
                  />

                  {subKeys.length > 0 ? (
                    <div>
                      {openId == menuKey ? (
                        <ExpandLess onClick={onClose} />
                      ) : (
                        <ExpandMore data-id={menuKey} />
                      )}
                    </div>
                  ) : null}
                </Wrapper>
              </ListItem>

              <Collapse in={openId == menuKey} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {subKeys.map(subKey => {
                    return (
                      <ListItem
                        key={menuKey + subKey}
                        onClick={props.onClose}
                        button
                        className={classes.nested}
                      >
                        <Link to={"/" + subKey}>
                          <ListItemText
                            className={classes.text}
                            primary={subKey}
                            inset
                            classes={{ primary: classes.text }}
                          />
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </Fragment>
          );
        })}
        <ListItem onClick={props.onClose} className={classes.item} button>
          <ListItemIcon>
            <Exit />
          </ListItemIcon>
          <ListItemText
            className={classes.text}
            primary={"Salir"}
            classes={{ primary: classes.text }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}
