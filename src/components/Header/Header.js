import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from "react-router-dom";
import loginImage from '../../icons/avatarFace.png';
import './Header.css';
const Header = () => {
  let parsedFreshGroceryUser={name:'',email:'',isSignedIn:false};
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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">FreshGrocery</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Admin</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Deals</a>
        </li>
        {
          parsedFreshGroceryUser.isSignedIn?<img onClick={handleLogOut} className="avatar-face" src={loginImage} alt=""/>:<Link to="/login"><Button variant="contained" color="secondary">Login</Button></Link>
        }
        
      </ul>
    </div>
  </div>
</nav>
    );
};

export default Header;