import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@tbos/ui/components/Table/ListWrapper";
import ProcessTable from "@tbos/ui/components/Table/ProcessWrapper";

import Create from "@tbos/ui/components/Form/Create";
import Edit from "@tbos/ui/components/Form/Edit";
import useMetadata from "@tbos/ui/business/hooks/useMetadata";
import useAction from "@tbos/ui/business/hooks/useAction";

import { useHistory } from "react-router-dom";

export default function StandardListApp(props) {
  const classes = useStyles();

  //State
  const [viewId, setViewId] = React.useState(null);
  const [metadata, setMetadata] = React.useState(null);
  const [formResponseHistory, setFormResponseHistory] = React.useState([]);
  const [version, setVersion] = React.useState(0);

  const {
    fetch: fetchMetadata,
    metadata: loadedMetadata,
    loading: loading,
    error: error
  } = useMetadata({
    name: props.match.params.name,
    components: props.components
  });

  const {
    action,
    response,
    loading: actionloading,
    error: actionError
  } = useAction({
    name: props.match.params.name
  });

  //We reload metadata when route name is changes and we are using dynamic routes
  React.useEffect(() => {
    if (metadata && !loading) {
      setMetadata(null);
      setViewId(0);
      setFormResponseHistory([]);
      setVersion(0);
      fetchMetadata();
    }
  }, [props.match.params.name]);

  React.useEffect(() => {
    var id = parseInt(props.match.params.id);
    if (id < 0 || id > 0) setViewId(id);
    else setViewId(0);
  }, []);

  //Loop for metadata loading, used to reload from siblings. ( update table when form changes )
  React.useEffect(() => {
    setMetadata(loadedMetadata);
    setVersion(version + 1);
  }, [loadedMetadata]);

  const handleFormClose = response => {
    setViewId(0);
    setVersion(version + 1);
    window.history.pushState(
      {},
      props.match.params.name,
      `/${props.match.params.name}`
    );
    if (response) setFormResponseHistory([...formResponseHistory, response]);
  };

  function onCreate() {
    setViewId(-1);
    window.history.pushState(
      { id: null },
      props.match.params.name,
      `/${props.match.params.name}/-1`
    );
  }

  function onView(id) {
    setViewId(id);
    window.history.pushState(
      { id: id },
      props.match.params.name,
      `/${props.match.params.name}/${id}`
    );
  }

  function onActionClick(actionName, selectedIds) {
    action({
      action: actionName.replace("por ", ""),
      metadata: metadata,
      ids: selectedIds.map(item => item.id)
    })
      .then(response => {
        return setVersion(version + 1);
      })
      .catch(error => {
        alert(error.message);
      });
  }

  //Render

  function renderTable() {
    if (metadata.statusField)
      return (
        <ProcessTable
          version={version}
          statusFieldName={metadata.statusField}
          updateHistory={formResponseHistory}
          enableTabs={true}
          statusList={metadata.properties[metadata.statusField].enum}
          onActionClick={props.onActionClick || onActionClick}
          enableCreate={true}
          columns={metadata.table}
          toggleMenu={props.toggleMenu}
          schema={metadata}
          onView={onView}
          onCreate={onCreate}
        ></ProcessTable>
      );
    else
      return (
        <Table
          version={version}
          onActionClick={props.onActionClick}
          actions={props.actions}
          updateHistory={formResponseHistory}
          enableCreate={props.enableCreate == false ? false : true}
          columns={metadata.table}
          toggleMenu={props.toggleMenu}
          schema={metadata}
          onView={onView}
          onCreate={onCreate}
        ></Table>
      );
  }

  if (loading || !metadata) return "loading";

  return (
    <Fragment>
      {viewId == -1 ? (
        <Create
          form={props.form}
          schema={metadata}
          onView={onView}
          handleClose={handleFormClose}
        />
      ) : null}
      {viewId > 0 ? (
        <Edit
          form={props.form}
          schema={metadata}
          id={viewId}
          onView={onView}
          handleClose={handleFormClose}
        />
      ) : null}
      {viewId == 0 && renderTable()}
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
