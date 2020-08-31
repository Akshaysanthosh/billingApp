import React, {useState} from 'react';
import { useSelector,useDispatch } from "react-redux";
import {Line} from 'react-chartjs-2';
import { Card } from 'primereact/card';

const GraphComponent = (props) => {
    const dispatch = useDispatch();
	const billingData = useSelector(state => state.billing) || '';
	const [billingStateData, setBillingStateData] =  React.useState({});
	const [billingStateDataLength, setBillingStateDataLength] =  React.useState({});
    const BillingMockData = require('../../Utils/MockData.json');
    let spendValueArray=[]
    const [expandGraphTab, setExpandGraphTab] = useState(false);
    const [graphData, setGraphData] = useState([]);


       const initialSetter=()=>{

       		setBillingStateData(BillingMockData.bills)
		    setBillingStateDataLength(BillingMockData.bills.length)
            dispatch({
                type:'billingDetails',
                payload :BillingMockData.bills
            })}

             React.useEffect(() => {
		        initialSetter()
	         }, []);

            React.useEffect(() => {
                         if(graphData.length>1){
                             setExpandGraphTab(true)
                             console.log('graphData',graphData)
                         }
                         }, [graphData]);


         const GraphDataFunction=()=> {
             for (let i = 0; i < billingStateDataLength; i++ ) {
                 let tempValue=billingStateData[i].amount
                 spendValueArray.push(tempValue)
             }
             setGraphData(spendValueArray)
         }



        const state = {
          labels: ['January', 'February', 'March',
                   'April', 'May'],
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
            <div className="p-d-flex">Flex Container</div>
             <h>Graph is loaded </h>
                <button onClick={GraphDataFunction}>Graph me </button>
            {expandGraphTab && (
            <div>
                <Card title="Title" subTitle="SubTitle">
                     <div>
                <Line
                  data={state}
                  options={{
                    title:{
                      display:true,
                      text:'Average Rainfall per month',
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
	)
};
export default GraphComponent

