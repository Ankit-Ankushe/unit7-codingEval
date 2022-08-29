import React from 'react'
import { useState } from 'react'
import { Button,  FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Todo = () => {
  const [data,setData] = useState([])
  const [qstatus,setQstatus] = useState('')
  const [qtag,setQtag] = useState('')
  const navigate = useNavigate()


    useEffect(() => {
      getData()
    },[qstatus,qtag])


// get all tasks
    const getData = () => {
      if(qstatus && qtag){
        fetch(`http://localhost:8080/task?status=${qstatus}&tag=${qtag}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setData(res)
        })
        .catch(err => console.log(err))
      }else if(qtag){
        fetch(`http://localhost:8080/task?status=${qtag}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setData(res)
        })
        .catch(err => console.log(err))
      }else if(qstatus){
        fetch(`http://localhost:8080/task?status=${qstatus}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setData(res)
        })
        .catch(err => console.log(err))
      }else if(!qstatus && !qtag){
        fetch('http://localhost:8080/task')
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setData(res)
        })
        .catch(err => console.log(err))
        }
      }
    



    // delete Todo
    const deleteTodo = (id) => {
      fetch(`http://localhost:8080/task/${id}`,{
        method:'DELETE'
      }).then(res => res.json())
      .then(res => {
        if(res.responce == 'error'){
          alert(res.message)
        }else{
          alert(res.message)
        }
        getData()
      })
    }

    // update Todo
    const updateTodo = (id) => {
      navigate(`/todo/${id}`)
      getData()
    }
  return (
    <div>
      <h2>List of tasks</h2>
      <hr />
        <h2>Filter</h2>
      <div style={{display:'flex',justifyContent:'space-around'}}>
      <Button  variant="contained"  style={{height:"30px", color:"white",backgroundColor:"blue",marginTop:"6px"}} onClick={() => setQstatus('pending')}> <h4>Pending</h4></Button>
      <Button  variant="contained"  style={{height:"30px", color:"white",backgroundColor:"blue",marginTop:"6px"}} onClick={() => setQstatus('done')}> <h4>Done</h4></Button>
      <Button  variant="contained"  style={{height:"30px", color:"white",backgroundColor:"blue",marginTop:"6px"}} onClick={() => setQtag('office')}> <h4>Official</h4></Button>
      <Button  variant="contained"  style={{height:"30px", color:"white",backgroundColor:"blue",marginTop:"6px"}} onClick={() => setQtag('personal')}> <h4>Personal</h4></Button>
      <Button  variant="contained"  style={{height:"30px", color:"white",backgroundColor:"blue",marginTop:"6px"}} onClick={() => setQtag('family')}> <h4>Family</h4></Button>
      </div>
      <hr />
      <br />
      <br />
      {
        data?.map((el) => (
          <div style={{border:"1px solid #cecece" , display:"flex" , justifyContent:"space-around",width:"80%",margin:"20px auto"}}>
            <h2 style={{ color:"purple"}}>{el.title}</h2>
            <h2 style={{ color:"purple"}}>{el.status}</h2>
            <h2 style={{ color:"purple"}}>{el.tag}</h2>
            <Button  variant="contained"  style={{height:"50px", color:"white",backgroundColor:"darkgreen",marginTop:"6px"}} onClick={() => updateTodo(el._id)}> <h4>UPDATE</h4></Button>
            <Button  variant="contained"  style={{height:"50px", color:"white",backgroundColor:"darkgreen",marginTop:"6px"}} onClick={() => deleteTodo(el._id)}> <h4>DELETE</h4></Button>
          </div>
        ))
      }
    </div>
  )
}

export default Todo
