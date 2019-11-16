import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMutation from "@tbos/business/hooks/useMutation";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

export default function CreateClienteDialog(props) {
  const classes = useStyles();
  const [cedula, setCedula] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { mutate, response, loading, error } = useMutation({
    path: "crm/cliente/create"
  });

  React.useEffect(() => {
    if (response.id) props.onSave();
  }, [response]);

  function onChange(key) {
    return e => {
      if (key == "cedula") return setCedula(e.target.value);
      if (key == "nombre") return setNombre(e.target.value);
      if (key == "email") return setEmail(e.target.value);
    };
  }

  function onSave() {
    mutate({
      cedula,
      name: nombre,
      correoDocumentosElectronicos: email,
      activo: true
    });
  }

  function renderError() {
    if (!error) return;
    return (
      <Box p={2} m={2} shadow={1} bgcolor="error.main">
        {error}
      </Box>
    );
  }

  function renderLoading() {
    if (!loading) return;
    return <div>Loading</div>;
  }

  function renderForm() {
    if (loading) return;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Nombre"
          className={classes.textField}
          value={nombre}
          onChange={onChange("nombre")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Cedula"
          className={classes.textField}
          value={cedula}
          onChange={onChange("cedula")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          className={classes.textField}
          value={email}
          onChange={onChange("email")}
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  }

  return (
    <Dialog
      open={true}
      maxWidth={"md"}
      fullWidth={true}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.column.title}</DialogTitle>
      <DialogContent>
        {renderError()}
        {renderForm()}
        {renderLoading()}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
