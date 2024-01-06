import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context'; // Assuming you have a UserContext for the context API
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = ({ id, name, department, salary }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { dispatch } = useContext(UserContext);

  const onClickEvent = () => {
    setIsVisible(!isVisible);
  };

  const onDeleteUser = async () => {
    // Delete Request
    await axios.delete(`http://localhost:3004/users/${id}`);
    // Consumer Dispatch
    dispatch({ type: "DELETE_USER", payload: id });
  };

  return (
    <div className="col-md-8 mb-4">
      <div className="card" style={isVisible ? { backgroundColor: "#4674a9", color: "white" } : null}>
        <div className="card-header d-flex justify-content-betweeen">
          <h4 className='d-inline' onClick={onClickEvent}>{name}</h4>
          <i onClick={onDeleteUser} className='fa-solid fa-trash' style={{ cursor: "pointer", marginLeft: "auto" }}></i>
        </div>
        {
          isVisible ? <div className="card-body">
            <p className="card-text">Salary: {salary}</p>
            <p className="card-text">Department: {department}</p>
            <Link to={`edit/${id}`} className='btn btn-dark btn-block'>Update User</Link>
          </div> : null
        }
      </div>
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default User;