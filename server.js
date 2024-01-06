const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path'); // Added for handling file paths
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up MongoDB connection
mongoose.connect('mongodb+srv://devroyale:devking@mernapp.dxzuwbs.mongodb.net/your-database-name?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a product schema
const productSchema = new mongoose.Schema({
  id: Number,
  img: String, // Store the image as a URL
  title: String,
  price: Number,
  // inCart: String,
});

const Product = mongoose.model('Product', productSchema);

// Add a route to handle GET requests and fetch all products
app.get('/api/products/:id', async (req, res) => {
  console.log(`Request received for product with ID: ${req.params.id}`);
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint for adding a new product
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { title, price } = req.body;
    const imgBuffer = req.file.buffer;

    // Generate a unique file name
    const fileName = Date.now() + path.extname(req.file.originalname);
    
    // Store the image to a public folder (you may want to customize the folder structure)
    const imagePath = path.join(__dirname, 'public', 'images', fileName);

    // Save the image file
    await new Promise((resolve, reject) => {
      fs.writeFile(imagePath, imgBuffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Construct the image URL
    const imgURL = `/images/${fileName}`;

    const newProduct = new Product({ title, img: imgURL, price });
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
