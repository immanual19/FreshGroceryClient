import React, { useEffect, useState } from 'react';

const ModifyProduct = () => {
    const [products1,setProducts1]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:8080/products')
        .then(res=>res.json())
        .then(data=>console.log('all product from modified: ',data))
    },[])
    return (
        <div>
            <h1>This will be modified products</h1>
        </div>
    );
};

export default ModifyProduct;