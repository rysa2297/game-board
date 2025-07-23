# Panduan Setup Firebase untuk SPLDV Game Board

## 📋 Langkah-langkah Setup

### 1. Buat Project Firebase

1. **Buka Firebase Console**
   - Kunjungi [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Login dengan akun Google Anda

2. **Buat Project Baru**
   - Klik "Create a project" atau "Add project"
   - Masukkan nama project: `SPLDV Game Board`
   - Pilih apakah ingin mengaktifkan Google Analytics (opsional)
   - Klik "Create project"

### 2. Setup Firestore Database

1. **Aktifkan Firestore**
   - Di sidebar kiri, pilih "Firestore Database"
   - Klik "Create database"

2. **Pilih Security Rules**
   - Pilih "Start in test mode" untuk development
   - Untuk production, gunakan rules yang lebih ketat

3. **Pilih Lokasi**
   - Pilih lokasi server terdekat (misalnya: asia-southeast1)
   - Klik "Done"

4. **Setup Security Rules (Opsional untuk Production)**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to all users (untuk development)
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

### 3. Setup Firebase Storage

1. **Aktifkan Storage**
   - Di sidebar kiri, pilih "Storage"
   - Klik "Get started"

2. **Setup Security Rules**
   - Pilih "Start in test mode"
   - Klik "Next"

3. **Pilih Lokasi**
   - Gunakan lokasi yang sama dengan Firestore
   - Klik "Done"

### 4. Daftarkan Web App

1. **Tambah Web App**
   - Di Project Overview, klik ikon web `</>`
   - Masukkan app nickname: `SPLDV Game Board`
   - Centang "Also set up Firebase Hosting" (opsional)
   - Klik "Register app"

2. **Copy Konfigurasi**
   - Copy konfigurasi Firebase yang ditampilkan
   - Akan terlihat seperti ini:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef..."
   };
   ```

3. **Update Environment Variables**
   - Buka file `.env.local` di root project
   - Update dengan konfigurasi Anda:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...
   ```

### 5. Setup Collections (Otomatis)

Aplikasi akan otomatis membuat collections berikut saat pertama kali digunakan:

#### Collection: `users`
```javascript
{
  id: "auto-generated",
  nama: "string",
  role: "guru" | "siswa",
  kelas: "string", // untuk siswa
  sekolah: "string", // untuk guru
  password: "string", // untuk guru
  created_at: "timestamp"
}
```

#### Collection: `questions`
```javascript
{
  id: "auto-generated",
  category: "SPLDV" | "MatDas",
  question: "string",
  option_a: "string",
  option_b: "string",
  option_c: "string",
  option_d: "string",
  correct_answer: "A" | "B" | "C" | "D",
  time_limit: "number",
  created_by: "string", // guru ID
  verified: "boolean",
  created_at: "timestamp"
}
```

#### Collection: `sessions`
```javascript
{
  id: "auto-generated",
  user_id: "string",
  guru_id: "string",
  nama: "string",
  kelas: "string",
  skor: "number",
  waktu_mulai: "timestamp",
  waktu_selesai: "timestamp",
  waktu_pengerjaan: "number", // dalam detik
  total_jawaban: "number",
  total_benar: "number",
  is_finished: "boolean"
}
```

#### Collection: `feedback`
```javascript
{
  id: "auto-generated",
  user_id: "string",
  guru_id: "string",
  nama_siswa: "string",
  kelas: "string",
  rating1: "number", // 1-5
  rating2: "number", // 1-5
  rating3: "number", // 1-5
  rating4: "number", // 1-5
  rating5: "number", // 1-5
  feedback_text: "string",
  created_at: "timestamp"
}
```

#### Collection: `canvas_exports` (Opsional)
```javascript
{
  id: "auto-generated",
  session_id: "string",
  soal_id: "string",
  image_url: "string",
  timestamp: "timestamp"
}
```

### 6. Testing Koneksi

1. **Restart Development Server**
   ```bash
   npm run dev
   ```

2. **Test Login Guru**
   - Buka `http://localhost:3000/login-guru`
   - Isi form dengan data test
   - Password: `matematika`
   - Cek apakah data tersimpan di Firestore

3. **Test Tambah Soal**
   - Login sebagai guru
   - Tambah soal di dashboard
   - Cek collection `questions` di Firestore

4. **Test Login Siswa**
   - Buka `http://localhost:3000/login-siswa`
   - Pilih guru yang sudah terdaftar
   - Test gameplay

### 7. Deployment ke Production

1. **Update Security Rules**
   - Ganti rules Firestore dan Storage ke mode production
   - Tambahkan validasi yang sesuai

2. **Set Environment Variables di Vercel**
   - Copy semua environment variables
   - Paste di Vercel dashboard

3. **Test Production**
   - Deploy ke Vercel
   - Test semua fitur di production

## 🔒 Security Rules untuk Production

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if true; // Sesuaikan dengan kebutuhan auth
    }
    
    // Questions collection
    match /questions/{questionId} {
      allow read: if true;
      allow write: if true; // Sesuaikan dengan role guru
    }
    
    // Sessions collection
    match /sessions/{sessionId} {
      allow read, write: if true;
    }
    
    // Feedback collection
    match /feedback/{feedbackId} {
      allow read, write: if true;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // Sesuaikan dengan kebutuhan
    }
  }
}
```

## 🚨 Troubleshooting

### Error: "Firebase project not found"
- Pastikan PROJECT_ID benar
- Cek apakah project sudah dibuat di Firebase Console

### Error: "Permission denied"
- Cek security rules Firestore dan Storage
- Pastikan rules mengizinkan read/write

### Error: "Network error"
- Cek koneksi internet
- Pastikan Firebase SDK ter-install dengan benar

### Error: "Invalid API key"
- Cek kembali konfigurasi di `.env.local`
- Pastikan API key valid dan aktif

## 📞 Support

Jika mengalami masalah:
1. Cek Firebase Console untuk error logs
2. Cek browser console untuk error messages
3. Pastikan semua environment variables sudah benar
4. Restart development server setelah update config

---

**Happy coding! 🚀**

