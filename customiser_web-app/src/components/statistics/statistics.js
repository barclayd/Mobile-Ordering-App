  import React, { Component } from 'react';
  import {takeLatest} from 'redux-saga/effects';
  import ReactDOM from 'react-dom';

  import fusioncharts from 'fusioncharts';
  import charts from 'fusioncharts/fusioncharts.charts';
  import ReactFC from 'react-fusioncharts';
  import theme from 'fusioncharts/themes/fusioncharts.theme.fint';
  import * as actionTypes from '../../store/actions/actionTypes';
  import { getOrdersByCollectionPointSaga } from "../../store/sagas/order";
  import * as actions from "../../store/actions";
  import axios from "../../store/axios-instance";
  import { connect } from "react-redux";

  //passing these as dependencies
  charts(fusioncharts);
  theme(fusioncharts);

  export default class statistics extends Component {
    state = {
      order: [],
      orderApi: false,
    };
    constructor(props) {
      super(props);
      this.state = {
        msg: "Loading data"
      };
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
        this.props.orders.map()
          const ChartConfig = generateChartConfig(data, {
            "caption": "Number of orders in WHSmith",
            "captionfontsize": "20",
            "theme": "fint",
            "yaxisminvalue": "0"
          },
          "column2d");
      })
    .catch((err) => {
        console.log(err);
        this.setState({
          msg: String(err)
        });
      });
      }
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
    const numberOfOrders = ["WHSmith", "otherCollectionPoint"
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
    const revenueChartConfigs = {
      type: chartType,
      width:800,
      height: 400,
      dataFormat: 'json',
      dataSource: dataSource

    };
    return revenueChartConfigs;
  }

  const mapStateToProps = state => {
    return {
      orders: state.orders.orders,
      loading:state.orders.loading
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      FindOrdersByCollectionPoint: (collectionPoint) => dispatch(actions.getOrdersByCollectionPoint(collectionPoint)),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(statistics);