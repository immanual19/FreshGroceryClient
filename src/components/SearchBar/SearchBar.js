import { Button } from '@material-ui/core';
import React from 'react';
import './SearchBar.css';
import { useLocation } from 'react-router-dom';
const SearchBar = () => {
    let location=useLocation();
    if(location.pathname==="/"){
        return (
            <div className="search-bar">
            <form action="">
            <input className="input-box" type="search" name="" id="" size="50" placeholder="Search Book"/><Button className="search-button" variant="contained" color="primary">Search</Button>
            </form>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
    
};

export default SearchBar;