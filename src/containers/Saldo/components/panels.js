import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  text: {
    fontSize: theme.typography.pxToRem(15),
    display: "block"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography className={classes.heading}>Reporte de Credito</Typography>
          <Typography className={classes.secondaryHeading}>
            90% a buen nivel, c/ 20 millones atrasados
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <div>
              <Typography className={classes.text}>
                El saldo total es de <strong>600 millones</strong>. De los cuales 325 son de Cupula y 435 de
                Mayoreo. El 12% se encuentra muy vencido, el comportamiento es hacia abajo con [12,12,11] hace
                30, 60 y 90 dias.
              </Typography>
            </div>
            <div>
              <Typography className={classes.text}>
                Hay 10 clientes con saldos a mas de 40 dias de vencido, con un historia de [10,12,15] hace
                30,60 y 90 dias.
              </Typography>
            </div>
            <div>
              <Typography className={classes.text}>
                Hay 10 clientes con saldos a mas de 40 dias de vencido, con un historia de [10,12,15] hace
                30,60 y 90 dias.
              </Typography>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
