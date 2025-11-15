# Panduan Setup TokoWebMurah Ecommerce

## Langkah-langkah Setup

### 1. Install Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** (v14 atau lebih baru) - Download dari [nodejs.org](https://nodejs.org/)
- **MongoDB** - Download dari [mongodb.com](https://www.mongodb.com/try/download/community) atau gunakan MongoDB Atlas (cloud)

### 2. Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Buat file .env (copy dari .env.example atau buat manual)
# Isi dengan:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development

# Pastikan MongoDB sudah berjalan
# Untuk Windows: MongoDB biasanya berjalan otomatis sebagai service
# Untuk Linux/Mac: sudo systemctl start mongod atau mongod

# Jalankan server (development mode dengan auto-reload)
npm run dev

# Atau jalankan production mode
npm start
```

Backend akan berjalan di `http://localhost:5000`

### 3. Seed Sample Data (Opsional)

Untuk menambahkan sample products ke database:

```bash
cd backend
node seed.js
```

Ini akan menambahkan 8 sample products ke database Anda.

### 4. Setup Frontend

Buka terminal baru (biarkan backend tetap berjalan):

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Buat file .env (copy dari .env.example atau buat manual)
# Isi dengan:
REACT_APP_API_URL=http://localhost:5000/api

# Jalankan aplikasi
npm start
```

Frontend akan berjalan di `http://localhost:3000` dan browser akan terbuka otomatis.

### 5. Testing Aplikasi

1. **Register/Login**: 
   - Buka `http://localhost:3000/login`
   - Buat akun baru atau login dengan akun yang sudah ada

2. **Browse Products**:
   - Klik "Products" di header
   - Gunakan search dan filter kategori

3. **View Product Detail**:
   - Klik pada product card untuk melihat detail

4. **Add Products** (Admin):
   - Login terlebih dahulu
   - Gunakan Postman atau API client untuk POST ke `/api/products`

## Troubleshooting

### MongoDB Connection Error

Jika mendapatkan error koneksi MongoDB:

1. **MongoDB Lokal**:
   - Pastikan MongoDB service berjalan
   - Windows: Buka Services dan cari MongoDB, pastikan status Running
   - Linux: `sudo systemctl status mongod`
   - Mac: `brew services list` dan pastikan MongoDB running

2. **MongoDB Atlas**:
   - Dapatkan connection string dari MongoDB Atlas
   - Ganti `MONGODB_URI` di `.env` dengan connection string tersebut
   - Pastikan IP whitelist sudah diatur di Atlas

### Port Already in Use

Jika port 5000 atau 3000 sudah digunakan:

- **Backend**: Ubah `PORT` di file `.env` backend
- **Frontend**: Set `PORT=3001` di file `.env` frontend atau gunakan `npm start -- --port 3001`

### CORS Error

Jika mendapatkan CORS error, pastikan:
- Backend sudah berjalan di port yang benar
- `REACT_APP_API_URL` di frontend `.env` sesuai dengan backend URL
- CORS sudah di-enable di backend (sudah termasuk di kode)

### Module Not Found

Jika mendapatkan error module not found:
- Pastikan sudah menjalankan `npm install` di kedua folder (backend dan frontend)
- Hapus `node_modules` dan `package-lock.json`, lalu jalankan `npm install` lagi

## Struktur File Penting

```
backend/
├── .env              # Environment variables (BUAT MANUAL)
├── server.js         # Entry point server
└── seed.js           # Script untuk sample data

frontend/
├── .env              # Environment variables (BUAT MANUAL)
└── src/
    └── App.jsx       # Main React component
```

## Next Steps

Setelah setup berhasil:

1. ✅ Test semua fitur (register, login, browse products)
2. ✅ Tambahkan products melalui API atau seed script
3. ✅ Customize design sesuai kebutuhan
4. ✅ Implement cart functionality (saat ini UI sudah ready)
5. ✅ Deploy ke production (Vercel/Netlify untuk frontend, Heroku/Railway untuk backend)

## Support

Jika ada masalah, pastikan:
- Semua dependencies sudah terinstall
- MongoDB sudah berjalan
- Port tidak conflict dengan aplikasi lain
- File `.env` sudah dibuat dengan benar

