import React, { useState } from 'react';

const NavBar = (props) => {

  const [currentName,setCurrentName] = useState("");
  const handleSearchChange = (event) =>{

    setCurrentName(event.target.value);
  }

  const SearchCheck = () =>{


    props.citySearch(currentName);
  }
  const SearchCheckKey = (event) =>{
    
    if (event.key === "Enter" ) {
      
      props.citySearch(currentName);
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{backgroundColor:"navy"}}>
        <div className="container-fluid">
          <a className="navbar-brand text-light"><h3>
            Weather App</h3></a>
          <button className="navbar-toggler bg-light my-2 " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  text-primary" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
             
            </ul>
            <div className="d-flex" role="search">
              <input className="form-control me-2" onChange={handleSearchChange} onKeyUp={SearchCheckKey} type="search" placeholder="Enter City/Country" aria-label="Search" />
              <button className="btn btn-success" onClick={SearchCheck}  >Search</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
