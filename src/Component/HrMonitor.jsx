
import React, { useEffect } from 'react';
import * as echarts from 'echarts';


const HrMonitor = () => {

    useEffect(() => {
        // Get the DOM element where you want to render the chart
        const chartContainer = document.getElementById('chart-container');
    
        // Initialize ECharts with the DOM element
        const myChart = echarts.init(chartContainer, null, {
          renderer: 'canvas',
          useDirtyRect: false,
        });
    
        // Define your chart configuration (the 'option' object from your original code)
    
        // let app = {};



let option = {
  title: {
    text: 'Heart Rate Summary',
    subtext: 'Heart Rate'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} bpm'
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: 6,
        color: 'blue'
      },
      {
        gt: 6,
        lte: 8,
        color: 'blue'
      },
      {
        gt: 8,
        lte: 14,
        color: 'blue'
      
      },
      {
        gt: 14,
        lte: 17,
        color: 'blue'
      },
      {
        gt: 17,
        color: 'blue'
      }
    ]
  },
  series: [
    {
      name: 'Heart Rate',
      type: 'line',
    //   smooth: true,
      // prettier-ignore
      data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
      markArea: {
        itemStyle: {
          color: 'rgba(198, 198, 198,0.4)'
        
        },
    
        data: [
          [
            {
              name: 'Morning Peak',
              xAxis: '07:30'
            },
            {
              xAxis: '10:00'
            }
          ],
          [
            {
              name: 'Evening Peak',
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      },
      markPoint:{
        symbol:'none',
        data:[{

            name: 'Dashed Line start',
           
            coord:['7.30',"dataMin"],
        },{
           name:'dashed line end',
           coord:['10.0',"dataMin"],
            itemStyle:{
                color:'red',
                lineStyle:{
                    width:1,
                    type:'dashed',
                    color:"green"
                }
            }
        }]
      },
   
    }
  ]
};
console.log(option.series[0].data[2]);
    
        // Set the chart options
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
    
        // Add a listener for window resize to make the chart responsive
        window.addEventListener('resize', myChart.resize);
    
        // Cleanup: Remove the resize event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', myChart.resize);
        };
      }, []); // The empty array as the second argument ensures this effect runs only once
    
  return (
    <div id="chart-container" style={{ width: '50%', height: '400px' }}>
      {/* The chart will be rendered inside this div */}
    </div>
  )
}

export default HrMonitor
