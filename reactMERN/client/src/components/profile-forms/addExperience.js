import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const addExperience = ({ addExperience, history}) => {
    const [formData, setFormData] = useState({
        company:'',
        title:'',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });


  return (<Fragment>
      <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
      }}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e=> onChange(e)} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={e=> onChange(e)} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=> onChange(e)} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" />
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e=>{
           setFormData({ ...formData, current: !current})
           toggleDisabled(!toDateDisabled);
           }} />{" "} Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e=> onChange(e)} disabled = {toDateDisabled ? 'disabled' : ''} />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" value={description} onChange={e=> onChange(e)}/>
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
  </Fragment>
  )};

addExperience.propTypes = {
  addExperience: PropTypes.func.isRequired //because it is a func
};

export default connect(
  null,
  { addExperience }
)(withRouter(addExperience));
//use null when not sending mapStateToProps
// 2nd value is action

/* 1) actions
	A. TYPES -> UPDATE_PROFILE
	b. profile actions -> add experience method & add education method
2) reducers
	a. add type to top array of import
	b. add case update profile
3) components
	profile components folder
	a. add two component files: addExperience/addEducation
	b. used racfp to set up boilerplate
	c. update export default at bottom to include connect() and action
	d. add mapstatetoprops and update propTypes to include proptypes
	e. copy in html
	f. include useState in import to use as hook
	g. include useState to set state values
	h. updated from to include on change and values
	i. update 'props' value in addExperience method to props used
	j. add onSubmit func to form tag on top
4) added new components to app.js routes*/
