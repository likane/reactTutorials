import React, { Fragment, useState } from "react";
//import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
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
       login(email, password);
            //console.error('SUCCESS');
       }
   
    // redirect if logged in
    if(isAuthenticated) {
      return <Redirect to="/dashboard" />;
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Login.PropTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, { login })(Login);
