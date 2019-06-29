import React, { Fragment, useState } from "react";
//import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        
        email: '',
        password:'',
       
    });

    const { email, password} = formData;

   const onchange = e => setFormData({
       ...formData,[e.target.name]: e.target.value
   });

   const onSubmit = async e => {
       e.preventDefault();
      
            console.error('SUCCESS');
       }
   

  return 
  <Fragment> 
      <section>
      <h1 classname="large text-primary">Sign In</h1>
  <p classname="lead"><i classname="fas fa-user"></i> Sign Into Your Account</p>
  <form classname="form" onSubmit={e => onSubmit(e)}>
    
    <
    <div classname="form-group">
      <input
        type="password"
        placeholder="Password"
        name="password"
        minLength="6"
        value={password} 
        onChange={e => onChange(e)} 
        required
      />
    </div>
    
    <input type="submit" classname="btn btn-primary" value="Register" />
  </form>
  <p classname="my-1">
    Dont' Already have an account? <Link to="/register">Sign Up</Link>
  </p>
</section></Fragment>;
};

export default Login;
