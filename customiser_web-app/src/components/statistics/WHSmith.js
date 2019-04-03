import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default class WHSmith extends React.Component {
  render () {
    return <ReactFC className="chart" {...chartConfigs} />;
  }
}

const WHSmithData = {
  chart: {
    caption: 'Number of orders',
    subCaption: 'In WHSMiths',
    xAxisName: 'Order Point',
    yAxisName: 'Number of orders',
    numberSuffix: 'K',
    theme: 'fusion'
  },
  //this.props.orders
  data: [
    { label: 'Venezuela', value: '290' },
    { label: 'Saudi', value: '260' },
    { label: 'Canada', value: '180' },
    { label: 'Iran', value: '140' },
    { label: 'Russia', value: '115' },
    { label: 'UAE', value: '100' },
    { label: 'US', value: '30' },
    { label: 'China', value: '30' }
  ]
};
//}

const TopFloorData = {
  chart: {
    caption: 'Number of orders',
    subCaption: 'In WHSMiths',
    xAxisName: 'Order Point',
    yAxisName: 'Number of orders',
    numberSuffix: 'K',
    theme: 'fusion'
  },
  //this.props.orders
  data: [
    { label: 'Venezuela', value: '290' },
    { label: 'Saudi', value: '260' },
    { label: 'Canada', value: '180' },
    { label: 'Iran', value: '140' },
    { label: 'Russia', value: '115' },
    { label: 'UAE', value: '100' },
    { label: 'US', value: '30' },
    { label: 'China', value: '30' }
  ]
};

const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: WHSmithData
};

const chartConfigsTop = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: TopFloorData
};
//
// const mapStateToProps = state => {
//   return {
//     orders: state.orders.orders,
//     loading: state.orders.loading
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     FindOrdersByCollectionPoint: (collectionPoint) => dispatch(actions.getOrdersByCollectionPoint(collectionPoint)),
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(statistics);

ReactDOM.render(<ReactFC {...chartConfigs} />, document.getElementById('root'));
