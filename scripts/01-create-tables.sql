-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('siswa', 'guru')) NOT NULL,
    kelas VARCHAR(50),
    sekolah VARCHAR(255),
    password VARCHAR(255),
    guru_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) CHECK (category IN ('SPLDV', 'MatDas')) NOT NULL,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) CHECK (correct_answer IN ('A', 'B', 'C', 'D')) NOT NULL,
    time_limit INTEGER NOT NULL,
    created_by INTEGER REFERENCES users(id),
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    guru_id INTEGER REFERENCES users(id) NOT NULL,
    skor INTEGER DEFAULT 0,
    waktu_mulai TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    waktu_selesai TIMESTAMP,
    total_jawaban INTEGER DEFAULT 0,
    total_benar INTEGER DEFAULT 0,
    current_position INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT false
);

-- Create canvas_exports table
CREATE TABLE IF NOT EXISTS canvas_exports (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES sessions(id) NOT NULL,
    soal_id INTEGER REFERENCES questions(id) NOT NULL,
    image_url TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES sessions(id) NOT NULL,
    rating1 INTEGER CHECK (rating1 BETWEEN 1 AND 5),
    rating2 INTEGER CHECK (rating2 BETWEEN 1 AND 5),
    rating3 INTEGER CHECK (rating3 BETWEEN 1 AND 5),
    rating4 INTEGER CHECK (rating4 BETWEEN 1 AND 5),
    rating5 INTEGER CHECK (rating5 BETWEEN 1 AND 5),
    feedback_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_sessions_user_guru ON sessions(user_id, guru_id);
CREATE INDEX IF NOT EXISTS idx_sessions_skor ON sessions(skor DESC);
