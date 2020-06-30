import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {GETORDELETEDATA,HEADER} from '../url';
import axios from 'axios';
import Loader from '../Component/Loader/main_loader';
import Parent from './Parent';
import NotFound from './not_found/not_found'
const ItemDetails=(props)=>
{
   const [isLoading,changeIsLoading]=useState(false)
   const [inventoryList,changeInventoryList]=useState({});
   const [notFound,changeNotFound]=useState(false);
   const [loading_msg,changeLoadingMsg]=useState("Please Wait")
   const getData=(id)=>{
    axios.get(`${GETORDELETEDATA}/${id}`,HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          changeInventoryList(response)
          changeNotFound(false);
          setTimeout(()=>changeIsLoading(true),1000)
        }
        else
        {
          changeNotFound(true);
          setTimeout(()=>changeIsLoading(true),1000)
        }
    }).catch((error)=>{

    })
   }
   useEffect(()=>{
    getData(props.match.params.id)
   },[props.match.params.id])
    if(isLoading)
    {   
        return(notFound?<NotFound/>:<Parent>
          <div class="wrapper">
            <h1 class="my-4">{inventoryList.name}
            </h1>
            <div class="row">
              <div class="col-md-8">
                <img class="img-fluid" src={inventoryList.image_url} alt=""/>
              </div>
              <div class="col-md-4">
                <h3 class="my-3">{inventoryList.name}</h3>
                <p>{inventoryList.description}</p>
                <p><h2>Price:</h2>{inventoryList.price} Rupees</p>
              </div>
            </div></div>
            </Parent>)
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
  }
export default ItemDetails

