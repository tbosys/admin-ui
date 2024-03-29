import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Form from "@tbos/ui/components/Form";
import useMutation from "@tbos/ui/business/hooks/useMutation";
import useFetch from "@tbos/ui/business/hooks/useFetch";
import Error from "@tbos/ui/components/Error";
//import I18N from "i18n";

export default function EditForm(props) {
  //
  //State
  const [values, setValues] = React.useState({});
  //
  //

  //
  //Data API
  const { mutate, response, loading, error } = useMutation({
    path: `crm/${props.schema.key}/update`,
    transformValue: true
  });

  const { fetch, data, loading: loadingId, error: errorId } = useFetch({
    path: `crm/${props.schema.key}/get`
  });
  //
  //

  //
  //Effects
  React.useEffect(() => {
    fetch({ filters: [["id", "=", props.id]] });
  }, []);

  React.useEffect(() => {
    if (!data.edges) return;
    var newValues = values;
    var dataValues = data.edges[0];
    if (!dataValues) return alert("object not found"); //TODO

    Object.keys(dataValues).forEach(key => {
      newValues[key] = { value: dataValues[key] };
      if (dataValues["__" + key])
        newValues[key].metadata = {
          [props.schema.properties[key].nameField]: dataValues["__" + key]
        };
    });
    setValues(newValues);
  }, [data]);
  //
  //

  //
  //Side Effects
  function onSave() {
    var body = { id: props.id };

    Object.keys(values).forEach(key => {
      var column = props.schema.properties[key];
      var value = values[key].value;
      if (key == "updatedAt" || value != data.edges[0][key]) {
        if (column) body[column.keyAlias || column.key] = value;
        else body[key] = value;
      }
    });
    mutate(body, true).then(responseData => props.handleClose(responseData));
  }

  function onChange(data) {
    return data;
  }
  //
  //

  //
  //Render

  return (
    <Fragment>
      <Error error={error} />
      <Form
        id={props.id}
        loading={loading}
        error={error}
        fullScreen={true}
        onChange={onChange}
        onSave={onSave}
        values={values}
        setValues={setValues}
        handleClose={props.handleClose}
        isCreate={false}
        schema={props.schema}
      />
    </Fragment>
  );
}
//
//

//
//Styles
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
//
//
