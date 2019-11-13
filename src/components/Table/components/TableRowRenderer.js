import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import numeral from "numeral";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Chip from "@material-ui/core/Chip";
import lightGreen from "@material-ui/core/colors/indigo";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";

const RowRendererStyle = theme => ({
  root: {
    borderRadius: 0,
    backgroundColor: lightGreen[50]
  },
  cardRoot: {
    borderRadius: 0
  },
  title: {
    textTransform: "capitalize"
  },
  group: {
    height: 25,
    borderBottom: "1px solid #dedede"
  },
  groupWrapper: {},
  groupName: {
    marginLeft: 5,
    marginRight: 15,
    marginTop: 2,
    textTransform: "capitalize",
    fontWeight: 600
  },
  groupSum: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 0,

    fontWeight: 400
  },
  groupCount: {
    marginLeft: 15,
    marginTop: 5
  },
  iconButton: {
    marginLeft: 0,
    marginTop: 3,
    width: 50
  },
  chip: {
    marginRight: 5,
    paddingTop: 0,
    height: 25,
    fontWeight: 300,
    borderRadius: "10px 10px 0px 0px"
  },
  badge: {
    minWidth: 22,
    minHeight: 26,
    width: "auto",
    position: "static",
    left: "auto",
    top: "auto",
    padding: 5,
    // The border color match the background color.
    border: `2px solid ${theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[900]}`
  }
});

export default (dataRows, metadata, width) => {
  const RowRendererRaw = props => {
    const { classes } = props;

    if (props.isScrolling)
      return (
        <div className={classes.group} onKeyDown={onKeyDown} tabIndex={0}>
          <div className={classes.groupWrapper} />
        </div>
      );

    let treeDepth = props.treeDepth || 0;
    let marginLeft = treeDepth * 20;

    let style = {};

    let onKeyDown = e => {
      if (e.key === "ArrowLeft") {
        props.onRowExpandToggle(false);
      }
      if (e.key === "ArrowRight") {
        props.onRowExpandToggle(true);
      }
      if (e.key === "Enter") {
        props.onRowExpandToggle(!props.isExpanded);
      }
    };

    var Icon = props.isExpanded ? ExpandLess : ExpandMore;

    var rows = dataRows;
    var rowValue = props.row.name;
    if (rowValue == "true") rowValue = true;
    if (rowValue == "false") rowValue = false;

    var rowKey = props.row.__metaData.columnGroupName;

    var sumColumnKey = metadata.table.sum;
    var sumColumValues = {};

    function processSum(item) {
      if (metadata.table.sum) {
        metadata.table.sum.forEach(sumColumnKey => {
          var value = sumColumValues[sumColumnKey] || {
            value: 0,
            column: metadata.properties[sumColumnKey]
          };
          value.value += item[sumColumnKey];
          sumColumValues[sumColumnKey] = value;
        });
      }
    }

    var thisRows = rows.filter(item => {
      if (item[rowKey] == rowValue) {
        processSum(item);
        return true;
      }
      return false;
    });

    var filaTitle = "Filas";
    if (thisRows.length == 1) filaTitle = "Fila";

    var sumLabels = [];
    if (metadata.table.sum) {
      Object.keys(sumColumValues).forEach(sumColumnValueKey => {
        const sumColumn = sumColumValues[sumColumnValueKey];
        sumLabels.push({ label: sumColumn.column.title, value: numeral(sumColumn.value).format("0,00.00") });
      });
    }

    return (
      <div className={classes.group} onKeyDown={onKeyDown} tabIndex={0}>
        <div className={classes.groupWrapper}>
          <Grid style={{ width: 1000, left: props.scrollLeft + 8, position: "absolute" }} container>
            <Grid item>
              <Icon className={classes.iconButton} onClick={props.onRowExpandClick} />
            </Grid>

            <Grid item>
              <div className={classes.groupName}>
                <Grid container>
                  <Grid item>
                    <div className={classes.groupName}>
                      {props.name == "undefined" || null || undefined ? "Ninguno" : props.name}
                    </div>
                  </Grid>

                  <Grid item>
                    <Chip
                      avatar={<Avatar>{"#"}</Avatar>}
                      label={thisRows.length}
                      className={classes.chip}
                      variant="outlined"
                    />
                  </Grid>

                  {sumLabels.map(sumLabel => {
                    return (
                      <Grid item>
                        <Chip
                          label={`${sumLabel.label}: ${sumLabel.value}`}
                          className={classes.chip}
                          variant="outlined"
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  return withStyles(RowRendererStyle)(RowRendererRaw);
};
