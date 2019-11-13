import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Autocomplete from "components/Autocomplete/list";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DenseTable(props) {
  const classes = useStyles();

  const [showProductos, setShowProductos] = React.useState(false);

  function onNew() {
    if (!props.values.clienteId) return alert("Escoja primero un cliente");
    setShowProductos(true);
  }

  function changeAutocompleteField(producto) {
    var ordenLinea = props.values.ordenLinea || [];
    props.onChange({
      ...props.values,
      ordenLinea: [...ordenLinea, createData(producto.name, 159, 6.0, 24, 4.0)]
    });
  }

  return (
    <div className={classes.root}>
      {showProductos ? (
        <Autocomplete
          onSelect={changeAutocompleteField}
          column={{ key: "producto", nameField: "name", path: "crm/producto" }}
        />
      ) : null}
      <Paper className={classes.paper}>
        <Button variant="contained" onClick={onNew}>
          Nuevo
        </Button>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(props.values.ordenLinea || []).map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
