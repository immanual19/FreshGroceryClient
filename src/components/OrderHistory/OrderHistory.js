import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './OrderHistory.css';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const OrderHistory = () => {
    const classes = useStyles();
    const [myOrderHistory,setMyOrderHistory]=useState([]);
    const myInfo=JSON.parse(localStorage.getItem('freshGroceryUser'));
    console.log("History: ",myInfo);
    useEffect(()=>{
        fetch(`https://shrouded-castle-21272.herokuapp.com/myorderhistory/${myInfo.email}`)
        .then(res=>res.json())
        .then(data=>setMyOrderHistory(data))
    },[])
    return (
        <div className="order-history">
        <h1>Order History</h1>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Product Price</TableCell>
            <TableCell align="right">Date Ordered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myOrderHistory.map((order) => (
            <TableRow key={order._id}>
              <TableCell component="th" scope="row">
                {order._id}
              </TableCell>
              <TableCell align="right">{order.customerName}</TableCell>
              <TableCell align="right">{order.productName}</TableCell>
              <TableCell align="right">${order.productPrice}</TableCell>
              <TableCell align="right">{order.dateOrdered}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    );
};

export default OrderHistory;