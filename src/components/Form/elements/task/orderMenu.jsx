import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Close, DragIndicator, Create, AddBox, ArrowDropDown, Delete, ArrowDropUp } from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function subir() {
    setAnchorEl(null);
    props.move(props.item, -1);
  }

  function borrar() {
    setAnchorEl(null);
    props.borrar(props.item);
  }

  function bajar() {
    setAnchorEl(null);
    props.move(props.item, 1);
  }

  return (
    <div>
      <MoreVertIcon
        style={{ color: "#555" }}
        aria-label="More"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={subir}>
          <ListItemIcon>
            <ArrowDropUp />
          </ListItemIcon>
          <ListItemText primary="Subir" />
        </MenuItem>
        <MenuItem onClick={bajar}>
          <ListItemIcon>
            <ArrowDropDown />
          </ListItemIcon>
          <ListItemText primary="Bajar" />
        </MenuItem>
        <MenuItem onClick={borrar}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Borrar" />
        </MenuItem>
      </Menu>
    </div>
  );
}
