import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Form from "@tbos/components/Form";
import useMutation from "@tbos/business/hooks/useMutation";
import Error from "@tbos/components/Error";

export default function Create(props) {
  const [values, setValues] = React.useState({});

  const { mutate, response, loading, error } = useMutation({
    path: `${props.schema.api}/${props.schema.key}/create`,
    transformValue: true
  });

  function onSave() {
    var body = {};

    Object.keys(values).forEach(key => {
      var column = props.schema.properties[key];
      body[column.keyAlias || column.key] = values[key].value;
    });
    mutate(body, true).then(responseData => props.handleClose(responseData));
  }

  function onChange(data) {
    return data;
  }

  return (
    <Fragment>
      <Error error={error} />
      <Form
        loading={loading}
        error={error}
        fullScreen={true}
        onChange={onChange}
        onSave={onSave}
        values={values}
        setValues={setValues}
        handleClose={props.handleClose}
        sections={props.sections}
        isCreate={true}
        schema={props.schema}
      />
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  relative: {
    position: "relative"
  },
  fab: {
    position: "absolute",
    right: 10,
    top: -4
  }
}));
