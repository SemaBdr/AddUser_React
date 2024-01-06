import React, { useState } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//var uniqid = require('uniqid');

const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: { display: "block" }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }

});

function AddUser(){
    
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState({
        name: '',
        department: '',
        salary: '',
        error: false
    });
    const validateForm = () => {
        const { name, salary, department } = user;
        const hasError = name === "" || salary === "" || department === "";
        
        setUser(prevUser => ({
            ...prevUser,
            error: hasError
        }));
    
        return !hasError;
    };
    const changeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
   const  addUser = async(dispatch,e) => {
        e.preventDefault();
        const { name, salary, department } = user;
        const newUser = {
           // id: uniqid(),
            name,
            salary,
            department
        }
        if (!validateForm()) {
            return;
        }
        const response= await axios.post("http://localhost:3004/users", newUser);
        dispatch({ type: "ADD_USER", payload: response.data });     
        //redirect
        navigate("/");
    }
    const toggleVisibility = () => {
        setVisible(!visible);
    };
        return <UserConsumer>
            {
                value => {
                    const{dispatch}=value;
                    return (
                        <div className="col-md-8 mb-4">
                            <button onClick={toggleVisibility} className="btn btn-dark btn-block mb-2">{
                                visible ? "Hide Form" : "Show Form"
                            }</button>
                            <Animation pose={visible ? 'visible' : 'hidden'}>
                                <div className='card'>
                                    <div className="card-header">
                                        <h4 >
                                            Add User From
                                        </h4>

                                        <div className="card-body">
                                            {
                                                user.error ?
                                                <div className='alert alert-danger'>
                                                    Please, check your information
                                                </div> 
                                                :
                                                 null
                                            }
                                            <form >
                                                <div className="form-group">
                                                    <label htmlFor="name">Name </label>
                                                    <input type="text"
                                                        name="name"
                                                        id="id"
                                                        placeholder="Enter Name"
                                                        className="form-control"
                                                        value={user.name}
                                                        onChange={changeInput}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="department">Department </label>
                                                    <input type="text"
                                                        name="department"
                                                        id="department"
                                                        placeholder="Enter Department"
                                                        className="form-control"
                                                        value={user.department}
                                                        onChange={changeInput} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="salary">Salary </label>
                                                    <input type="text"
                                                        name="salary"
                                                        id="salary"
                                                        placeholder="Enter Salary"
                                                        className="form-control"
                                                        value={user.salary}
                                                        onChange={changeInput} />
                                                </div>
                                                <button className='btn btn-danger btn-block' onClick={(e)=>addUser(dispatch, e)}>Add User</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Animation>
                        </div>

                    )


                }
            }
        </UserConsumer>

    
}

export default AddUser;
