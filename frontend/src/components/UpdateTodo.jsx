import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'


const UpdateTodo = () => {
    const [title, setTitle] = useState("")
    const [status,setStatus] = useState("")
    const [tag,setTag] = useState("")
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)
   const handleUpdate= (title,status,tag) =>{
      const data = {
        title,
        status,
        tag
      }
      fetch(`http://localhost:8080/task/${id}`,{
        method:'PATCH',
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
      })
    }

    const handleNavigate = () =>{
        navigate('/todo')
    }
  return (
    <div>
      <h1>Update Task</h1>
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
            <FormControlLabel onChange={(e) => setStatus(e.target.value)} value="pending" control={<Radio color='success'/>} label="Pending" />
            <FormControlLabel onChange={(e) => setStatus(e.target.value)} value="done" control={<Radio    color='success'/>} label="Done" />
          </RadioGroup>
      </div>
          <div style={{textAlign:"left"}}>
          <h4>Tags</h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel onChange={(e) => setTag(e.target.value)} value="official" control={<Radio color='success' />} label="Official" />
            <FormControlLabel onChange={(e) => setTag(e.target.value)} value="personal" control={<Radio color='success' />} label="Personal" />
            <FormControlLabel onChange={(e) => setTag(e.target.value)} value="family" control={<Radio   color='success'/>} label="Family" />
          </RadioGroup>
          </div>
      </div>
      <br />
      <Button style={{margin:"auto 30px",width:"300px"}} variant="contained" onClick={()=> {handleUpdate(title,status,tag)}}>UPDATE</Button>
      <Button variant="outlined" onClick={()=> {handleNavigate()}}>Go Back</Button>
    </div>
  )
}

export default UpdateTodo
