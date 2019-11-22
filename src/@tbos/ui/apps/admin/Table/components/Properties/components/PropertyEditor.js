import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import IntegerType from "./Integer";
import StringType from "./String";

var map = {
  integer: IntegerType,
  string: StringType
};

export default function AddPropertyDialog(props) {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    setState(props.item);
  }, []);

  function onChangeState(delta) {
    if (delta.name != state.name && typeof delta.id != "string") return;

    setState(delta);
  }

  function onSave() {
    function isNull(value, type = "string") {
      if (type == "string" && (value == "" || !value)) return true;
      if (type == "boolean" && value == null) return true;
      if (type == "integer" && value == null) return true;
      return false;
    }

    if (
      isNull(state.name) ||
      isNull(state.title) ||
      isNull(state.length, "integer") ||
      isNull(state.sort, "boolean")
    )
      return alert("All fields must be complete");
    props.onSave(state);
  }

  const Type = map[props.item.type] || null;
  return (
    <div>
      <Dialog
        open={Type}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Property</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textTransform: "capitalize" }}>
            {props.item.type}
          </DialogContentText>
          <Type state={state} setState={onChangeState} />
        </DialogContent>
        <DialogActions style={{ marginTop: 20 }}>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={onSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
