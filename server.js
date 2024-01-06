// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up MongoDB connection
mongoose.connect('mongodb+srv://devroyale:devking@mernapp.dxzuwbs.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a product schema
const productSchema = new mongoose.Schema({
    id: Number,
    img: String,
    title: String,
    price: Number,
    inCart: Boolean,
});

const Product = mongoose.model('Product', productSchema);

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint for adding a new product
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { title, price } = req.body;
    const img = req.file.buffer.toString('base64');

    const newProduct = new Product({ title, img, price });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
