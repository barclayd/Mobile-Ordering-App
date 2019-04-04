import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


class statistics extends React.Component {
  // componentDidMount() {
  //   this.props.FindOrdersByCollectionPoint()
  // }
  render () {
    return <ReactFC className="chart" {...chartConfigs} />;
  }
}



const data = {
  chart: {
    caption: 'Number of orders',
    subCaption: 'the Taf',
    xAxisName: 'Order Point',
    yAxisName: 'Number of orders',
    numberSuffix: '',
    theme: 'fusion'
  },
  data: [
    { label: 'WHSmith', value: '4' },
    { label: 'Top Floor', value: '2' },
  ]
};

const chartConfigs = {
  type: 'column2d',
  width: 400,
  height: 300,
  dataFormat: 'json',
  dataSource: data
};

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FindOrdersByCollectionPoint: (collectionPoint) => dispatch(actions.getOrdersByCollectionPoint(collectionPoint)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(statistics);
