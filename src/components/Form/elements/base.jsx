import React from "react";
import PropTypes from 'prop-types';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({

  cardIconTitle: {

    fontWeight: "300",
    marginTop: "6px",
  },
  selectFormControl: {
    marginTop: 6
  },
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: "100%"
  },
  gridList: {
    width: "100%",
    "& $card": {
      marginBottom: 0
    }
  },
  gridCard: {
    marginBottom: 0,
    marginTop: 10
  },
  subheader: {
    width: '100%',
  },

  pageHeader: {
    marginTop: "20px !important",
    marginBottom: "30px !important"
  },
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textTransform: "capitalize",
    textDecoration: "none",
    color: "#fff",
  }
})

class BaseElement extends React.Component {
  constructor(props) {
    super(props);
  }

  transformValue(value) {

    return value;
  }


  onKeyPress = (e) => {

  }

  onFieldChange = (e) => {
    if (e.persist) e.persist();

    var value = e.value;
    if (!value && e.currentTarget) value = e.currentTarget.value;

    var name = e.name;
    if (!name && e.target) name = e.target.name;
    this.props.onChange(name, this.transformValue(value), this.props.id);
  }







}

export default BaseElement;

