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
import useFetch from "@tbos/ui/business/hooks/useFetch";

import { useHistory } from "react-router-dom";

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

  const { fetch, data } = useFetch({ path: "crm/metadata/menu" });

  React.useEffect(() => {
    if (data.length == 0 && props.open) fetch();
  }, [props.open]);

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
        {data.map(schema => {
          return (
            <Fragment key={schema.key}>
              <ListItem
                data-program={schema.key}
                className={classes.item}
                key={schema.key}
                button
              >
                <Link to={"/" + schema.key}>
                  <ListItemText
                    className={classes.text}
                    primary={schema.title}
                    secondary={schema.description}
                    classes={{ primary: classes.text }}
                  />
                </Link>
              </ListItem>
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
