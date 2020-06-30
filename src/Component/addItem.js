import React,{useState,useEffect} from 'react'
import LoadingGif from './Loader/main_loader'
import InputBox from './InputBox';
import Button from './button';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import {HEADER,CREATEINVENTORY} from '../url'
import cogoToast from 'cogo-toast';
import TextArea from './textarea';
import Loader from './Loader/main_loader';
const AddItem=(props)=>{
const [btn_disabled,changeBtnDisabled]=useState(false);
const [image_url,changeImageUrl]=useState('');
const [isLoading,changeIsLoading]=useState(false)
const [loading_msg,changeLoadingMsg]=useState("Please Wait")
const handleChange=(event)=> changeImageUrl(event.target.files)
const submitHandler=(e)=>{
	changeBtnDisabled(true)
	changeIsLoading(false)
	changeImageUrl('');
	let name=e.target.name.value.trim();
	let description=e.target.description.value.trim();
	let price=e.target.price.value.trim();
	if(name=="" || description=="" || price=="")
	{
		cogoToast.error("All Fields Must Be Filled")
	}
	changeLoadingMsg("Please Wait While We Are Adding Your Item")
	let formData=new FormData();
    formData.append('name',name);
    formData.append('description',description);
    formData.append('price',price);
    formData.append('file',image_url[0]);
	axios.post(CREATEINVENTORY,formData,HEADER).then((res)=>{
		if(res.data.success==1)
		{
			changeBtnDisabled(false);
			cogoToast.success(res.data.msg)
			setTimeout(()=>{changeLoadingMsg("Please Wait");props.history.push('/')},1000);
		}
		else
		{
			changeIsLoading(true)
			changeBtnDisabled(false)
		}
	}).catch((error)=>{
		changeBtnDisabled(false)
	})
 }
 useEffect(()=>{
 	setTimeout(()=>changeIsLoading(true),1000)
 },[])
 if(isLoading)
 {
	 return(<section class="wrapper">
	            <div class="container  p-5 ">
	              <div class="row justify-content-md-between">
	                <div class="col-md-6" ><h1 style={{color:'#4f699d'}}>Add New Record</h1></div>
	                <div class="col-md-6">
	                  <form class="" onSubmit={submitHandler} >
	                      <div class="form-group">
	                        <label for="name">Item Name</label>
	                        <InputBox type="text" placeholder="Item Name" name="name" id="name" class="form-control" required={true}/>
	                      </div>
	                      <div class="form-group">
	                        <label for="description">Item Description</label>
	                        <TextArea class="form-control" id="description" name="description" placeholder="Item Description" required={true}/>
	                      </div>
	                      <div class="form-group">
	                        <label for="price">Price(in rupees)</label>
	                        <InputBox type="text" placeholder="Price" name="price" id="price" class="form-control" required={true}/>
	                      </div>
	                       <div class="form-group">
	                        <label for="price">Upload Image</label>
	                          <input type="file" onChange={handleChange} accept="image/*" required/>
	        				  {image_url && [...image_url].map((file)=>(
                              <img src="" class="mt-2"   src={URL.createObjectURL(file)} alt="" />   ))}
	                      </div>
	                      <Button type="submit" disabled={btn_disabled}/>
	                  </form>
	                </div>
	              </div>
	            </div>
	        </section>)
  }
  else
  {
  	return(<Loader message={loading_msg}/>)
  }
}
export default AddItem;