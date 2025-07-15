# Game Board Digital SPLDV

Game pembelajaran interaktif digital untuk mahasiswa pendidikan matematika dengan fokus pada SPLDV (Sistem Persamaan Linear Dua Variabel).

## 🎯 Fitur Utama

### Untuk Siswa
- Login dengan nama, kelas, dan mata pelajaran
- Bermain game board 40 kotak dengan sistem giliran
- Menjawab soal SPLDV dengan 3 metode (eliminasi, substitusi, gabungan)
- Lempar dadu virtual dan bergerak di papan
- Spin wheel untuk event random (maju, mundur, extra time, skip, duel)
- Timer 30 menit per game
- Leaderboard real-time

### Untuk Guru
- Dashboard monitoring real-time
- Melihat posisi dan progress semua siswa
- Leaderboard dan statistik jawaban
- Export hasil ke Excel
- Monitoring interaksi siswa

### Untuk Admin
- Dashboard hasil kuesioner
- Analisis rating dan feedback
- Export data kuesioner ke Excel
- Statistik penggunaan

## 🚀 Teknologi

- **Backend**: Flask (Python) + Socket.IO
- **Frontend**: React (JavaScript) + Vite
- **Database**: SQLite (development) / PostgreSQL (production)
- **Deployment**: Railway
- **Real-time**: WebSocket via Socket.IO

## 📁 Struktur Proyek

```
digital-board-game/
├── backend/                 # Flask backend
│   ├── src/
│   │   ├── main.py         # Entry point
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── static/         # Built frontend files
│   ├── requirements.txt    # Python dependencies
│   ├── Procfile           # Railway deployment
│   └── railway.json       # Railway config
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/        # Images, sounds
│   │   └── App.jsx        # Main app
│   ├── package.json       # Node dependencies
│   └── dist/              # Built files
├── DEPLOYMENT_GUIDE.md     # Panduan deployment
└── README.md              # File ini
```

## 🛠️ Instalasi dan Menjalankan

### Prerequisites
- Python 3.8+
- Node.js 16+
- pnpm (atau npm)

### 1. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# atau venv\\Scripts\\activate  # Windows
pip install -r requirements.txt
```

### 2. Setup Frontend
```bash
cd frontend
pnpm install
# atau npm install
```

### 3. Menjalankan Development

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python src/main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
pnpm run dev
# atau npm run dev
```

Akses aplikasi di: http://localhost:5173

### 4. Build untuk Production
```bash
cd frontend
pnpm run build
cp -r dist/* ../backend/src/static/
```

## 🚀 Deployment ke Railway

Lihat panduan lengkap di [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### Quick Deploy:
1. Push ke GitHub repository
2. Connect ke Railway (https://railway.app)
3. Deploy from GitHub repo
4. Railway akan auto-detect dan deploy

## 🎮 Cara Bermain

### Login
- **Siswa**: Masukkan nama, kelas, mata pelajaran (SPLDV)
- **Guru**: Password: `guru123`
- **Admin**: Password: `admin123`

### Gameplay (Siswa)
1. Tunggu giliran untuk lempar dadu
2. Klik dadu untuk bergerak
3. Jawab soal SPLDV yang muncul (30 detik)
4. Pilih metode penyelesaian
5. Tulis persamaan linear
6. Berikan jawaban kontekstual
7. Spin wheel untuk event random
8. Tujuan: Capai finish atau jawaban benar terbanyak

### Monitoring (Guru)
1. Dashboard real-time semua siswa
2. Lihat posisi di papan game
3. Monitor jawaban dan interaksi
4. Export hasil ke Excel

## 📊 Penilaian

Siswa dinilai berdasarkan:
1. **Metode**: Pilihan metode penyelesaian (eliminasi/substitusi/gabungan)
2. **Persamaan**: Penulisan persamaan linear yang benar
3. **Kontekstual**: Jawaban dalam konteks soal (nilai x, y, atau keduanya)

## 🎵 Sound Effects

- `30 second.mp3`: Timer warning
- `correct.mp3`: Jawaban benar
- `incorrect.mp3`: Jawaban salah
- `klik.mp3`: Interaksi UI
- `dice.mp3`: Lempar dadu

## 🎨 Desain

- **Style**: Flat design/minimalis
- **Font**: Lato
- **Warna**: Palet nyaman dengan aksen
- **Animasi**: Ringan (slide, dadu, flip kartu)
- **Ikon**: Seragam dari Google Fonts Icons
- **Ilustrasi**: Vektor dari undraw.co

## 📝 Kuesioner

Sistem penilaian dengan:
- Rating bintang 1-5 (skala Likert)
- Feedback teks opsional
- Analisis otomatis untuk admin
- Export ke Excel

## 🔧 Troubleshooting

### Common Issues:

1. **Backend tidak start**
   - Pastikan virtual environment aktif
   - Install dependencies: `pip install -r requirements.txt`

2. **Frontend tidak load**
   - Install dependencies: `pnpm install`
   - Pastikan port 5173 tidak digunakan

3. **Socket.IO connection failed**
   - Pastikan backend running di port 5000
   - Check CORS configuration

4. **Database error**
   - Pastikan folder `backend/src/database/` exists
   - Restart backend untuk auto-create database

## 👨‍💻 Developer

**Clarysa Devira**
- Email: clarysadevira2297@gmail.com
- Proyek Skripsi - Pendidikan Matematika
- Tahun: 2025

## 📄 License

Dibuat untuk keperluan skripsi pendidikan matematika.

---

*© 2025 dibuat oleh clarysa sebagai penyelesaian skripsi*

