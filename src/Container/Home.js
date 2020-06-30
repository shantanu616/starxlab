import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {GETORDELETEDATA,HEADER,GETINVENTORYLIST} from '../url';
import axios from 'axios';
import Loader from '../Component/Loader/main_loader';
import cogoToast from 'cogo-toast';
const Home=(props)=>
{
   const [isLoading,changeIsLoading]=useState(false)
   const [inventoryList,changeInventoryList]=useState([])
   const [loading_msg,changeLoadingMsg]=useState("Please Wait")
   useEffect(()=>{
    getData()
   },[])
   const getData=()=>{
    axios.get(GETINVENTORYLIST,HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          changeInventoryList(response)
          setTimeout(()=>changeIsLoading(true),1000)
        }
    }).catch((error)=>{

    })
   }
   const deleteHandler=(id)=>{
    axios.delete(`${GETORDELETEDATA}/${id}`,HEADER).then((res)=>{
        if(res.data.success==1)
        {
          cogoToast.success(res.data.msg);
          getData();
        }
    }).catch((error)=>{

    })
   }
    if(isLoading)
    {
      	return(<section class="wrapper">
              <div class="row mt-3 d-flex justify-content-end">
                  <button class="btn btn-primary float-right mt-2" onClick={()=>props.history.push('/additem')}>Add <i class="fa fa-plus"></i></button>
              </div>
              <div class="row p-5">
              {inventoryList.length>0?inventoryList.map((res,key)=>{
                return(<div class="col-12 col-sm-8 col-md-6 col-lg-4 mt-2" key={key} >
                <div class="card">
                  <div class="card-body">
                    <img class="float-right round_card_img" src={res.image_url} height="70px" width="70px" />
                    <h4 class="card-title">{res.name}</h4>
                    <p class="card-text">Rs. {res.price}</p>
                    <div class="dwn">
                    <i class="fa fa-eye" onClick={()=>props.history.push(`/description/${(res.name.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,'')).toLowerCase()}/${res.id}`)}></i>
                      <i class="fa fa-trash" onClick={()=>deleteHandler(res.id)} ></i>
                    </div>
                  </div>
                </div>
              </div>)
              }):<h3>No result Found</h3>
            }
            </div>
              </section>)
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
	}
export default Home