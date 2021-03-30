import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './ProductCard.css';
const ProductCard = (props) => {
    
    const {_id,name,weight,price,imageURL}=props.product;
    return (
        <div>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title style={{fontSize:'15px'}}>{name}</Card.Title>
          
          <div className="price-and-button">
                <p className="price">${price}</p>
                <Button className="button" variant="primary">Buy Now</Button>
          </div>
          
        </Card.Body>
      </Card>
        </div>
    );
};

export default ProductCard;