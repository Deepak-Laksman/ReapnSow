import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchTitle, setSearchTitle] = useState("");
  const logoutHandler = () => {
    localStorage.clear();
    window.location = "/";
  }
  return (
    <nav className="navbar navbar-expand-md navbar-dark mb-4" style = {{ backgroundColor: "white" }}>
      <a className="navbar-brand">
        <Link to = "/" className="navbar-brand mb-0 h1 text-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-steps" viewBox="0 0 16 16">
            <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
            </svg>
            <b>       Reap n Sow</b>
        </Link>
      </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav mr-auto">
            {
              user === null
                ? null
                : (
                  <>
                    <li className = "nav-item">
                      <Link to = "/ask" className = "nav-link text-dark">Ask Question</Link>
                    </li>
                    <li className = "nav-item">
                      <Link to = "/myquestions" className = "nav-link text-dark">My Questions</Link>
                    </li>
                  </>
                )
            }
      </ul>
    <form className="form-inline mt-2 mt-md-0">
      <input 
      className = "form-control mr-sm-2"
                type = "text" 
                value = {searchTitle} 
                onChange = {(e) => {
                  e.preventDefault();
                  setSearchTitle(e.target.value);
                }} 
                placeholder = {searchTitle}
                aria-label = "Search" />
        <Link to = "/search" state = {searchTitle} className = "nav-btn">
              <button className = "btn btn-outline-dark my-2 my-sm-0" type = "submit">Search</button>        
        </Link>
    </form>
    {user 
      ? 
        <div className = "ml-2 mt-2 mt-md-0">
          <button className = "btn btn-outline-dark my-2 my-sm-0" onClick = {logoutHandler}>Logout</button>        
        </div>
      :   
        <div className = "mt-2 mt-md-0">
          <Link to = "/login" className = "nav-link"><button className = "btn btn-outline-dark my-2 my-sm-0">Login</button></Link>      
        </div>
    }
  </div>
</nav>
  );
}

export default Navbar;