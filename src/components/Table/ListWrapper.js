import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "components/Table";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import useQuery from "business/hooks/useQuery";

const ROW_SIZE = 25;

export default function StandardApp(props) {
  const classes = useStyles();

  //State
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const {
    fetch: fetchData,
    data,
    loading,
    fetchAgain,
    sort,
    error,
    fetchMore,
    fetchLess,
    filter,
    totalCount
  } = useQuery({
    path: `${props.schema.api}/${props.schema.key}/get`,
    limit: 25
  });
  //

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchAgain();
  }, [props.updateHistory]);

  //Effects
  React.useEffect(() => {
    if (!data) return;
    var decimalPageCount = totalCount / ROW_SIZE;
    var parsedPageCount = parseInt(decimalPageCount);
    setPageCount(
      decimalPageCount == parsedPageCount
        ? parsedPageCount
        : parsedPageCount + 1
    );
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

  function renderContext() {
    if (props.enableCreate)
      return (
        <Fragment>
          <Box className={classes.relative} m={1} mt={2} mb={2}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Fab
                onClick={props.onCreate}
                size="medium"
                color="primary"
                aria-label="add"
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Box>
        </Fragment>
      );
    else if (props.renderContext) props.renderContext({ selectedRows, filter });
    else return null;
  }

  //Render

  return (
    <Fragment>
      <Table
        onView={props.onView}
        onSort={onSort}
        schema={props.schema}
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
        height={1000}
      >
        {renderContext()}
      </Table>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  relative: {
    position: "relative",
    minHeight: 40
  },
  fab: {},
  contextBox: {
    minHeight: 40
  }
}));
