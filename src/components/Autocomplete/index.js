import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "./list";
import Create from "./createCliente";

export default function FormDialog(props) {
  const [view, setView] = React.useState("FIELD");

  React.useEffect(() => {
    if (props.sectionIndex == 0 && props.fieldIndex == 0 && props.isCreate)
      setView("LIST");
  }, []);

  function handleClose() {
    setView("FIELD");
  }

  function onSelect(record) {
    props.onChange(props.column, record);
    setView("FIELD");
  }

  function onSave(data) {
    setView("LIST");
  }

  let value = "";
  if (props.value && props.metadata)
    value = props.metadata[props.column.nameField];

  function renderList() {
    return (
      <Dialog
        open={view == "LIST"}
        maxWidth={"sm"}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.column.title}</DialogTitle>
        <DialogContent>
          <List onSelect={onSelect} column={props.column} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>

          {props.column.key == "clienteId" ? (
            <Button
              onClick={() => {
                setView("CREATE");
              }}
              variant="contained"
              color="primary"
            >
              Crear Nuevo
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    );
  }

  function renderCreate() {
    if (view != "CREATE") return null;
    return (
      <Create
        onCancel={() => setView("LIST")}
        onSave={onSave}
        column={props.column}
      />
    );
  }

  return (
    <div>
      <TextField
        onClick={() => {
          setView("LIST");
        }}
        fullWidth
        value={value}
        label={props.column.title}
      />
      {renderList()}
      {renderCreate()}
    </div>
  );
}
