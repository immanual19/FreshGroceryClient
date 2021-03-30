import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const CheckoutProduct = () => {
    const classes = useStyles();
    const {pdId}=useParams();
    const [singleProduct,setSingleProduct]=useState([]);
    useEffect(()=>{
        const url=`http://localhost:8080/singleproduct/${pdId}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setSingleProduct(data))
    },[])

    const {name,price}=singleProduct;

    const processOrder=()=>{
      const userFromLocalStorage=JSON.parse(localStorage.getItem('freshGroceryUser'));
      const orderInfo={customerName:userFromLocalStorage.name,customerEmail:userFromLocalStorage.email,productName:name,productPrice:price, dateOrdered: new Date()
    };

    fetch('http://localhost:8080/processorder',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(orderInfo)
    })
    console.log("Order Summary is: ",orderInfo);
  }
    return (
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              
              <TableCell align="left">{name}</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">{price}</TableCell>
            </TableRow>
            
        </TableBody>
      </Table>
      <Button onClick={processOrder}>Checkout</Button>
    </TableContainer>
    );
}
export default CheckoutProduct;