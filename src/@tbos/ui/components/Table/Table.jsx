import React, { useState, Fragment } from "react";
import Box from "@material-ui/core/Box";
import ReactDataGrid from "react-data-grid";

import FilterModal from "@tbos/ui/components/Table/components/FilterModal";

import JSONRenderer from "@tbos/ui/components/Table/components/renderers/JSON";
import IntegerRenderer from "@tbos/ui/components/Table/components/renderers/Integer";
import BooleanRenderer from "@tbos/ui/components/Table/components/renderers/Boolean";
import Photo from "@tbos/ui/components/Table/components/renderers/Photo";
import NumberRenderer from "@tbos/ui/components/Table/components/renderers/Number";
import Autocomplete from "@tbos/ui/components/Table/components/renderers/Autocomplete";
import Id from "@tbos/ui/components/Table/components/renderers/Id";
import Toolbar from "@tbos/ui/components/Table/components/Toolbar";
import useMutation from "@tbos/ui/business/hooks/useMutation";
import useQuery from "@tbos/ui/business/hooks/useQuery";

export default function Example(props) {
  const [columns, setColumns] = useState([]);
  const [viewColumns, setViewColumns] = useState([]);
  const [viewGroups, setViewGroups] = useState([]);
  const [viewSorts, setViewSorts] = useState([]);
  const [viewSums, setViewSums] = useState([]);

  const [showFilters, setShowFilters] = React.useState(false);

  const [filterCount, setFilterCount] = React.useState(0);

  const [selectedIndexes, setSelectedIndexes] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [filterName, setFilterName] = React.useState("");

  const { mutate, response, loading, error } = useMutation({
    path: `crm/list/create`,
    transformValue: true
  });

  const { data: lists, fetch } = useQuery({ path: "list/get", limit: 100 });

  React.useEffect(() => {
    fetchLists();
  }, []);

  React.useEffect(() => {
    var parsedColumns = columnsFromSchema();

    setColumns(parsedColumns);
    setViewColumns(parsedColumns);
  }, []);

  React.useEffect(() => {
    setSelectedIndexes([]);
    setSelectedRows(selectedRows);
    if (props.setSelectedRows) props.setSelectedRows(selectedRows);
  }, [props.rows]);

  // UI
  function onRowsSelected(selectedGridRows) {
    var newSelectedIndexes = selectedGridRows
      .map(r => r.rowIdx)
      .concat(selectedIndexes);
    setSelectedIndexes(newSelectedIndexes);

    var selectedRows = newSelectedIndexes.map(index => props.rows[index]);
    setSelectedRows(selectedRows);
    if (props.setSelectedRows) props.setSelectedRows(selectedRows);
  }

  function onRowsDeselected(unSelectedGridRows) {
    var newSelectedIndexes = selectedIndexes.filter(index => {
      var found = true;
      unSelectedGridRows.forEach(unselectedGridRow => {
        if (unselectedGridRow.rowIdx == index) found = false;
      });
      return found;
    });
    setSelectedIndexes(newSelectedIndexes);

    var selectedRows = newSelectedIndexes.map(index => props.rows[index]);
    setSelectedRows(selectedRows);
    if (props.setSelectedRows) props.setSelectedRows(selectedRows);
  }

  function onFilter({
    filters,
    columns,
    sort,
    filterName: newFilterName,
    saveFilter
  }) {
    setFilters(filters);
    setFilterCount(filters.length);
    setFilterName(newFilterName);
    setShowFilters(false);
    const queryFilters = filters.map(filter => {
      return [filter.key, filter.operation, filter.value];
    });
    if (saveFilter && newFilterName && newFilterName.length > 0)
      props.filter(queryFilters, columns, newFilterName);
    else props.filter(queryFilters);
  }

  function fetchLists() {
    fetch({
      filters: [["table", "=", props.schema.key]]
    });
  }

  function onShowFilters() {
    setShowFilters(!showFilters);
  }

  function onHideFilters() {
    setShowFilters(false);
  }

  function rowGetter(i) {
    return props.rows[i];
  }

  function updateColumns(columns) {
    setViewColumns(columns);
  }

  function updateGroups(groups) {
    setViewGroups(groups);
  }

  function updateSorts(sorts) {
    setViewSorts(sorts);
  }

  function updateSums(sums) {
    setViewSums(sums);
  }

  function onSaveReport(name) {
    mutate(
      {
        name,
        table: props.schema.key,
        type: "report",
        columns: viewColumns.map(column => column.key),
        sorts: viewSorts,
        filters,
        groups: viewGroups,
        sums: viewSums
      },
      true
    ).then(responseData => {
      fetchLists();
    });
  }

  function onSavePivot(name) {
    mutate(
      {
        name,
        table: props.schema.key,
        type: "pivot",
        columns: viewColumns.map(column => column.key),
        sorts: viewSorts,
        filters,
        groups: viewGroups,
        sums: viewSums
      },
      true
    ).then(responseData => {
      fetchLists();
    });
  }

  function onSaveFilter(name) {
    mutate(
      {
        name,
        table: props.schema.key,
        type: "list",
        columns: viewColumns.map(column => column.key),
        sorts: viewSorts,
        filters,
        groups: viewGroups,
        sums: viewSums
      },
      true
    ).then(responseData => {
      fetchLists();
    });
  }

  function columnsFromSchema() {
    return props.columns.map(column => {
      column.name = column.title;
      column = adjustColumnByType(column);
      column = adjustColumnByRenderer(column);
      return column;
    });
  }

  function adjustColumnByType(column) {
    if (column.key == "id") {
      if (!column.width) column.width = 85;
      column.locked = true;
    }

    return column;
  }

  function adjustColumnByRenderer(column) {
    if (column.key == "id") column.formatter = Id(column, props.onView);
    else if (column.render == "autocomplete") {
      if (!column.width) column.width = 180;
      column.formatter = Autocomplete(column);
    } else if (column.render == "photo") {
      if (!column.width) column.width = 60;
      column.formatter = Photo(column);
    } else if (column.render == "integer") {
      if (!column.width) column.width = 100;
      column.formatter = IntegerRenderer(column);
    } else if (column.render == "boolean") {
      if (!column.width) column.width = 50;
      column.formatter = BooleanRenderer(column);
    } else if (column.render == "number") {
      if (!column.width) column.width = 150;
      column.formatter = NumberRenderer(column);
    } else if (column.isJSON) {
      column.formatter = JSONRenderer(column);
    }
    return column;
  }

  function onSortGrid(sortColumn, sortDirection) {
    if (props.onSort) props.onSort(sortColumn, sortDirection);
  }

  return (
    <Fragment>
      <Toolbar
        lists={lists}
        toggleMenu={props.toggleMenu}
        variant={props.toolbarVariant || "full"}
        selectedRows={selectedRows}
        onFilter={onFilter}
        pageCount={props.pageCount}
        pageNumber={props.pageNumber}
        onFetchMore={props.fetchMore}
        onFetchLast={props.fetchLast}
        rowCount={props.totalCount}
        filterName={filterName}
        filterCount={filterCount}
        onSaveFilter={onSaveFilter}
        onSaveReport={onSaveReport}
        onSavePivot={onSavePivot}
        onShowFilters={onShowFilters}
        schema={props.schema}
      />

      <Box>
        <div style={{ width: "100%" }}>
          <FilterModal
            updateColumns={updateColumns}
            updateGroups={updateGroups}
            updateSorts={updateSorts}
            updateSums={updateSums}
            filters={filters}
            filterName={filterName}
            onFilter={onFilter}
            viewColumns={viewColumns}
            viewGroups={viewGroups}
            viewSorts={viewSorts}
            viewSums={viewSums}
            columns={columns}
            metadata={props.metadata}
            open={showFilters || false}
            handleClose={onHideFilters}
          />
        </div>
      </Box>

      <Box>
        <div style={{ width: "100%" }}>
          {props.children}
          <ReactDataGrid
            rowKey="id"
            rowHeight={25}
            headerRowHeight={28}
            columns={viewColumns}
            rowGetter={rowGetter}
            onGridSort={onSortGrid}
            rowsCount={props.rows.length}
            minHeight={props.height ? props.height - 20 : 0}
            rowRenderer={RowRenderer}
            rowSelection={{
              showCheckbox: true,
              enableShiftSelect: true,
              onRowsSelected: onRowsSelected,
              onRowsDeselected: onRowsDeselected,
              selectBy: {
                indexes: selectedIndexes
              }
            }}
          />
        </div>
      </Box>
    </Fragment>
  );
}

const RowRenderer = ({ renderBaseRow, ...props }) => {
  return <div style={{ fontSize: 11 }}>{renderBaseRow(props)}</div>;
};

function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
