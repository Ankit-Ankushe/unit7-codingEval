import React from 'react'
import { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (email, password) => {
    const data = {
      email,
      password
    }
    fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-Type": "application/json"
      }
    }).then((res) => res.json())
      .then((res) => {
        if(res.token){
          alert(res.message);
          navigate('/addTodo')
        }
        if (res.responce == 'error') {
          alert(res.message)
        }
        else {
          alert(res.message)
        }
      })
      .catch((err) => console.log("error in fetch"))
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" /><br /><br />
      <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" /> <br /><br />
      <Button className='button' onClick={() => handleLogin(email, password)} variant="contained">LOGIN</Button> <br /><br />
    </div>
  )
}

export default Login
