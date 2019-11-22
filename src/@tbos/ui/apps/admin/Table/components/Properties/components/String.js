import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  label: {
    fontSize: 11,
    marginLeft: 0,
    marginTop: 5
  }
}));

export default function StringType(props) {
  const classes = useStyles();

  React.useEffect(() => {
    if (props.values) props.setState(props.values);
  }, [props.values]);

  function onChange(key, type) {
    return e => {
      var value = e.target.value;
      if (type == "integer") value = parseInt(value);
      if (type == "boolean") value = e.target.checked;
      props.setState({ ...props.state, type: "string", [key]: value });
    };
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <TextField
          onChange={onChange("name")}
          className={classes.textField}
          value={props.state.name}
          label="name"
          margin="normal"
        />
      </div>
      <div>
        <TextField
          onChange={onChange("title")}
          className={classes.textField}
          label="title"
          value={props.state.title}
          margin="normal"
        />
      </div>
      <div>
        <TextField
          onChange={onChange("default", "string")}
          className={classes.textField}
          label="default"
          value={props.state.default}
          margin="normal"
        />
      </div>
      <div>
        <TextField
          onChange={onChange("lenght", "integer")}
          className={classes.textField}
          value={props.state.length}
          label="Length"
          type="number"
          margin="normal"
        />
      </div>
      <div>
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              style={{ marginLeft: 0, marginTop: 7 }}
              classes={{ label: classes.label }}
              value="top"
              control={<Switch color="primary" />}
              label="Sort"
              checked={props.state.sort}
              onChange={onChange("sort", "boolean")}
              labelPlacement="top"
            />
          </FormGroup>
        </FormControl>
      </div>
    </form>
  );
}
