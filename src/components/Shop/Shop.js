import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Shop.css';
const Shop = () => {
    const [products,setProducts]=useState([]);
  

    useEffect(()=>{
        fetch('https://shrouded-castle-21272.herokuapp.com/products')
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