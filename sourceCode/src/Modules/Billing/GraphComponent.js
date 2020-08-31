import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import { Card } from 'primereact/card';

const GraphComponent = (props) => {
	const [billingStateData, setBillingStateData] =  React.useState({});
	const [expandGraphTab, setExpandGraphTab] = useState(false);
    const [graphData, setGraphData] = useState([]);
    let spendValueArray=[]
	const billingData = props.billingData || "";



       const initialSetter=()=>{
           console.log(billingData,'billingData')
           setBillingStateData(billingData)
       }


       React.useEffect(() => {
		        initialSetter()
       }, []);


       React.useEffect(() => {
             if(graphData.length>1 ){
               setExpandGraphTab(true)
               }else{
               setExpandGraphTab(false)
                 }
               }, [graphData]);

       const GraphDataFunction=()=> {
             console.log(billingStateData,'billingStateData')
             for (let i = billingStateData.length; i--; ) {
                 let tempValue=billingStateData[i].amount
                 spendValueArray.push(tempValue)
                 setGraphData(spendValueArray)
                   console.log(graphData,'graphData')
             }
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
                <div className="form-group">
							<label>Generate Graph</label>
							<button type="submit" value="save" name="save" className="back-button" onClick={GraphDataFunction}>Generate{" "}
							</button>
				</div>

            {expandGraphTab  && (
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

