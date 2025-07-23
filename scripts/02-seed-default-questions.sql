-- Insert default SPLDV questions
INSERT INTO questions (category, question, option_a, option_b, option_c, option_d, correct_answer, time_limit, created_by) VALUES
('SPLDV', 'Tentukan nilai x dan y dari sistem persamaan: 2x + 3y = 12 dan x - y = 1', 'x = 3, y = 2', 'x = 2, y = 3', 'x = 4, y = 1', 'x = 1, y = 4', 'A', 60),
('SPLDV', 'Selesaikan sistem persamaan: 3x + 2y = 16 dan x + 4y = 14', 'x = 2, y = 5', 'x = 4, y = 2', 'x = 3, y = 4', 'x = 5, y = 1', 'B', 60),
('SPLDV', 'Dari sistem persamaan: 5x - 2y = 8 dan 3x + y = 11, nilai x + y adalah...', '5', '6', '7', '8', 'C', 60),
('SPLDV', 'Tentukan himpunan penyelesaian dari: 4x + y = 15 dan 2x - 3y = 1', '{(4, -1)}', '{(3, 3)}', '{(2, 7)}', '{(5, -5)}', 'A', 60),
('SPLDV', 'Jika 2x + 3y = 13 dan 4x - y = 5, maka nilai 3x + 2y adalah...', '12', '13', '14', '15', 'C', 60),
('SPLDV', 'Sistem persamaan: x + 2y = 8 dan 3x - y = 1 memiliki penyelesaian...', 'x = 2, y = 3', 'x = 1, y = 4', 'x = 3, y = 2', 'x = 4, y = 1', 'A', 60),
('SPLDV', 'Tentukan nilai a jika sistem: ax + 2y = 6 dan x - y = 1 memiliki penyelesaian x = 2', 'a = 1', 'a = 2', 'a = 3', 'a = 4', 'A', 60),
('SPLDV', 'Dari sistem: 2x - y = 3 dan x + 3y = 10, nilai y adalah...', '1', '2', '3', '4', 'B', 60),
('SPLDV', 'Selesaikan: 6x + 4y = 20 dan 3x - 2y = 2', 'x = 2, y = 2', 'x = 3, y = 1', 'x = 1, y = 3', 'x = 4, y = -1', 'A', 60),
('SPLDV', 'Jika x - 2y = -4 dan 3x + y = 11, maka x² + y² = ...', '13', '17', '20', '25', 'A', 60);

-- Insert default MatDas questions
INSERT INTO questions (category, question, option_a, option_b, option_c, option_d, correct_answer, time_limit, created_by) VALUES
('MatDas', 'Hasil dari 15 + 23 × 4 - 18 ÷ 2 adalah...', '98', '99', '100', '101', 'A', 20),
('MatDas', 'Nilai dari √144 + √81 adalah...', '15', '17', '19', '21', 'D', 20),
('MatDas', 'Hasil dari 2³ × 3² adalah...', '72', '54', '36', '18', 'A', 20),
('MatDas', 'Jika 3x - 7 = 14, maka x = ...', '5', '6', '7', '8', 'C', 20),
('MatDas', 'Hasil dari (5 + 3)² - 4 × 6 adalah...', '40', '36', '32', '28', 'A', 20),
('MatDas', 'Nilai dari 25% dari 80 adalah...', '15', '20', '25', '30', 'B', 20),
('MatDas', 'Hasil dari 7! ÷ 5! adalah...', '42', '35', '30', '25', 'A', 20),
('MatDas', 'Jika log₂ 8 = x, maka x = ...', '2', '3', '4', '5', 'B', 20),
('MatDas', 'Hasil dari ³√27 + ²√16 adalah...', '7', '8', '9', '10', 'A', 20),
('MatDas', 'Nilai dari sin 30° + cos 60° adalah...', '0.5', '1', '1.5', '2', 'B', 20);
