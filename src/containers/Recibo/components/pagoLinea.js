import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";
import useQuery from "business/hooks/useQuery";

export default function PagoLinea(props) {
  const classes = useStyles();

  const [clienteId, setClienteId] = React.useState(null);
  const [saldosMap, setSaldosMap] = React.useState({});
  const { fetch: fetchSaldos, data: saldos } = useQuery({ path: `crm/saldo/get`, limit: 1000 });

  React.useEffect(() => {
    var saldosMap = {};
    saldos.forEach(saldo => {
      saldosMap[saldo.id] = saldo;
    });
    setSaldosMap(saldosMap);
  }, [saldos]);

  React.useEffect(() => {
    if (clienteId && props.values.clienteId && props.values.clienteId.value != clienteId)
      return alert("no se puede cambiar el cliente");
    if (!clienteId && props.values.clienteId) {
      setClienteId(props.values.clienteId.value);
      fetchSaldos({
        limit: 1000,
        filters: [["total", "!=", 0], ["clienteId", "=", props.values.clienteId.value]]
      });
      var saldoMap = {};
      props.values.lineaPagoDocumento.value.map(linea => {
        saldoMap[linea._saldoId] = linea;
      });
      setSaldosMap(saldosMap);
    }
  }, [props.values]);

  function onChangeRow(row) {
    return e => {
      var pago = parseFloat(e.target.value);
      if (e.target.value == "") pago = 0;
      var monto = 0;
      var lineaPagoDocumento = {
        value: [
          ...props.values.lineaPagoDocumento.value.filter(line => line._saldoId != row.id),
          {
            documentoId: row.documentoId,
            tipoDocumento: row.tipoDocumento,
            id: row.id,
            _saldoId: row.id,
            monto: pago
          }
        ]
      };

      lineaPagoDocumento.value.forEach(linea => {
        monto = parseInt(parseInt(monto * 10000) + parseInt(parseFloat(linea.monto) * 10000)) / 10000;
      });
      props.onChange({
        ...props.values,
        monto: { value: monto },
        lineaPagoDocumento: lineaPagoDocumento
      });
    };
  }

  const handleFocus = event => event.target.select();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Consecutivo</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Saldo</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Plazo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saldos.map(row => {
              var linea = props.values.lineaPagoDocumento.value.filter(linea => linea._saldoId == row.id)[0];
              var monto = linea ? linea.monto : 0;

              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.consecutivo}
                  </TableCell>
                  <TableCell align="right">{row.totalComprobante}</TableCell>
                  <TableCell align="right">
                    <TextField
                      onFocus={handleFocus}
                      className={classes.formControl}
                      value={monto}
                      onChange={onChangeRow(row)}
                      autoFocus
                      dense
                      InputProps={{
                        inputComponent: NumberFormatCustom
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">{row.tipo}</TableCell>
                  <TableCell align="right">{row.plazoVencido}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      prefix="c/"
    />
  );
}

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
