import React from 'react'
import { useState } from 'react'
import { Button,  FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTodo = () => {
    const [title, setTitle] = useState("")
    const [status,setStatus] = useState("")
    const [tag,setTag] = useState("")
    const navigate =useNavigate()

    // Add new Task
    const addTodo =(title,status,tag) => {
        const data = {
          title,
          status,
          tag
        }
        fetch('http://localhost:8080/addTask',{
          method:'POST',
          body:JSON.stringify(data),
          headers:{
            "content-Type":"application/json"
          }
        }).then(res => res.json())
        .then(res => {
          if(res.responce == 'error'){
            alert(res.message)
          }else{
            alert(res.message)
          }
        }).catch(err => console.log(err))
      }
      const nvaigateTodo =() => {
        navigate('/todo')
      }
  return (
    <div>
      <h1>Add Tasks</h1>
      <hr />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
      <div>
      <TextField style={{width:"70%",marginTop:"50px"}} value={title} onChange={(e) => setTitle(e.target.value)} label="Title" placeholder='Title' variant="outlined"></TextField>
      </div>
      <div style={{textAlign:"left"}}>
        <h4>Status</h4>
      <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel onChange={(e) => setStatus(e.target.value)} value="pending" control={<Radio style={{color:"green"}} />} label="Pending" />
            <FormControlLabel onChange={(e) => setStatus(e.target.value)} value="done" control={<Radio    style={{color:"green"}} />} label="Done" />
          </RadioGroup>
      </div>
          <div style={{textAlign:"left"}}>
          <h4>Tags</h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel onChange={(e) => setTag(e.target.value)} value="official" control={<Radio style={{color:"green"}} />} label="Official" />
            <FormControlLabel onChange={(e) => setTag(e.target.value)} value="personal" control={<Radio style={{color:"green"}}  />} label="Personal" />
            <FormControlLabel onChange={(e) => setTag(e.target.value)} value="family" control={<Radio   style={{color:"green"}} />} label="Family" />
          </RadioGroup>
          </div>
      </div>
      <br />
      <Button style={{margin:"auto",width:"300px", color:"white",backgroundColor:"darkgreen"}} variant="contained" onClick={()=> {addTodo(title,status,tag)}}>Add</Button> <br />
      <Button style={{margin:"auto",width:"300px", color:"white",backgroundColor:"darkgreen"}} variant="contained" onClick={()=> {nvaigateTodo()}}>Todo List</Button>
    </div>
  )
}

export default AddTodo
