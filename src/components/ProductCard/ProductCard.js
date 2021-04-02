import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './ProductCard.css';
import { Link, useHistory } from 'react-router-dom';
const ProductCard = (props) => {
    
    const {_id,name,price,weight,imageURL}=props.product;
    const history=useHistory();
    const handleClick=(id)=>{
        const url=`/checkoutproduct/${id}`;
        history.push(url);
    }
    return (
        <div>
        <Card style={{ width: '18rem'}}>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title style={{fontSize:'12px'}}>{name} - {weight}</Card.Title>
        </Card.Body>
        <Card.Footer>
        <div style={{marginTop:'20px'}} className="d-flex justify-content-between align-items-center">
                <h6 style={{display:'inline-block'}} className="price">${price}</h6>
               <Link style={{display:'inline-block'}} to={`/checkoutproduct/${_id}`}><Button onClick={()=>handleClick(_id)} className="button" variant="primary">Buy Now</Button></Link>
          </div>
        </Card.Footer>
      </Card>
        </div>
    );
};

export default ProductCard;