import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,HashRouter,Route} from "react-router-dom";
import App from './App';
import ScrollToTop from './Container/scrolltotop'
import axios from 'axios';
class MainContainer extends React.Component
{
	componentDidMount()
	{
		// if(localStorage.getItem('starxlab_data')==null)
		// {
		//   localStorage.clear();
		//   localStorage.setItem('starxlab_data',);

		// }
   }
	render()
	{
		return(
	    <HashRouter >
	      <ScrollToTop />
	      <Switch>
		      <Route path="/" component={App}/>
	      </Switch>
	    </HashRouter>)
    }
 }
ReactDOM.render( <MainContainer />,document.getElementById('root'));