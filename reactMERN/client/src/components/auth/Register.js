import React, { Fragment, useState } from "react";
//import axios from 'axios';
import {Link} from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2: ''
    });

    const { name, email, password, password2} = formData;

   const onchange = e => setFormData({
       ...formData,[e.target.name]: e.target.value
   });

   const onSubmit = async e => {
       e.preventDefault();
       if(password !== password2){
        console.log('Passwords do not match');
       } else {
           //console.log(formData);
        //    const newUser = {
        //        name,
        //        email,
        //        password
        //    }

        //    try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }

        //     const body = JSON.stringify(newUser);

        //     const res = await axios.post('/api/users', body, config);
        //     console.log(res.data);
           }catch(err){
            console.error(err.response.data);
           }
       }
   }

  return 
  <Fragment> 
      <h1 classname="large text-primary">Sign Up</h1>
  <p classname="lead"><i classname="fas fa-user"></i> Create Your Account</p>
  <form classname="form" onSubmit={e => onSubmit(e)}>
    <div classname="form-group">
      <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
    </div>
    <div classname="form-group">
      <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
      <small classname="form-text"
        >This site uses Gravatar so if you want a profile image, use a
        Gravatar email</small
      >
    </div>
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
    <div classname="form-group">
      <input
        type="password"
        placeholder="Confirm Password"
        name="password2"
        minLength="6"
        value={password2} 
        onChange={e => onChange(e)}
        required
      />
    </div>
    <input type="submit" classname="btn btn-primary" value="Register" />
  </form>
  <p classname="my-1">
    Already have an account? <Link to="/login">Sign In</Link>
  </p>
</section></Fragment>;
};

export default Register;
