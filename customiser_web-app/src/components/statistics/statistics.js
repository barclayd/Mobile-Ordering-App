import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default class statistics extends React.Component {
  render () {
    return <ReactFC {...chartConfigs} />;
  }
}

  const dataSource = {
    chart: {
      caption: 'Number of orders',
      subCaption: 'In WHSMiths',
      xAxisName: 'Order Point',
      yAxisName: 'Number of orders',
      numberSuffix: '',
      theme: 'fusion'
    },
    data: this.props.orders
  };
//}

  const chartConfigs = {
    type: 'column2d',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: dataSource
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

ReactDOM.render(<ReactFC {...chartConfigs} />, document.getElementById('root'));
