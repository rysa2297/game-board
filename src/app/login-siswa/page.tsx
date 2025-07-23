'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, School, Users } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function LoginSiswa() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    guru_id: ''
  });
  const [guruList, setGuruList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGuruList();
  }, []);

  const fetchGuruList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const gurus = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === 'guru');
      setGuruList(gurus);
    } catch (error) {
      console.error('Error fetching guru list:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.kelas || !formData.guru_id) {
      alert('Mohon lengkapi semua field');
      return;
    }

    setLoading(true);
    
    // Simpan data siswa ke localStorage untuk sementara
    const siswaData = {
      ...formData,
      role: 'siswa',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(siswaData));
    
    // Redirect ke halaman game
    router.push('/game');
  };

  const playClickSound = () => {
    const audio = new Audio('/sounds/click.mp3');
    audio.play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={playClickSound}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Siswa</h1>
              <p className="text-gray-600">Masukkan data diri untuk bermain</p>
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
              </div>

              {/* Kelas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kelas
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.kelas}
                    onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contoh: 8A, 9B"
                    required
                  />
                </div>
              </div>

              {/* Pilih Guru */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Guru
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.guru_id}
                    onChange={(e) => setFormData({...formData, guru_id: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Pilih guru...</option>
                    {guruList.map((guru) => (
                      <option key={guru.id} value={guru.id}>
                        {guru.nama} - {guru.sekolah}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={playClickSound}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Mulai Bermain'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Belum ada guru yang terdaftar?{' '}
                <Link href="/login-guru" className="text-blue-600 hover:text-blue-800">
                  Daftar sebagai guru
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

