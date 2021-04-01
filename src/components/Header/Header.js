import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from "react-router-dom";
import loginImage from '../../icons/avatarFace.png';
import './Header.css';
const Header = () => {
  let parsedFreshGroceryUser={};
if(localStorage.getItem('freshGroceryUser')===null){
    const newUser={};
    localStorage.setItem('freshGroceryUser',JSON.stringify(newUser));
}

else{
  const getUserInfo=localStorage.getItem('freshGroceryUser');
  const parsedGetUserInfo=JSON.parse(getUserInfo);
  parsedFreshGroceryUser.name=parsedGetUserInfo.name;
  parsedFreshGroceryUser.email=parsedGetUserInfo.email;
  parsedFreshGroceryUser.isSignedIn=parsedGetUserInfo.isSignedIn;
  
}


const handleLogOut=()=>{
const loggedOutUserInfo={};
localStorage.setItem('freshGroceryUser',JSON.stringify(loggedOutUserInfo));
window.location.reload();
}
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link to="/"><a className="navbar-brand" href="#">FreshGrocery</a></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
      <Link style={{textDecoration:'none'}} to="/"><li className="nav-item">
          <a className="nav-link" href="#">Home</a>
        </li></Link>

        <Link style={{textDecoration:'none'}} to={'/orderhistory'}><li className="nav-item">
          <a className="nav-link" href="#">Orders</a>
        </li></Link>
        <Link style={{textDecoration:'none'}} to="/admin"><li className="nav-item">
          <a className="nav-link" href="#">Admin</a>
        </li></Link>
        <li className="nav-item">
          <a className="nav-link" href="#">Deals</a>
        </li>
        {
          parsedFreshGroceryUser.isSignedIn?<img onClick={handleLogOut} className="avatar-face" src={loginImage} alt=""/>:<Link style={{textDecoration:'none'}} to="/login"><Button variant="contained" color="secondary">Login</Button></Link>
        }
        
      </ul>
    </div>
  </div>
</nav>
    );
};

export default Header;