import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
function Nav() {
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">

        <img src={logo} alt="Logo"/>

          <div className="col-auto px-5">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/students">Student</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/fee">Student Fee</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teachers">Teachers</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/classes">Class</Link>
                </li>
                
              </ul>
            </div>
      <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
       </nav>
    </div>
    </>
  );
}

export default Nav;
