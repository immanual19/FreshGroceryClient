import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const AddProduct = () => {
    
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setIMageURL] = useState(null);
    const onSubmit = data => {
        const productData={...data};
        productData.imageURL=imageURL;
        console.log(productData);
        const url='http://localhost:8080/addProduct';
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res=>console.log('server Side Response: ',res))
    };
    const handleImageUpload=event=>{
    console.log(event.target.files[0]);
    const imageData=new FormData();
    imageData.set('key','df37e18a03602906e48312132d91183f');
    imageData.append('image',event.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageData)
    .then(function (response) {
        console.log(response.data.data.display_url);
      setIMageURL(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
    
      <input name="name" defaultValue="" ref={register} />
      <br/>
      <input name="weight" defaultValue="" ref={register} />
      <br/>
      <input name="price" defaultValue="" ref={register} />
      <br/>
      <input name="exampleRequired" type="file" onChange={handleImageUpload} />
      <br/>
      <input type="submit" />
    </form>
    );
};

export default AddProduct;