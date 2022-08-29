import React from 'react'
import { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'



const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    
    const navigate = useNavigate()


    function handleRegister(name, email, password) {
        const data = {
            name,
            email,
            password
        }
        fetch('http://localhost:8080/register', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((res) => {
                if(res.responce == 'error'){
                    alert(res.message)
                }
                alert(res.message)
                navigate('/login');
                
            })
            .catch((err) => console.log("error in fetch"))
    }


    return (
        <div className="modal">
            <h1>Register</h1>
            <TextField className='text' value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic"  label="Name" variant="outlined" />
            <br />
            <br />
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
            <br />
            <br />
            <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
            <br />
            <br />
            <Button className="handle_button" onClick={() => handleRegister(name, email, password)} variant="contained" >SIGNUP</Button>
        </div>
    )
}

export default Register
