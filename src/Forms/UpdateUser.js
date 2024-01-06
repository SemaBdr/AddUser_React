import React, { useState } from 'react';
import UserConsumer from '../context';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        department: "",
        salary: "", 
        error: false
    });

    const changeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const validateForm = () => {
        const { name, salary, department } = user;
        const hasError = name === "" || salary === "" || department === "";
        
        setUser(prevUser => ({
            ...prevUser,
            error: hasError
        }));
    
        return !hasError;
    };

    const updateUser = async(dispatch,e) => {
        e.preventDefault();
        const{name, salary, department}=user;
        const updatedUser={
            name, salary, department
        };
        if (!validateForm()) {
            return;
        }
       const response= await axios.put(`http://localhost:3004/users/${id}`, updatedUser);
       dispatch({type:"UPDATE_USER", payload: response.data})
        navigate("/");
        
    } 
        return  <UserConsumer>
            {
            value => {
                const{dispatch}=value;
                return(
                        <div className="col-md-8 mb-4">                                           
                                <div className='card'>
                                    <div className="card-header">
                                        <h4 >
                                            Update User From
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
                                                        onChange={changeInput} 
                                                        />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="salary">Salary </label>
                                                    <input type="text"
                                                        name="salary"
                                                        id="salary"
                                                        placeholder="Enter Salary"
                                                        className="form-control"
                                                        value={user.salary}
                                                        onChange={changeInput}/>
                                                </div>
                                                <button className='btn btn-danger btn-block' onClick={(e)=>updateUser(dispatch, e)}>Update User</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                          
                        </div>                 
                )
            }
          }
        </UserConsumer> 
}

export default UpdateUser;
