import React, { Component } from 'react';
import Header from './Component/header';
import Footer from './Component/footer';
import routes from './routes';
import Parent from './Component/Parent'
import {Route,Switch} from "react-router-dom";
import axios from 'axios';
import Loader from './Component/Loader/main_loader';
import Authentication from './Container/Authentication/Authentication'
 class App extends Component
 { 
  state={isLoading:false,resultList:[],edit:false,editId:0,finalData:[]}
      componentDidMount()
      {
        if(localStorage.getItem("starxlab_data")!=null)
        {
          let data=JSON.parse(localStorage.getItem("starxlab_data"));
          this.setState({resultList:data},function()
          {
            this.setState({isLoading:true})
          })
        }
        else
        {
          this.setState({isLoading:true})
        }
      }
      submitHandler=(e)=>{
      e.preventDefault();
      let task=e.target.task.value.trim();
      if(task=="")
      {
        alert("Task must be filled");
        return false;
      }
      let {resultList}=this.state;
      this.setState({resultList:[...resultList,{"name":task,"id":resultList.length+1}]},function(){
        localStorage.setItem("starxlab_data",JSON.stringify(this.state.resultList))
      });

    }
    dropHandler=(id)=>{
        const {resultList}=this.state;
        const filteredData=resultList.filter((res)=>res.id!=id);
        this.setState({resultList:filteredData},function(){
          localStorage.setItem("starxlab_data",JSON.stringify(this.state.resultList))
        })
    }

    _onChange=(e)=>{
      //this.setState({resultList:[...resultList,]});
      const {resultList,editId}=this.state;
      let task_name=e.target.value.trim()
      // console.log(task_name+"-----"+editId+1)
      let new_array = resultList.map(element => element.id == editId+1 ? {...element, "name" :task_name } : element);
      this.setState({finalData:new_array})
      
    }
  render() 
  {
    const {isLoading,resultList,edit,editId,finalData}=this.state
    console.log(resultList)
    if(isLoading)
    {
    return(
      <div class="container">
        {!edit && <Parent>
          <form onSubmit={this.submitHandler}>
            <div class="row">
                <input type="text" name="task" required/>
                <button class="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
          <div class="row">
            <ul>
              {resultList.length>0 && resultList.map((res,key)=>{
                return(<li key={key}>
                    {res.name}
                 <span>
                  <i class="fa fa-edit p-2" ></i>
                  <i class="fa fa-trash p-2" onClick={()=>this.dropHandler(res.id)}></i>
                  </span>
                </li>)
              })}
            </ul>
          </div>
        </Parent>}
        {edit && <form>
            <div class="row">
                <input type="text" name="edit_task" value={resultList[editId].name} onChange={(e)=>this._onChange(e)}  required/>
                <button class="btn btn-primary" type="button" onClick={()=>this.setState({resultList:finalData,edit:false})}>Save</button>
                <button class="btn btn-primary" type="button" onClick={()=>this.setState({edit:false})}>Cancel</button>
            </div>
          </form>}
      </div>
    );
    }
    else
    {
      return(<Loader />)
    }
  }
}

export default App;

// onClick={()=>this.setState({edit:true,editId:res.id-1})}

        // <Parent>
        //   <Header {...this.props}  />
        //   <div class="container">
        //      <Switch>
        //         {routes.map((route,idx)=>{
        //           return(route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
        //                 <route.component {...props} />
        //               )} />)
        //               : (null))
        //         })}
        //       </Switch>
        //   </div>
        //   <Footer/>
        // </Parent>