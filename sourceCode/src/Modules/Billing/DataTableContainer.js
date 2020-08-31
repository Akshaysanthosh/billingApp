import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { indexFinderFunction,pairSumIdentifier,arrayReversalFunction} from "../CommonServices/CommonFunctions";
import { showMessage } from "../../Utils/Util";
import {ToastContainer} from 'react-toastify';
import GraphComponent from "./GraphComponent";



const DataTableContainer = (props) => {
	const dispatch = useDispatch();
	const billingData = useSelector(state => state.billing) || '';
	const [billingStateData, setBillingStateData] =  React.useState({});
	const [billingStateDataLength, setBillingStateDataLength] =  React.useState({});
	const [expandEditTab, setExpandEditTab] = useState(false);
	const [expandAddTab, setExpandAddTab] = useState(false);
	const [categoryFlag, setCategoryFlag] = useState(false);
	const [editableData, setEditableData] = useState("");
	const [categoryData, setCategoryData] = useState([]);
	const [budgetArray, setBudgetArray] = useState([]);
	const [budgetFlag, setBudgetFlag] = useState(false);
	const [graphFlag, setGraphFlag] = useState(false);
    const { register, handleSubmit } = useForm();
    const BillingMockData = require('../../Utils/MockData.json');
    let categoryArray=[]
	let spendValueArray=[]
	let budgetValueArray=[]

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

    		const editItemFunction = (rowdata) => {
         		setEditableData(rowdata);
         		console.log(typeof rowdata.date)
         	    if (expandEditTab === true) {
				  setExpandEditTab(false);
				} else {
				  setExpandEditTab(true);
				}
		  	 };

           const removeItemFunction = (rowdata) => {
				   let tempBillData = billingStateData
			       let indexFound = indexFinderFunction(rowdata,tempBillData)
				   tempBillData[indexFound] = {}
				   setBillingStateData(tempBillData)
					dispatch({
					   type: 'billingDetails',
					   payload: billingStateData
				   })
			   	showMessage('success', 'Item Removed');
		   };

		   const formEdit = (data) => {
			   if (data) {
				   let tempBillData = billingStateData
				   let indexFound = indexFinderFunction(data,tempBillData)
				   tempBillData[indexFound] = data
				   setBillingStateData(tempBillData)
				   setExpandEditTab(false)
				   dispatch({
					   type: 'billingDetails',
					   payload: billingStateData
				   })
			   }
				showMessage('success', 'Item details edited');
		   }

	   		const addItem = (data) => {
         	    if (expandAddTab === true) {
				  setExpandAddTab(false);
				} else {
				  setExpandAddTab(true);
				}
				if(data.description){
					let temArray=billingData.billingData
                    let reversedArray=arrayReversalFunction([],temArray)
					let nextID=reversedArray[0].id
					let newItemData={
						id:nextID+1,
						description:data.description,
						category:data.category,
						amount:data.amount,
						date:data.date,
					}
					setBillingStateData([...billingStateData,newItemData])
						 dispatch({
							   type: 'billingDetails',
							   payload: billingStateData
					 })
						showMessage('success', 'New Item Added');
					}
		    }

			 const categorySelectFunction=(e)=> {
			 let selectedCategory=e.target.value
				 if(selectedCategory != 'All' && billingStateData ){
				 	setCategoryFlag(true)
					for (let i = billingStateData.length; i--;) {
						 if (billingStateData[i].category ==selectedCategory) {
								let tempValue=billingStateData[i]
								 categoryArray.push(tempValue)
								 setCategoryData(categoryArray)
							 }
						 }
					 dispatch({
							   type: 'billingDetails',
							   payload: categoryData
					 })
					 } else{
				 		setCategoryFlag(false)
						dispatch({
							   type: 'billingDetails',
							   payload: BillingMockData.bills
						   })
					 }
			 }

		   const minimumBudget=(data)=>{

			    for (let i = billingStateData.length; i--;) {
                 let tempValue=billingStateData[i].amount
                 spendValueArray.push(tempValue)
				 }
			      let billArray=pairSumIdentifier(spendValueArray,data.budget_value)
			      let targetValueArray=billArray[0]
			      if(typeof targetValueArray !== 'undefined' && targetValueArray.length > 0){
			      		for (let i = 0; i < targetValueArray.length; i++) {
						let tempValue=targetValueArray[i]
								for (let i = billingStateData.length; i--;) {
									if(billingStateData[i].amount ==tempValue){
											let tempArray=billingStateData[i]
											budgetValueArray.push(tempArray)
										    setBudgetArray(budgetValueArray)
									}}}
							setBudgetFlag(true)
							  }

					   }


		   const graphDisplay=()=>{
				 if (expandEditTab === true) {
						  setGraphFlag(false);
				} else {
						  setGraphFlag(true);
					}
			  }

			 const actionBodyTemplate = (rowdata) => {
				return (

				  <Button type="button"  onClick={() => editItemFunction(rowdata)}  label="edit" >
				  </Button>
				);
			  }

			  const removeBodyTemplate = (rowdata) => {
				return (
				  <Button type="button"   onClick={() => removeItemFunction(rowdata)} label="remove" icon="pi-remove">
				  </Button>
				);
			  };


	return (
		<React.Fragment>
			<section>
				<ToastContainer/>
				<h1>Billing App</h1>
				<div>
				  <div>
						<div className="row mt-5">
						  <div className="col-12">
						  </div>
						</div>
					  			<div className="row">
							        <div className="form-group">
										<label className="w-100 d-flex align-items-end">
										  Category type
										  <span className="optional ml-auto">Optional</span>
										</label>
										<div className="w-100 d-flex align-items-left">
										  <select
											className="form-control"
											name="category_select"
											id="category_select"
											defaultValue="1"
											onChange={categorySelectFunction}
										  >
											<option value="All">All</option>
											<option value="utility">utility</option>
											<option value="shopping & Dining">shopping & Dining</option>
											<option value="education">education</option>
											<option value="Personal Care">Personal Care</option>
											<option value="Travel">Travel</option>
											<option value="shopping">shopping</option>
											<option value="Food & Dining">Food & Dining</option>
										  </select>
										</div>
									  </div>
									{(categoryFlag===true)?(
										<div>
										 <div className="col-12">
											<div>
												<DataTable value={categoryData}>
												<Column header="id" type= 'number' field="id"/>
												<Column header="description" field="description" />
												<Column header="category" field="category" />
												<Column header="amount" field="amount" />
												<Column header="date"  field="date" />
												<Column body={actionBodyTemplate}/>
												<Column body={removeBodyTemplate}/>
											  </DataTable>
											</div>
										  </div>
										</div>):(
										<div>
											<div className="col-12">
											<div>
												<DataTable value={billingStateData}>
												<Column header="id" type= 'number' field="id"/>
												<Column header="description" field="description" />
												<Column header="category" field="category" />
												<Column header="amount" field="amount" />
												<Column header="date"  field="date" />
												<Column body={actionBodyTemplate}/>
												<Column body={removeBodyTemplate}/>
											  </DataTable>
											</div>
										  </div>
										</div>)}
						</div>
					  </div>
					{!expandAddTab && (<button value="save" type="submit" className="btn primary-button" name="save" onClick={addItem}>Add</button>)}

				</div>

				{expandEditTab && (
							<div >
								<form onSubmit={handleSubmit(formEdit)}>
								<div className="form-group">
									<label>ID</label>
									<input
									  className="form-control"
									  type="number"
									  name="id"
									  id="id"
									  ref={register}
									  readOnly={true}
									  defaultValue={editableData.id}
									/>
								</div>
								<div className="form-group">
									<label>Description</label>
									<input
									  className="form-control"
									  type="text"
									  name="description"
									  id="description"
									  ref={register}
									  defaultValue={editableData.description}
									/>
								</div>
								<div className="form-group">
									<label>Category</label>
									<input
									  className="form-control"
									  type="text"
									  name="category"
									  id="category"
									  ref={register}
									  defaultValue={editableData.category}
									/>
								</div>
								<div className="form-group">
									<label>Amount</label>
									<input
									  className="form-control"
									  type="text"
									  name="amount"
									  id="amount"
									  ref={register}
									  defaultValue={editableData.amount}
									/>
								</div>
								<div className="form-group">
									<label>Date</label>
									<input
									  className="form-control"
									  type="date"
									  name="date"
									  id="date"
									  ref={register}
									  defaultValue={editableData.date}
									/>
								</div>
									<div className='new-line'/>
								 <div>
								      <div className="row mt-5 mb-5">
										<div className="col-12">
										  <button
											type="submit"
											value="save" name="save"
											className="mr-5 btn complete-button"
										  >
											Update{" "}
										  </button>
											<span className="text-purple font-weight-bold" onClick={editItemFunction} >Cancel</span>
										</div>
									  </div>
							  </div>
							</form>
							</div>)}

							{expandAddTab && (
							<div >
								<form onSubmit={handleSubmit(addItem)}>
								<div className="form-group">
									<label>Description</label>
									<input
									  className="form-control"
									  type="text"
									  name="description"
									  id="description"
									  ref={register}
									/>
								</div>
								<div className="form-group">
									<label>Category</label>
									<input
									  className="form-control"
									  type="text"
									  name="category"
									  id="category"
									  ref={register}
									/>
								</div>
								<div className="form-group">
									<label>Amount</label>
									<input
									  className="form-control"
									  type="text"
									  name="amount"
									  id="amount"
									  ref={register}
									/>
								</div>
								<div className="form-group">
									<label>Date</label>
									<input
									  className="form-control"
									  type="date"
									  name="date"
									  id="date"
									  ref={register}
									/>
								</div>
									<div className='new-line'/>
								 <div>
								      <div className="row mt-5 mb-5">
										<div className="col-12">
										  <button
											type="submit"
											value="save" name="save"
											className="mr-5 btn complete-button">
											Add{" "}
										  </button>
											<span className="text-purple font-weight-bold" onClick={addItem} >Cancel</span>
										</div>
									  </div>
							  </div>
							</form>
							</div>)}
								<div className="row mt-5">
								  <div className="col-12">
										<div className="form-group">
											<form onSubmit={handleSubmit(minimumBudget)}>
												<label>Calculate payable Bill for target monthly budget</label>
												<input type='number' name='budget_value'  ref={register} mode="decimal"  />
												<button type="submit" value="save" name="save" className="back-button">
												Calculate{" "}
												</button>
												 <span className="optional ml-auto"> Example:2520</span>
											</form>
										</div>
								  </div>
									{budgetFlag &&(
											<div>
												<div className="col-12">
												<div>
													<DataTable value={budgetArray}>
													<Column header="id" type= 'number' field="id"/>
													<Column header="description" field="description" />
													<Column header="category" field="category" />
													<Column header="amount" field="amount" />
													<Column header="date"  field="date" />
													<Column body={actionBodyTemplate}/>
													<Column body={removeBodyTemplate}/>
												  </DataTable>
												</div>
											  </div>
										</div>
									)}
									<div className="row mt-5">
									  <div className="col-12">
											<div className="form-group">
													<label>Create time-series chart </label>
													<button type="submit" value="save" name="save" className="back-button" onClick={graphDisplay}>
													 Display Graph{" "}
													</button>
											</div>
										  {
										  	graphFlag &&(
										  		<div>
													 <GraphComponent  billingData={billingStateData} dataLength={billingStateDataLength} status={true} />
												</div>
											)
										  }
									  </div>
								  </div>
								</div>
			</section>
		</React.Fragment>
	)
};
export default DataTableContainer