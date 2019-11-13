import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "components/Table";

import useProcessQuery from "business/hooks/useProcessQuery";
import useFetch from "business/hooks/useFetch";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const ROW_SIZE = 25;

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  relative: {},
  fab: {}
}));

export default function StandardApp(props) {
  const classes = useStyles();
  const statusFieldName = props.statusFieldName || "status";
  //State

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [countPerState, setCountPerState] = React.useState({});

  const {
    fetch: fetchData,
    data,
    loading,
    status,
    error,
    fetchMore,
    fetchLess,
    filter,
    totalCount
  } = useProcessQuery({
    path: `${props.schema.api}/${props.schema.key}/get`,
    limit: 25,
    statusField: statusFieldName
  });
  //

  const { fetch: fetchGroup, data: groupData } = useFetch({
    path: `${props.schema.api}/${props.schema.key}/groupBy`
  });

  React.useEffect(() => {
    fetchData({ status: props.statusList[0] });
    fetchGroup({ groupBy: [statusFieldName], count: true, inProgress: true });
  }, []);

  React.useEffect(() => {
    var newState = {};
    groupData.forEach(groupData => {
      newState[groupData[statusFieldName]] = groupData.count;
    });
    setCountPerState(newState);
  }, [groupData]);

  //Effects
  React.useEffect(() => {
    if (!data) return;
    var decimalPageCount = totalCount / ROW_SIZE;
    var parsedPageCount = parseInt(decimalPageCount);
    setPageCount(decimalPageCount == parsedPageCount ? parsedPageCount : parsedPageCount + 1);
  }, [data]);

  function onFetchMore() {
    if (loading) return;
    if (pageNumber >= pageCount) return;
    setPageNumber(pageNumber + 1);
    fetchMore({});
  }

  function onFetchLess() {
    if (loading) return;
    if (pageNumber == 1) return;
    setPageNumber(pageNumber - 1);
    fetchLess(pageNumber - 1);
  }

  function filterWrapper(filters, columns, filterName) {
    filter({ filters, columns, filterName });
  }

  function onSort(column, direction) {
    sort(column, direction);
    setPageNumber(1);
  }

  //Render

  function renderContext() {
    if (props.enableTabs)
      return (
        <Fragment>
          {props.statusList ? (
            <Paper className={classes.ert}>
              <Tabs
                onChange={(e, status) => {
                  filter({ status });
                }}
                value={status}
                indicatorColor="primary"
                textColor="primary"
                centered>
                {props.statusList.map(status => (
                  <Tab value={status} label={`${status} (${countPerState[status] || 0})`} />
                ))}
              </Tabs>
            </Paper>
          ) : null}
          <Box className={classes.relative} m={1} mt={2} mb={2}>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Grid container spacing={1} direction="row" alignItems="center">
                  {((props.actionsPerState || {})[status] || []).map(action => (
                    <Grid item>
                      <Button
                        disabled={selectedRows.length == 0}
                        onClick={() => props.onActionClick(action, selectedRows)}
                        size="small"
                        variant="outlined"
                        color="primary">
                        {action.title}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {props.enableCreate ? (
                <Grid item>
                  <Fab
                    onClick={props.onCreate}
                    size="medium"
                    color="primary"
                    aria-label="add"
                    className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </Grid>
              ) : null}
            </Grid>
          </Box>
        </Fragment>
      );
    else if (props.renderContext) return props.renderContext({ selectedRows, countPerState, status, filter });
    else return null;
  }

  return (
    <Fragment>
      <Table
        schema={props.schema}
        onSort={onSort}
        setSelectedRows={setSelectedRows}
        toggleMenu={props.toggleMenu}
        filter={filterWrapper}
        pageCount={pageCount}
        pageNumber={pageNumber}
        fetchMore={onFetchMore}
        fetchLast={onFetchLess}
        columns={props.columns}
        totalCount={totalCount}
        rows={data}
        height={1000}>
        {renderContext()}
      </Table>
    </Fragment>
  );
}
//
