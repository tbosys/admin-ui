import React from "react";
import { Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";
import { styles } from "views/base/table";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import { Document, Page } from "react-pdf";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tab from "./tab";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const allStyles = theme => ({
  bold: {
    fontWeight: 800
  },
  root: {
    flexGrow: 1,

    overflow: "scroll",
    maxHeight: "80vh"
  },
  formRoot: {
    marginLeft: 10,
    marginRight: 10
  }
});

class Files extends React.Component {
  state = {
    accounts: [],
    tab: 0,
    item: {},
    type: null,
    key: null,
    xml: null,
    pdf: null
  };

  componentDidMount() {
    if (this.props.item.attachments && this.props.item.attachments.length > 0) {
      var pdfs = this.props.item.attachments.filter(item => item.type == "pdf");
      if (pdfs[0]) this.setState({ pdf: pdfs[0].key, type: "pdf" });
      else if (this.props.item.attachments[0] && this.props.item.attachments[0].type == "xml")
        this.setState({ pdf: this.props.item.attachments[0].key, type: "xml" });
    }
  }
  onDocumentLoadSuccess() {}

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  onChangeFileView = async (key, type) => {
    this.setState({ view: type, key: key, xml: null, pdf: null });
    if (type == "pdf") {
      this.setState({ pdf: key });
    }
    if (type == "xml") {
      var result = await fetch(`https://emails.efactura.io/${key}`);
      var text = await result.text();
      console.log(text);

      this.setState({ xml: text });
    }
  };

  renderPdf() {
    if (!this.state.pdf) return null;
    return (
      <div style={{ height: "100%", borderLeft: "1px solid #ddd" }}>
        <Document
          onLoadError={error => alert("Error while loading document! " + error.message)}
          onSourceError={error => alert("Error while loading document! " + error.message)}
          file={`https://emails.efactura.io/${this.state.pdf}`}
          onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page renderTextLayer={true} renderAnnotationLayer={true} height={"800"} pageNumber={1} />
        </Document>
      </div>
    );
  }

  renderXml() {
    if (!this.state.xml) return null;
    var signature = 10000000;
    return (
      <div style={{ height: "100%", borderLeft: "1px solid #ddd" }}>
        {this.state.xml
          .split("><")
          .filter((line, index) => {
            if (index > signature) return false;
            if (line.indexOf("ds:Signature") > -1) {
              signature = index;
              return false;
            }
            if (line.indexOf("?xml") > -1) return false;
            if (line.indexOf(".xsd") > -1) return false;
            return true;
          })
          .map(line => {
            var parts = line.split(">");
            if (!parts[1]) return <hr />;
            return (
              <div>
                {parts[0]} : {parts[1] ? parts[1].replace("</" + parts[0], "") : ""}
              </div>
            );
          })}
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <Tab onChange={this.onChangeFileView} attachments={this.props.item.attachments} />
        <div className={this.props.classes.root}>
          {this.renderPdf()}
          {this.renderXml()}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(allStyles, { withTheme: true })(Files);
