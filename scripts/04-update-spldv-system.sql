-- Add columns for SPLDV equation data and photo submissions
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS spldv_equation_1 TEXT;
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS spldv_equation_2 TEXT;
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS spldv_solution_x DECIMAL;
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS spldv_solution_y DECIMAL;
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS photo_submission TEXT;
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS submission_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create table for tracking SPLDV submissions
CREATE TABLE IF NOT EXISTS spldv_submissions (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES game_sessions(id),
  student_name VARCHAR(100),
  student_class VARCHAR(50),
  equation_1 TEXT,
  equation_2 TEXT,
  solution_x DECIMAL,
  solution_y DECIMAL,
  photo_data TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at_wib TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta')
);

-- Update existing questions to have proper difficulty levels
UPDATE questions SET difficulty = 'mudah' WHERE difficulty IS NULL AND id <= 10;
UPDATE questions SET difficulty = 'sedang' WHERE difficulty IS NULL AND id > 10 AND id <= 20;
UPDATE questions SET difficulty = 'sulit' WHERE difficulty IS NULL AND id > 20;
