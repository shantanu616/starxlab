import React from 'react'
const InputBox=(props)=>
{
		return(<input {...props}/>)
}


InputBox.defaultProps = {
  placeholder: "Placeholder",
  type:'input',
  name: "name",
  id:'id',
  required:true,
  class:'None'
};


export default InputBox