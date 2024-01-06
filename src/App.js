
import { Component } from "react";
import Navbar from "./Layout/Navbar";
import Users from "./components/Users";
import AddUser from "./Forms/AddUser";
import UpdateUser from "./Forms/UpdateUser";
import React from "react";
import NotFound from "./Pages/NotFound";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Contribute from "./Pages/Contribute";


class App extends Component {

  render() {
    return (
      <Router>
        <Navbar title=" User App"></Navbar>
        <hr/>
        <Routes>       
          <Route
            path="/"
            element={<Users/>} 
          />
          <Route
            path="/add"
            element={<AddUser />} 
          />
          <Route
            path="/github"
            element={<Contribute />} 
          />
          <Route
            path="/edit/:id"
            element={<UpdateUser />} 
          />
           <Route 
           path="*"          
            element={<NotFound/>} 
          />
       </Routes>
      </Router>
    );
  }
}
export default App;
