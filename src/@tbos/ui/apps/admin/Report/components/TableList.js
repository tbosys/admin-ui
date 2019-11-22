import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import useFetch from "@tbos/ui/business/hooks/useFetch";
import { CircularProgress } from "@material-ui/core";

export default function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;

  const { data: tables, fetch: fetchTables, loading } = useFetch({
    path: "report/tables"
  });

  React.useEffect(() => {
    fetchTables();
  }, [props.values]);

  function handleListItemClick(table) {
    return () => {
      props.onChange(table);
    };
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={props.open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Table</DialogTitle>
      <DialogContent dividers>
        <List component="nav" aria-label="main mailbox folders">
          {(tables || []).map(table => {
            return (
              <ListItem button onClick={handleListItemClick(table)}>
                <ListItemText primary={table} />
              </ListItem>
            );
          })}
        </List>
        {loading && <CircularProgress />}
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: "80%",
    maxHeight: 435
  }
}));
