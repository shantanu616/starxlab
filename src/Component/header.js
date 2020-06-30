import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {LOGOUT} from '../url';
import axios from 'axios';
class Header extends React.Component{
    state={
        login_status:true,isLoading:false
    }
     logoutHandler=()=>{
        $('#error_msg').html('');
        const HEADER = {
            headers: {
             'Content-Type': 'application/json;charset=UTF-8',
             'Accept':'application/json',
             'Authorization':"Bearer " + localStorage.getItem('thinkbridge_token'),
            }
            };
        axios.post(LOGOUT,{},HEADER).then((res)=>{
            if(res.data.success==3)
            {

            } 
            else if(res.data.success==1)
            {
               this.setState({isLoading:false})
               localStorage.clear();
                //this.props.history.replace('/')
                window.location.reload('/')
            }
            else if(res.data.success==2)
            {
                $('#error_msg').html(res.data.msg)
            }
        }).catch((error)=>{

        }) 
     }
  	render()
  	{
  	return(
          <header>
              <div class="shadow-sm ">
                  <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'rgb(240, 245, 251)'}}>
                    <Link class="navbar-brand" to="/"><img src="images/logo.png" width="100" height="50" alt=""/></Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav mr-auto">
                          <form class="form-inline my-2 my-lg-0">
                          </form>
                      </ul>
                          <div class="dropdown">
                            <a class="nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{cursor:'pointer'}}>
                              {localStorage.getItem('name')}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a id="job_title_0" class="dropdown-item nav-link disabled" href="javascript:" onClick={this.logoutHandler}>Logout</a>
                            </div>
                          </div>
                     
                    </div>
                  </nav>
              </div>
          </header>)
  	}
}
export default Header