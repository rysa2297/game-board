export interface User {
  id: string;
  nama: string;
  role: 'siswa' | 'guru';
  kelas?: string;
  sekolah?: string;
  password?: string;
  created_at: Date;
}

export interface Question {
  id: string;
  category: 'SPLDV' | 'MatDas';
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  time_limit: number;
  created_by: string;
  verified: boolean;
}

export interface GameSession {
  id: string;
  user_id: string;
  guru_id: string;
  skor: number;
  waktu_mulai: Date;
  waktu_selesai?: Date;
  total_jawaban: number;
  total_benar: number;
  current_position: number;
  is_finished: boolean;
}

export interface CanvasExport {
  id: string;
  session_id: string;
  soal_id: string;
  image_url: string;
  timestamp: Date;
}

export interface Feedback {
  id: string;
  session_id: string;
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
  feedback_text: string;
}

export interface BoardTile {
  id: number;
  type: 'SPLDV' | 'MatDas' | 'Bonus' | 'Kosong';
  position: number;
}

export interface GameState {
  currentPosition: number;
  score: number;
  timeRemaining: number;
  currentQuestion?: Question;
  isGameActive: boolean;
  totalQuestions: number;
  correctAnswers: number;
}

