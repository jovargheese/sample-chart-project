import React, { forwardRef, useImperativeHandle } from 'react'
import {vital} from '../vital'
import html2canvas  from "html2canvas";
import { jsPDF } from "jspdf";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,

  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import annotationPlugin from "chartjs-plugin-annotation";

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    annotationPlugin
  );

  
  
  
const HrMonitorChartJS = forwardRef((prop,ref) => {
  
    const labels = vital?.reportData?.Trends?.HR?.columns?.map((e)=>`${String(new Date(e.timeUnix*1000).getHours()).padStart(2, '0')}:${String(new Date(e.timeUnix*1000).getMinutes()).padStart(2, '0')}`)
   
    const datas = vital?.reportData?.Trends?.HR?.columns?.map((e)=>e.value);
    const down = (ctx,value)=> ctx?.p0?.parsed?.y>ctx?.p1?.parsed?.y?value='rgba(118, 117, 117, 0.42)':undefined;
    const down1 = (ctx,value)=>ctx?.p0?.parsed?.y>ctx?.p1.parsed?.y?value=[5,2]:undefined;


    const options = {
        responsive: true,
         annotation: {
                annotations: [{
                    drawTime: "afterDraw",
                    id: "a-line-1",
                    xMin:0,
                    Xmax:2,
                    ymin:0,
                    yMax:120,
                    borderColor: "red",
                    borderWidth: 2
                  }]
                },    
        scales: {
          y: {
            beginAtZero: false,
          },
        },
        };

    const data = {
        labels:labels,
        datasets:[
            {
                label:'Heart Rate Monitoring',
                data:datas,
                backgroundColor: 'rgb(205, 209, 228)',
                borderColor: 'green',
                borderWidth:2,
                segment:{
                    borderColor:ctx=>down(ctx,'rgba(118, 117, 117, 0.42)')||('rgba(0, 64, 124, 1)'),
                    borderDash:ctx=>down1(ctx,[0,0]||[2,2]),
                    
                    
                },

            },
            
        ]
    }

    const arbitraryLine ={
        id:'arbitraryLine',
        beforeDatasetsDraw:(chart,args,pluginOptions)=>{
            const {ctx,chartArea:{top,bottom,left,right,width,height},scales:{x,y}} = chart;
            ctx.save();
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x.getPixelForValue(2),top);
            ctx.lineTo(x.getPixelForValue(2),bottom);
            ctx.stroke();
            ctx.restore()
        }
    }

    useImperativeHandle(ref, () => {
        return{
            printDocument() {
            const input = document.getElementById('divToPrint')
            html2canvas(input)
              .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                // console.log(pdfWidth);
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
              })
            }}
         
      });
    
  return (
    <div id="divToPrint" style={{width:'600px',padding:'0rem 0rem 2rem 2rem'}}>

    <Line options={options} data={data} plugins={[arbitraryLine]}/>
    <Line options={options} data={data} plugins={[arbitraryLine]}/>
    
    </div>
  )
})

export default HrMonitorChartJS
