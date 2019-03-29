import React, { Component } from 'react';

import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import theme from 'fusioncharts/themes/fusioncharts.theme.fint';

//passing these as dependencies
charts(fusioncharts);
theme(fusioncharts);

export default class statistics extends Component {
  render() {
    return(
      <div><h1>Stats page</h1></div>
    )
  }
}