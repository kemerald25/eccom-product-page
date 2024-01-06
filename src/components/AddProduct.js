import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({updateContentCallback }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, image } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('price', price);
    formDataToSend.append('image', image);
    

    try {
      await axios.post('http://localhost:5000/api/products', formDataToSend);
      alert('Product added successfully!');

      // Call the updateContentCallback to refresh the content
      updateContentCallback();
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label>Price:</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange} />

        <label>Image:</label>
        <input type="file" accept="image/*" name="image" onChange={handleImageChange} />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
