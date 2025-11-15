const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const products = [
  {
    name: 'Laptop ASUS ROG',
    description: 'Laptop gaming ASUS ROG dengan processor Intel Core i7, RAM 16GB, SSD 512GB, dan GPU NVIDIA RTX 3060. Cocok untuk gaming dan produktivitas tinggi.',
    price: 15000000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    category: 'electronics',
    stock: 15,
    rating: 4.5,
    numReviews: 23
  },
  {
    name: 'Smartphone Samsung Galaxy',
    description: 'Smartphone Samsung Galaxy dengan layar AMOLED 6.7 inch, kamera 108MP, RAM 8GB, dan baterai 5000mAh. Desain premium dengan performa tinggi.',
    price: 8000000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'electronics',
    stock: 30,
    rating: 4.7,
    numReviews: 45
  },
  {
    name: 'T-Shirt Premium Cotton',
    description: 'T-Shirt dengan bahan cotton premium 100%, nyaman dipakai seharian. Tersedia dalam berbagai ukuran dan warna. Desain simple dan elegan.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'clothing',
    stock: 100,
    rating: 4.3,
    numReviews: 67
  },
  {
    name: 'Jeans Slim Fit',
    description: 'Jeans dengan model slim fit, bahan denim berkualitas tinggi. Cocok untuk casual dan semi-formal. Tersedia berbagai ukuran.',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'clothing',
    stock: 50,
    rating: 4.4,
    numReviews: 34
  },
  {
    name: 'Buku "Clean Code"',
    description: 'Buku panduan untuk menulis kode yang bersih dan mudah dipahami. Ditulis oleh Robert C. Martin, cocok untuk developer semua level.',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'books',
    stock: 25,
    rating: 4.8,
    numReviews: 89
  },
  {
    name: 'Headphone Wireless Sony',
    description: 'Headphone wireless dengan noise cancellation aktif, baterai tahan hingga 30 jam, dan kualitas suara Hi-Res Audio. Nyaman untuk penggunaan lama.',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'electronics',
    stock: 20,
    rating: 4.6,
    numReviews: 56
  },
  {
    name: 'Sepatu Running Nike',
    description: 'Sepatu running dengan teknologi Air Cushion untuk kenyamanan maksimal. Cocok untuk jogging dan olahraga sehari-hari.',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'clothing',
    stock: 40,
    rating: 4.5,
    numReviews: 78
  },
  {
    name: 'Kopi Arabika Premium',
    description: 'Kopi arabika dengan biji pilihan, di-roast dengan sempurna. Rasa yang kaya dan aroma yang menggugah selera. Kemasan 250gr.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500',
    category: 'food',
    stock: 200,
    rating: 4.7,
    numReviews: 112
  }
];

async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();

