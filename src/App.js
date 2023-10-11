
import { createRef, useRef, useState } from 'react';
import './App.css';
// import HrMonitor from './Component/HrMonitor';
import HrMonitorChartJS from './Component/HrMonitorChartJS';



function App() {
const [active,setActive]=useState(false)
const childRef = createRef(null);
  const clickHandler=()=>{
    setActive(pre=>!pre)
  }
  const downloadHandler = ()=>{
    childRef.current.printDocument();
    // console.log(childRef);
  }
  return (
    <div className="App">
      {!active&&<button onClick={clickHandler}>Get vital history</button>}
     {active&& <button style={{marginLeft:'1rem'}} onClick={downloadHandler}>Download Report</button>}
      {active&&<HrMonitorChartJS ref={childRef}/>}
    </div>
  );
}

export default App;
