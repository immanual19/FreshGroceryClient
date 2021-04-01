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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import './CheckoutProduct.css';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const CheckoutProduct = () => {
    const classes = useStyles();
    const {pdId}=useParams();
    const [singleProduct,setSingleProduct]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const userFromLocalStorage=JSON.parse(localStorage.getItem('freshGroceryUser'));
    const userName=userFromLocalStorage.name;
    useEffect(()=>{
        const url=`https://shrouded-castle-21272.herokuapp.com/singleproduct/${pdId}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setSingleProduct(data))
    },[])

    const {name,price}=singleProduct;
    
    const processOrder=()=>{
      const userFromLocalStorage=JSON.parse(localStorage.getItem('freshGroceryUser'));
      
      const orderInfo={customerName:userFromLocalStorage.name,customerEmail:userFromLocalStorage.email,productName:name,productPrice:price, dateOrdered: new Date().toString('YYYY-MM-DDTHH:mm')
    };

    fetch('https://shrouded-castle-21272.herokuapp.com/processorder',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(orderInfo)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data){
        setOrderPlaced(true);
      }
    })
    .catch(err=>{
      alert('Error. Order could not be placed');
    })
    
  }
    return (
      <div className="checkout-product">

      {
        orderPlaced && <p> Dear <span style={{color:'green'}}><i>{userName}</i></span>, your order has been placed successfully. Thank you for shopping with us.</p>
      }
      {
        !orderPlaced && <h1>Checkout</h1>
      }
      {
        orderPlaced && <h1>Your ordered item information is given below:</h1>
      }
        {
          !orderPlaced && <TableContainer component={Paper}>
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
                  <TableCell align="right">${price}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{fontWeight:'bolder'}}>Total:</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">${price}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                <Button style={{float:'right'}} onClick={processOrder} variant="contained" color="secondary">Checkout</Button>
                </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        }
        {
          orderPlaced && <TableContainer component={Paper}>
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
                  <TableCell align="right">${price}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{fontWeight:'bolder'}} align="left">Total</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">${price}</TableCell>
                </TableRow>
                <Button style={{float:'right'}} variant="contained" color="secondary"><FontAwesomeIcon style={{marginRight:'5px'}} icon={faDownload}/>Download Invoice</Button>
            </TableBody>
          </Table>
        </TableContainer>
        }
    </div>
    );
}
export default CheckoutProduct;