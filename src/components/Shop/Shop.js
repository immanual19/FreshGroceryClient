import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Shop.css';
const Shop = () => {
    const [products,setProducts]=useState([]);
  

    useEffect(()=>{
        fetch('http://localhost:8080/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
    return (
        <div className="shop-style">
            {
                products.map(product=><ProductCard product={product}></ProductCard>)
            }
        </div>
    );
};

export default Shop;