'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, School, Lock } from 'lucide-react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function LoginGuru() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    sekolah: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.sekolah || !formData.password) {
      alert('Mohon lengkapi semua field');
      return;
    }

    if (formData.password !== 'matematika') {
      alert('Password salah! Password default adalah "matematika"');
      return;
    }

    setLoading(true);

    try {
      // Cek apakah guru sudah terdaftar
      const q = query(
        collection(db, 'users'), 
        where('nama', '==', formData.nama),
        where('sekolah', '==', formData.sekolah),
        where('role', '==', 'guru')
      );
      const querySnapshot = await getDocs(q);

      let guruData;
      
      if (querySnapshot.empty) {
        // Daftar guru baru
        const docRef = await addDoc(collection(db, 'users'), {
          nama: formData.nama,
          sekolah: formData.sekolah,
          role: 'guru',
          password: formData.password,
          created_at: new Date()
        });
        
        guruData = {
          id: docRef.id,
          ...formData,
          role: 'guru'
        };
      } else {
        // Guru sudah ada, login
        const doc = querySnapshot.docs[0];
        guruData = {
          id: doc.id,
          ...doc.data(),
          role: 'guru'
        };
      }

      // Simpan data guru ke localStorage
      localStorage.setItem('currentUser', JSON.stringify(guruData));
      
      // Redirect ke dashboard guru
      router.push('/dashboard-guru');
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const playClickSound = () => {
    const audio = new Audio('/sounds/click.mp3');
    audio.play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-green-600 hover:text-green-800 transition-colors"
            onClick={playClickSound}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Guru</h1>
              <p className="text-gray-600">Kelola soal dan pantau siswa</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
              </div>

              {/* Nama Sekolah */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Sekolah
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.sekolah}
                    onChange={(e) => setFormData({...formData, sekolah: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan nama sekolah"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Password default: matematika"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Password default: matematika</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={playClickSound}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Masuk Dashboard'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Ingin bermain sebagai siswa?{' '}
                <Link href="/login-siswa" className="text-green-600 hover:text-green-800">
                  Login sebagai siswa
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

