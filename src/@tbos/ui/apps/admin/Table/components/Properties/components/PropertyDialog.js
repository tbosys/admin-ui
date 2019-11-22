import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import TypeSelector from "./PropertySelector";
import TypeEditor from "./PropertyEditor";

export default function AddPropertyDialog(props) {
  React.useEffect(() => {}, []);

  return (
    <div>
      <Dialog
        open={true}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Property</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ textTransform: "capitalize" }}
          ></DialogContentText>
          {props.item ? (
            <TypeEditor {...props} />
          ) : (
            <TypeSelector createColumn={props.createColumn} />
          )}
        </DialogContent>
        <DialogActions style={{ marginTop: 20 }}>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={props.onSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
