# TokoApaIni - MERN Ecommerce

Website ecommerce dengan tech stack MERN (MongoDB, Express, React, Node.js).

## Fitur

- ✅ User Authentication (Register/Login)
- ✅ Product Listing & Search
- ✅ Product Categories
- ✅ Product Detail Page
- ✅ Shopping Cart (UI Ready)
- ✅ Order Management
- ✅ Responsive Design
- ✅ Modern & Elegant UI

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Router, Axios
- **Styling**: CSS3 dengan CSS Variables
- **Icons**: React Icons

## Struktur Project

```
tokoapaini/
├── backend/          # Express API Server
│   ├── config/       # Database configuration
│   ├── models/       # MongoDB models (User, Product, Order)
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth middleware
│   ├── server.js     # Entry point
│   └── package.json
│
├── frontend/         # React Application
│   ├── public/       # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context (Auth)
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main app component
│   └── package.json
│
└── README.md
```

## Setup

### Prerequisites

- Node.js (v14 atau lebih baru)
- MongoDB (local atau MongoDB Atlas)
- npm atau yarn

### Backend Setup

1. Masuk ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` di folder backend (copy dari `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Pastikan MongoDB sudah berjalan:
   - Untuk MongoDB lokal: Pastikan MongoDB service berjalan
   - Untuk MongoDB Atlas: Ganti `MONGODB_URI` dengan connection string dari Atlas

5. Jalankan server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### Frontend Setup

1. Masuk ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` di folder frontend (copy dari `.env.example`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Jalankan aplikasi:
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get semua products (dengan query: ?category=xxx&search=xxx)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (requires auth)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)

## Menambahkan Sample Data

Untuk menambahkan sample products, Anda bisa menggunakan MongoDB Compass atau membuat script seed. Contoh:

```javascript
// seed.js di folder backend
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const products = [
  {
    name: 'Laptop ASUS',
    description: 'Laptop ASUS dengan spesifikasi tinggi untuk produktivitas',
    price: 8000000,
    image: 'https://via.placeholder.com/300x300?text=Laptop',
    category: 'electronics',
    stock: 10
  },
  {
    name: 'T-Shirt Premium',
    description: 'T-Shirt dengan bahan premium dan desain modern',
    price: 150000,
    image: 'https://via.placeholder.com/300x300?text=T-Shirt',
    category: 'clothing',
    stock: 50
  }
];

Product.insertMany(products)
  .then(() => {
    console.log('Products seeded');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
```

## Development

- Backend menggunakan nodemon untuk auto-reload
- Frontend menggunakan React Scripts dengan hot-reload
- Pastikan backend berjalan sebelum menjalankan frontend

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

Build files akan ada di folder `frontend/build`

## License

MIT

