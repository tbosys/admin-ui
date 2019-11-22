import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FilterSaveDialog(props) {
  const [name, setName] = React.useState("");

  const handleClose = dontSave => {
    props.onClose();
  };

  const onSave = dontSave => {
    props.onSave(name);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Guardar {props.type}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Desea guardar los cambios a este filtro?
          </DialogContentText>
          <TextField
            autoFocus
            value={name}
            onChange={e => {
              setName(e.currentTarget.value);
            }}
            margin="dense"
            id="name"
            label="Nombre del Filtro"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(false);
            }}
            color="primary"
          >
            Cerrar
          </Button>
          <Button onClick={onSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
