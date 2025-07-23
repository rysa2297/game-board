# Game Board SPLDV

Platform pembelajaran interaktif untuk Sistem Persamaan Linear Dua Variabel (SPLDV) berbasis web dengan fitur game board digital.

## 🎯 Fitur Utama

### Untuk Siswa
- **Game Board Interaktif**: Board game dengan 40 kotak berbagai jenis (SPLDV, MatDas, Bonus, Kosong)
- **Canvas Coret-coret**: Fitur menggambar untuk membantu menyelesaikan soal
- **Sistem Skor**: Poin berdasarkan ketepatan dan kecepatan jawaban
- **Timer**: Batas waktu 30 menit atau maksimal 15 soal
- **Export PNG**: Simpan hasil coretan sebagai gambar

### Untuk Guru
- **Dashboard Kontrol**: Kelola soal dan pantau progress siswa
- **Tambah Soal**: Buat soal SPLDV dan MatDas dengan mudah
- **Data Siswa**: Lihat skor, waktu pengerjaan, dan statistik siswa
- **Leaderboard**: Top 10 skor tertinggi per guru

### Fitur Umum
- **Responsive Design**: Kompatibel dengan desktop dan mobile
- **Sound Effects**: Efek suara untuk interaksi (click.mp3, dice.mp3)
- **Feedback System**: Kuisioner rating dan saran perbaikan
- **Materi Pembelajaran**: Panduan lengkap SPLDV

## 🛠 Teknologi

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd spldv-game-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Firebase**
   - Copy `.env.local.example` ke `.env.local`
   - Buat project Firebase di [Firebase Console](https://console.firebase.google.com/)
   - Aktifkan Firestore Database dan Storage
   - Copy konfigurasi Firebase ke `.env.local`

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Buka aplikasi**
   ```
   http://localhost:3000
   ```

## 🔧 Konfigurasi Firebase

### 1. Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create a project"
3. Masukkan nama project: "SPLDV Game Board"
4. Ikuti langkah-langkah setup

### 2. Aktifkan Firestore Database
1. Di sidebar, pilih "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in test mode"
4. Pilih lokasi server

### 3. Aktifkan Storage
1. Di sidebar, pilih "Storage"
2. Klik "Get started"
3. Pilih "Start in test mode"

### 4. Daftarkan Web App
1. Di Project Overview, klik ikon web (</>)
2. Masukkan app nickname: "SPLDV Game Board"
3. Copy konfigurasi yang diberikan
4. Paste ke file `.env.local`

### 5. Struktur Database
Aplikasi akan otomatis membuat collections berikut:
- `users`: Data guru dan siswa
- `questions`: Soal SPLDV dan MatDas
- `sessions`: Sesi permainan siswa
- `feedback`: Feedback dari siswa

## 🎮 Cara Bermain

### Login Siswa
1. Pilih "Login Siswa" di halaman utama
2. Masukkan nama lengkap dan kelas
3. Pilih guru dari dropdown
4. Klik "Mulai Bermain"

### Login Guru
1. Pilih "Login Guru" di halaman utama
2. Masukkan nama lengkap dan nama sekolah
3. Masukkan password: `matematika`
4. Klik "Masuk Dashboard"

### Gameplay
1. **Lempar Dadu**: Klik "Roll Dice" untuk bergerak
2. **Jawab Soal**: Selesaikan soal sesuai jenis kotak
3. **Gunakan Canvas**: Coret-coret untuk membantu perhitungan
4. **Export PNG**: Simpan hasil coretan
5. **Pilih Jawaban**: Klik opsi A, B, C, atau D

### Jenis Kotak
- **SPLDV**: Soal SPLDV (60 detik, +10/-5 poin)
- **MatDas**: Soal Matematika Dasar (20 detik, +5/-3 poin)
- **Bonus**: Poin bonus (+10 hingga +30 poin)
- **Kosong**: Tidak ada aksi

## 📊 Sistem Skor

| Jenis Soal | Waktu | Benar | Salah |
|------------|-------|-------|-------|
| SPLDV      | 60s   | +10   | -5    |
| MatDas     | 20s   | +5    | -3    |
| Bonus      | -     | +10-30| -     |

## 🚀 Deployment

### Deploy ke Vercel
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy otomatis

### Environment Variables untuk Production
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📱 Fitur Mobile

- Touch support untuk canvas
- Responsive layout
- Touch-friendly buttons
- Mobile-optimized UI

## 🔊 Audio Files

Letakkan file audio di `public/sounds/`:
- `click.mp3`: Suara klik tombol
- `dice.mp3`: Suara lempar dadu

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📄 Lisensi

MIT License - Lihat file LICENSE untuk detail lengkap.

## 📞 Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ untuk pembelajaran SPLDV yang lebih interaktif**

