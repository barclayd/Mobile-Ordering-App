  // import React, { Component } from 'react';
  // import {takeLatest} from 'redux-saga/effects';
  // import ReactDOM from 'react-dom';
  //
  // import fusioncharts from 'fusioncharts';
  // import charts from 'fusioncharts/fusioncharts.charts';
  // import ReactFC from 'react-fusioncharts';
  // import theme from 'fusioncharts/themes/fusioncharts.theme.fint';
  // import * as actionTypes from '../../store/actions/actionTypes';
  // import { getOrdersByCollectionPointSaga } from "../../store/sagas/order";
  // import * as actions from "../../store/actions";
  // import axios from "../../store/axios-instance";
  //
  // //passing these as dependencies
  // charts(fusioncharts);
  // theme(fusioncharts);
  //
  // export default class statistics extends Component {
  //   state = {
  //     order: [],
  //     orderApi: false,
  //   };
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       msg: "Loading data"
  //     };
  //   }
  //
  //   componentDidMount() {
  //     getAverageOrdersByCollectionPoint().then((data) => {
  //       const ChartConfig = generateChartConfig(data, {
  //           "caption": "Number of orders in WHSmith",
  //           "captionfontsize": "20",
  //           "th  eme": "fint",
  //           "yaxisminvalue": "0"
  //         },
  //         "column2d");
  //       ReactDOM.unmountComponentAtNode(document.getElementById('chart-viewer'));
  //
  //     })
  //       .catch((err) => {
  //         console.log(err);
  //         this.setState({
  //           msg: String(err)
  //         });
  //       });
  //   }
  //
  //   render() {
  //     return (
  //       <div id="chart-viewer">
  //         {this.state.msg}
  //       </div>
  //     );
  //   }
  // }
  // function generateChartConfig(data,chartAttr,chartType){
  //   const numberOfOrders = ["WHSmith", "otherCollectionPoint"
  //   ];
  //   const chartData = data.map((d, i) => {
  //     return {
  //       label: numberOfOrders[i],
  //       value: "null"
  //     };
  //   });
  //   const dataSource = {
  //     "chart": chartAttr,
  //     "data": chartData
  //   };
  //   const revenueChartConfigs = {
  //     type: chartType,
  //     width:800,
  //     height: 400,
  //     dataFormat: 'json',
  //     dataSource: dataSource
  //
  //   };
  //   return revenueChartConfigs;
  // }