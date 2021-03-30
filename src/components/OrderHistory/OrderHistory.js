import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
    const [myOrderHistory,setMyOrderHistory]=useState([]);
    const myInfo=JSON.parse(localStorage.getItem('freshGroceryUser'));
    console.log("History: ",myInfo);
    useEffect(()=>{
        fetch(`http://localhost:8080/myorderhistory/${myInfo.email}`)
        .then(res=>res.json())
        .then(data=>setMyOrderHistory(data))
    },[])
    return (
        <div>
            {
                myOrderHistory.map(myOrder=><li>{myOrder.productPrice}</li>)
            }
        </div>
    );
};

export default OrderHistory;