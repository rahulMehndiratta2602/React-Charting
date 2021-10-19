import React,{useState,useEffect,Component} from 'react';
import './index.css';

import data from './data'
import Select from 'react-select';
// import JSONdata from './JSONdata';

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const chartConfig={"chart": {
        "caption": "Stock",
        "xAxisname": "",
        "yAxisName": "Open Interest",
        "plotFillAlpha": "80",
        "theme": "fusion",
        "paletteColors": "#F25166,#5ABB8C"
    },
    "categories": [
        {
            "category": []
        }
    ],
    "dataset": [
        {
            "seriesname": "Call",
            "data": []
        },
        {
            "seriesname": "Put",
            "data": []
        }
    ],}
    
const chartConfigs = {
  type: 'mscolumn2d',
  width: 800,
  height: 400,
  dataFormat: 'json',
  dataSource: {...chartConfig},
};
const labels = [
  {
    value: 'RELIANCE',
    label: 'RELIANCE'
  },
  {
    value: 'SBIN',
    label: 'SBIN'
  },
  {
    value: 'INFY',
    label: 'INFY'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = chartConfigs;

    this.updateData = this.updateData.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.input = React.createRef();
  }

  updateData(e)
  {
    e.preventDefault();
    let label=(this.input.current.state.selectValue[0].value); 
    var prevDs = Object.assign({}, this.state.dataSource);
    const { values } = data.find(item => item.ticker === label);
            const strike = values.strike.map((item) =>
            {
                return { label:`${item}`}
            })
            const call = values.calloi.map((item) =>
            {
                return { value:item}
            })
            const put= values.putoi.map((item) =>
            {
                return { value:item}
            })
    prevDs.chart.caption = label;
    prevDs.categories[0].category = strike;
    prevDs.dataset[0].data = call;
    prevDs.dataset[1].data= put;
    this.setState({
      dataSource: prevDs,
    });
  }
  handleChange(e)
  {
    console.log(e);  
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='col-sm-5'>
            <Select options={labels} ref={this.input} onChange={this.handleChange}/>
          </div>
           <button
              className='btn btn-outline-secondary btn-sm col-sm-2'
              onClick={this.updateData}
              type='submit'
           >
             Update Chart Data
           </button>
        </div>
        <center><ReactFC {...this.state} /></center>
      </div>
    );
  }
}

export default App;
