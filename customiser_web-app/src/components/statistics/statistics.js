import React, { Component } from 'react';
import {takeLatest} from 'redux-saga/effects';
import ReactDOM from 'react-dom';

import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import theme from 'fusioncharts/themes/fusioncharts.theme.fint';
import * as actionTypes from '../../store/actions/actionTypes';
import { getOrdersByCollectionPointSaga } from "../../store/sagas/order";

//passing these as dependencies
charts(fusioncharts);
theme(fusioncharts);

export default class statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Loading....."
    };
  }

  componentDidMount() {
    getAverageOrdersByCollectionPoint().then((data) => {
      const ChartConfig = generateChartConfig(data, {
          "caption": "Number of orders in collection point A",
          "captionfontsize": "20",
          "theme": "fint",
          "yaxisminvalue": "12000000"
        },
        "column2d");
      ReactDOM.unmountComponentAtNode(document.getElementById('chart-viewer'));

    })
      .catch((err) => {
        console.log(err);
        this.setState({
          msg: String(err)
        });
      });
  }

  render() {
    return (

      <div id="chart-viewer">
        {this.state.msg}
      </div>
    );
  }
}
function generateChartConfig(data,chartAttr,chartType){
  const numberOfOrders = ["collection point A", "collection point B"
  ];
  const chartData = data.map((d, i) => {
    return {
      label: numberOfOrders[i],
      value: "null"
    };
  });
  const dataSource = {
    "chart": chartAttr,
    "data": chartData
  };
  var revenueChartConfigs = {
    type: chartType,
    width:800,
    height: 400,
    dataFormat: 'json',
    dataSource: dataSource

  };

  return revenueChartConfigs;
}

export function* getAverageOrdersByCollectionPoint() {
          yield takeLatest(actionTypes.GET_ORDERS_BY_COLLECTION_POINT, getOrdersByCollectionPointSaga)


}