import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useDebounce } from "use-debounce";

import Divider from "@material-ui/core/Divider";
import useQuery from "@tbos/ui/business/hooks/useQuery";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

export default function AutocompleteList(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("");

  const [value] = useDebounce(searchTerm, 500);

  const { data: records, fetch: getRecords } = useQuery({
    path: `${props.column.path}/get`,
    limit: 20
  });

  React.useEffect(() => {
    if (!value || value.length == 0) return;
    getRecords({ filters: [[props.column.nameField, "LIKE", value]] });
  }, [value]);

  function onTextChange(e) {
    setSearchTerm(e.currentTarget.value);
  }

  function onSelect(record) {
    return () => {
      props.onSelect(record);
    };
  }

  return (
    <div className={classes.root}>
      <DialogContentText>Busqueda por nombre</DialogContentText>
      <TextField
        value={searchTerm}
        onChange={onTextChange}
        autoFocus
        autoComplete={false}
        margin="dense"
        label="Buscar"
        fullWidth
      />

      <div className={classes.demo}>
        <List dense={true}>
          {records.map(record => {
            return (
              <Fragment key={record.id}>
                <ListItem button onClick={onSelect(record)}>
                  <ListItemText primary={record[props.column.nameField]} />
                </ListItem>
                <Divider />
              </Fragment>
            );
          })}
        </List>
      </div>
    </div>
  );
}
