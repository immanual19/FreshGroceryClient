import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './ProductCard.css';
import { Link, useHistory } from 'react-router-dom';
const ProductCard = (props) => {
    
    const {_id,name,price,imageURL}=props.product;
    const history=useHistory();
    const handleClick=(id)=>{
        const url=`/checkoutproduct/${id}`;
        history.push(url);
    }
    return (
        <div>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title style={{fontSize:'15px'}}>{name}</Card.Title>
          
          <div className="price-and-button">
                <p className="price">${price}</p>
               <Link to={`/checkoutproduct/${_id}`}><Button onClick={()=>handleClick(_id)} className="button" variant="primary">Buy Now</Button></Link>
          </div>
          
        </Card.Body>
      </Card>
        </div>
    );
};

export default ProductCard;