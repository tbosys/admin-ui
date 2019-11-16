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

  React.useEffect(() => {
    setName(props.filterName);
  }, []);

  const handleClose = dontSave => {
    props.onClose(name, dontSave == false ? false : true);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Guardar Filtro</DialogTitle>
        <DialogContent>
          <DialogContentText>Desea guardar los cambios a este filtro?</DialogContentText>
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
            color="primary">
            Filtrar sin Guardar
          </Button>
          <Button onClick={handleClose} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
