import React, {useState} from 'react';
import { useSelector,useDispatch } from "react-redux";
import {Line} from 'react-chartjs-2';
import { Card } from 'primereact/card';

const GraphComponent = (props) => {
    const dispatch = useDispatch();
	const [billingStateData, setBillingStateData] =  React.useState({});
	const [billingStateDataLength, setBillingStateDataLength] =  React.useState({});
	const [expandGraphTab, setExpandGraphTab] = useState(false);
    const [graphData, setGraphData] = useState([]);
    let spendValueArray=[]
	const billingData = props.billingData || "";
    const billingDataLength  = props.dataLength || "";
    const status  = props.status || false;







       const initialSetter=()=>{
           setBillingStateData(billingData)
		    setBillingStateDataLength(billingDataLength)
       }


             React.useEffect(() => {
		        initialSetter()
	         }, [status]);


            React.useEffect(() => {
                GraphDataFunction()
                         if(graphData.length>1){
                             setExpandGraphTab(true)
                             console.log('graphData',graphData)
                         }
                         }, [billingStateData,graphData]);


         const GraphDataFunction=()=> {
             for (let i = 0; i < billingStateDataLength; i++ ) {
                 let tempValue=billingStateData[i].amount
                 spendValueArray.push(tempValue)
             }
             setGraphData(spendValueArray)
         }



        const state = {
          labels: ['1th January', '5 th January', '10 th January',
                   '15 th January', '20 th January'],
          datasets: [
            {
              label: 'Amount',
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: graphData
            }
          ]
        }



	return (
	    <div>

            <div className="p-d-flex">
                    <h>Graph is loaded </h>
                <button onClick={GraphDataFunction}>Graph me </button>
            {expandGraphTab && (
            <div>
                <Card >
                     <div>
                <Line
                  data={state}
                  options={{
                    title:{
                      display:true,
                      text:'Spend amount vs time',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }}
                />
            </div>
            </Card>
            </div>)}
            </div>

        </div>
	)
};
export default GraphComponent

