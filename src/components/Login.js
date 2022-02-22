import React from "react";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { getAdmin } from "../features/admin"


function Login(props) {
    const dispatch = useDispatch()  
    const user = useSelector((state) => state.admin.admin)

    const [usernameInput, setUserNameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        dispatch(getAdmin());
    }, [])
    

    //Check user
    function checkuser(props){
        if(user[0].username === usernameInput && user[0].password === passwordInput){
            console.log("valid password")
            setLogged(true)
        }else{
            console.log("invalid password")
            setLogged(false)
        }
    }

  return (
      <>
      <h1 className="heading">Bodega</h1>
    <div className="container">
      <div className="row d-flex justify-content-center align-self-center">
        <div className="col-11 col-md-6 login">
          <div className="mb-3">
              <h2>Login</h2>
            <label for="exampleFormControlInput1" className="form-label">
              usario
            </label>
            <input
              type="test"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="nombre"
              onChange={(e) => {setUserNameInput(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              contraseña
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="contraseña"
              onChange={(e) => {setPasswordInput(e.target.value)}}
            />
            <button type="button" class="btn btn-outline-secondary mt-4" 
            onClick={() => {
            checkuser();
            props.userlogged(logged)
            }}>login</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
