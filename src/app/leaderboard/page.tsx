'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Award, Home, Users, Filter } from 'lucide-react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface LeaderboardEntry {
  id: string;
  nama: string;
  kelas: string;
  skor: number;
  total_benar: number;
  total_soal: number;
  waktu_pengerjaan: number;
  guru_nama: string;
  tanggal: Date;
}

interface Guru {
  id: string;
  nama: string;
  sekolah: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [selectedGuru, setSelectedGuru] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuruList();
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedGuru]);

  const fetchGuruList = async () => {
    try {
      const q = query(collection(db, 'users'), where('role', '==', 'guru'));
      const querySnapshot = await getDocs(q);
      const gurus = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Guru[];
      setGuruList(gurus);
    } catch (error) {
      console.error('Error fetching guru list:', error);
    }
  };

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let q;
      if (selectedGuru === 'all') {
        q = query(
          collection(db, 'sessions'),
          orderBy('skor', 'desc'),
          limit(10)
        );
      } else {
        q = query(
          collection(db, 'sessions'),
          where('guru_id', '==', selectedGuru),
          orderBy('skor', 'desc'),
          limit(10)
        );
      }

      const querySnapshot = await getDocs(q);
      const sessions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Ambil data guru untuk setiap sesi
      const leaderboardData: LeaderboardEntry[] = [];
      for (const session of sessions) {
        try {
          const guruDoc = await getDocs(query(collection(db, 'users'), where('__name__', '==', session.guru_id)));
          const guruData = guruDoc.docs[0]?.data();
          
          leaderboardData.push({
            ...session,
            guru_nama: guruData?.nama || 'Unknown',
            tanggal: session.waktu_selesai?.toDate() || new Date()
          } as LeaderboardEntry);
        } catch (error) {
          console.error('Error fetching guru data:', error);
        }
      }

      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getAccuracy = (correct: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
          </div>
        </div>

        {/* Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Filter berdasarkan guru:</label>
              <select
                value={selectedGuru}
                onChange={(e) => setSelectedGuru(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Semua Guru</option>
                {guruList.map((guru) => (
                  <option key={guru.id} value={guru.id}>
                    {guru.nama} - {guru.sekolah}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Top 10 Skor Tertinggi
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat data leaderboard...</p>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Belum ada data permainan</p>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedGuru === 'all' 
                    ? 'Mulai bermain untuk muncul di leaderboard!'
                    : 'Belum ada siswa yang bermain dengan guru yang dipilih'
                  }
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`p-6 flex items-center space-x-4 ${
                      index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(index + 1)}
                    </div>

                    {/* Student Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {entry.nama}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {entry.kelas}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Guru: {entry.guru_nama}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{entry.skor}</div>
                        <div className="text-gray-500">Skor</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          {getAccuracy(entry.total_benar, entry.total_soal)}%
                        </div>
                        <div className="text-gray-500">Akurasi</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          {entry.total_benar}/{entry.total_soal}
                        </div>
                        <div className="text-gray-500">Benar</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">
                          {formatTime(entry.waktu_pengerjaan)}
                        </div>
                        <div className="text-gray-500">Waktu</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ingin masuk ke leaderboard?
              </h3>
              <p className="text-gray-600 mb-4">
                Mainkan game SPLDV dan raih skor tertinggi!
              </p>
              <Link
                href="/login-siswa"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Mulai Bermain
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

