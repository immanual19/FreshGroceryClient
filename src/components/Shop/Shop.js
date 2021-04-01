import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';
import './Shop.css';
const Shop = () => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        fetch('https://shrouded-castle-21272.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setLoading(true);
        })
        
    },[])
    return (
        
        
        <div className="shop-style">

        {
            loading?(products.map(product=><ProductCard product={product}></ProductCard>)):(<Spinner className="loader" animation="border" variant="info" />)
        }
        
        </div>
    );
};

export default Shop;