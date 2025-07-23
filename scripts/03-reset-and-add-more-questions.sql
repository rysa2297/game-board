-- Reset all data
TRUNCATE TABLE feedback CASCADE;
TRUNCATE TABLE canvas_exports CASCADE;
TRUNCATE TABLE sessions CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE questions CASCADE;

-- Reset sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE questions_id_seq RESTART WITH 1;
ALTER SEQUENCE sessions_id_seq RESTART WITH 1;
ALTER SEQUENCE canvas_exports_id_seq RESTART WITH 1;
ALTER SEQUENCE feedback_id_seq RESTART WITH 1;

-- Insert comprehensive SPLDV questions (50 questions)
INSERT INTO questions (category, question, option_a, option_b, option_c, option_d, correct_answer, time_limit, created_by) VALUES
-- Basic SPLDV Questions
('SPLDV', 'Tentukan nilai x dan y dari sistem persamaan: 2x + 3y = 12 dan x - y = 1', 'x = 3, y = 2', 'x = 2, y = 3', 'x = 4, y = 1', 'x = 1, y = 4', 'A', 60, NULL),
('SPLDV', 'Selesaikan sistem persamaan: 3x + 2y = 16 dan x + 4y = 14', 'x = 2, y = 5', 'x = 4, y = 2', 'x = 3, y = 4', 'x = 5, y = 1', 'B', 60, NULL),
('SPLDV', 'Dari sistem persamaan: 5x - 2y = 8 dan 3x + y = 11, nilai x + y adalah...', '5', '6', '7', '8', 'C', 60, NULL),
('SPLDV', 'Tentukan himpunan penyelesaian dari: 4x + y = 15 dan 2x - 3y = 1', '{(4, -1)}', '{(3, 3)}', '{(2, 7)}', '{(5, -5)}', 'A', 60, NULL),
('SPLDV', 'Jika 2x + 3y = 13 dan 4x - y = 5, maka nilai 3x + 2y adalah...', '12', '13', '14', '15', 'C', 60, NULL),

-- Intermediate SPLDV Questions
('SPLDV', 'Sistem persamaan: x + 2y = 8 dan 3x - y = 1 memiliki penyelesaian...', 'x = 2, y = 3', 'x = 1, y = 4', 'x = 3, y = 2', 'x = 4, y = 1', 'A', 60, NULL),
('SPLDV', 'Tentukan nilai a jika sistem: ax + 2y = 6 dan x - y = 1 memiliki penyelesaian x = 2', 'a = 1', 'a = 2', 'a = 3', 'a = 4', 'A', 60, NULL),
('SPLDV', 'Dari sistem: 2x - y = 3 dan x + 3y = 10, nilai y adalah...', '1', '2', '3', '4', 'B', 60, NULL),
('SPLDV', 'Selesaikan: 6x + 4y = 20 dan 3x - 2y = 2', 'x = 2, y = 2', 'x = 3, y = 1', 'x = 1, y = 3', 'x = 4, y = -1', 'A', 60, NULL),
('SPLDV', 'Jika x - 2y = -4 dan 3x + y = 11, maka x² + y² = ...', '13', '17', '20', '25', 'A', 60, NULL),

-- Advanced SPLDV Questions
('SPLDV', 'Sistem persamaan: 2x + 5y = 19 dan 3x - 2y = 4 memiliki penyelesaian...', 'x = 2, y = 3', 'x = 3, y = 2', 'x = 4, y = 1', 'x = 1, y = 4', 'B', 60, NULL),
('SPLDV', 'Tentukan nilai x dan y dari: 7x + 3y = 31 dan 2x - y = 3', 'x = 4, y = 1', 'x = 3, y = 2', 'x = 2, y = 3', 'x = 1, y = 4', 'A', 60, NULL),
('SPLDV', 'Dari sistem: 4x + 3y = 25 dan 2x + 5y = 23, nilai x - y adalah...', '1', '2', '3', '4', 'A', 60, NULL),
('SPLDV', 'Selesaikan sistem: 5x + 2y = 24 dan 3x + 4y = 22', 'x = 4, y = 2', 'x = 2, y = 4', 'x = 3, y = 3', 'x = 5, y = 1', 'A', 60, NULL),
('SPLDV', 'Jika 3x + 4y = 26 dan x - 2y = -2, maka nilai 2x + y adalah...', '8', '9', '10', '11', 'C', 60, NULL),

-- Word Problems SPLDV
('SPLDV', 'Jumlah dua bilangan adalah 15, selisihnya 3. Kedua bilangan tersebut adalah...', '9 dan 6', '8 dan 7', '10 dan 5', '11 dan 4', 'A', 60, NULL),
('SPLDV', 'Harga 2 buku dan 3 pensil Rp 11.000. Harga 1 buku dan 2 pensil Rp 6.500. Harga 1 buku adalah...', 'Rp 2.500', 'Rp 3.000', 'Rp 3.500', 'Rp 4.000', 'C', 60, NULL),
('SPLDV', 'Keliling persegi panjang 28 cm. Jika panjang 4 cm lebih dari lebar, maka luas persegi panjang adalah...', '45 cm²', '48 cm²', '50 cm²', '52 cm²', 'B', 60, NULL),
('SPLDV', 'Umur ayah 3 kali umur anak. 10 tahun lagi, umur ayah 2 kali umur anak. Umur anak sekarang...', '10 tahun', '12 tahun', '15 tahun', '18 tahun', 'A', 60, NULL),
('SPLDV', 'Dalam kandang ada 35 ekor ayam dan kambing. Jumlah kaki 94. Banyak ayam adalah...', '23 ekor', '24 ekor', '25 ekor', '26 ekor', 'A', 60, NULL),

-- Fraction SPLDV
('SPLDV', 'Selesaikan: x/2 + y/3 = 5 dan x/3 - y/2 = 1', 'x = 6, y = 6', 'x = 8, y = 4', 'x = 9, y = 3', 'x = 12, y = 0', 'A', 60, NULL),
('SPLDV', 'Dari sistem: 2x/3 + y/4 = 7 dan x/2 - y/3 = 1, nilai x adalah...', '6', '8', '9', '12', 'C', 60, NULL),
('SPLDV', 'Tentukan y dari: x/4 + y/2 = 3 dan x/3 + y/6 = 2', '2', '3', '4', '6', 'C', 60, NULL),
('SPLDV', 'Jika 3x/4 + 2y/3 = 11 dan x/2 + y/4 = 3, maka x + y = ...', '8', '9', '10', '12', 'A', 60, NULL),
('SPLDV', 'Selesaikan: 2x/5 + 3y/4 = 8 dan x/3 + y/2 = 4', 'x = 6, y = 4', 'x = 5, y = 6', 'x = 4, y = 8', 'x = 3, y = 10', 'B', 60, NULL),

-- Substitution Method Focus
('SPLDV', 'Dengan metode substitusi, dari x + y = 7 dan 2x - y = 2, nilai x adalah...', '2', '3', '4', '5', 'B', 60, NULL),
('SPLDV', 'Gunakan substitusi untuk: y = 2x - 1 dan 3x + y = 14, nilai y adalah...', '5', '7', '9', '11', 'C', 60, NULL),
('SPLDV', 'Metode substitusi pada: x = y + 3 dan 2x + 3y = 21 menghasilkan y = ...', '2', '3', '4', '5', 'B', 60, NULL),
('SPLDV', 'Dari x = 3y dan x + 2y = 15, dengan substitusi didapat x = ...', '6', '9', '12', '15', 'B', 60, NULL),
('SPLDV', 'Substitusi y = x - 2 ke 3x + 2y = 16 menghasilkan x = ...', '4', '5', '6', '8', 'A', 60, NULL),

-- Elimination Method Focus
('SPLDV', 'Eliminasi x dari: 2x + 3y = 13 dan 3x - 2y = 4 menghasilkan y = ...', '1', '2', '3', '4', 'B', 60, NULL),
('SPLDV', 'Dengan eliminasi y dari: 4x + 2y = 18 dan 3x - 2y = 10, nilai x = ...', '3', '4', '5', '6', 'B', 60, NULL),
('SPLDV', 'Eliminasi pada: 5x + 3y = 29 dan 2x + 3y = 17 menghasilkan x = ...', '3', '4', '5', '6', 'B', 60, NULL),
('SPLDV', 'Dari eliminasi: 3x + 4y = 25 dan 3x - 2y = 7, didapat y = ...', '2', '3', '4', '5', 'B', 60, NULL),
('SPLDV', 'Eliminasi x dari: 6x + 5y = 37 dan 2x + 5y = 17 menghasilkan x = ...', '4', '5', '6', '7', 'B', 60, NULL),

-- Mixed Method
('SPLDV', 'Sistem: 7x + 2y = 31 dan 3x + 4y = 25 diselesaikan dengan metode campuran. Nilai x = ...', '3', '4', '5', '6', 'C', 60, NULL),
('SPLDV', 'Gabungan eliminasi-substitusi pada: 4x + 3y = 22 dan 2x - y = 4 menghasilkan y = ...', '1', '2', '3', '4', 'B', 60, NULL),
('SPLDV', 'Metode campuran untuk: 5x - 3y = 7 dan 2x + y = 8 memberikan x = ...', '2', '3', '4', '5', 'A', 60, NULL),
('SPLDV', 'Dari sistem: 6x + y = 25 dan x - 2y = 1 dengan metode campuran, y = ...', '1', '2', '3', '4', 'A', 60, NULL),
('SPLDV', 'Kombinasi metode pada: 3x + 5y = 26 dan 4x - 3y = 5 menghasilkan x + y = ...', '6', '7', '8', '9', 'B', 60, NULL),

-- Special Cases
('SPLDV', 'Sistem: 2x + 4y = 10 dan x + 2y = 5 memiliki...', 'Satu solusi', 'Tak hingga solusi', 'Tidak ada solusi', 'Dua solusi', 'B', 60, NULL),
('SPLDV', 'Persamaan: 3x + 6y = 12 dan 2x + 4y = 10 adalah sistem yang...', 'Konsisten', 'Inkonsisten', 'Dependent', 'Independent', 'B', 60, NULL),
('SPLDV', 'Jika sistem ax + 2y = 6 dan 2x + 4y = 12 memiliki tak hingga solusi, maka a = ...', '1', '2', '3', '4', 'A', 60, NULL),
('SPLDV', 'Sistem: x + y = 5 dan 2x + 2y = 8 adalah...', 'Konsisten', 'Inkonsisten', 'Dependent', 'Unik', 'B', 60, NULL),
('SPLDV', 'Agar sistem 3x + ky = 9 dan 6x + 4y = 18 inkonsisten, nilai k = ...', '1', '2', '3', '4', 'B', 60, NULL),

-- Complex Applications
('SPLDV', 'Modal Rp 500.000 dibagi 2 investasi. Bunga 8% dan 12%. Total bunga Rp 52.000. Investasi 8% adalah...', 'Rp 200.000', 'Rp 250.000', 'Rp 300.000', 'Rp 350.000', 'A', 60, NULL),
('SPLDV', 'Campuran 40 liter berisi alkohol 30% dan 60%. Untuk alkohol 45%, perlu alkohol 30% sebanyak...', '20 liter', '24 liter', '28 liter', '32 liter', 'A', 60, NULL),
('SPLDV', 'Kecepatan perahu di air tenang 15 km/jam. Dengan arus, perahu menempuh 60 km dalam 3 jam. Kecepatan arus...', '3 km/jam', '4 km/jam', '5 km/jam', '6 km/jam', 'C', 60, NULL),
('SPLDV', 'Dua pipa mengisi kolam. Pipa A saja 6 jam, pipa B saja 4 jam. Bersamaan mengisi kolam dalam...', '2,4 jam', '2,5 jam', '2,6 jam', '3 jam', 'A', 60, NULL),
('SPLDV', 'Harga 3 kg apel dan 2 kg jeruk Rp 47.000. Harga 2 kg apel dan 4 kg jeruk Rp 54.000. Harga 1 kg apel...', 'Rp 9.000', 'Rp 10.000', 'Rp 11.000', 'Rp 12.000', 'C', 60, NULL);

-- Insert comprehensive MatDas questions (50 questions)
INSERT INTO questions (category, question, option_a, option_b, option_c, option_d, correct_answer, time_limit, created_by) VALUES
-- Basic Arithmetic
('MatDas', 'Hasil dari 15 + 23 × 4 - 18 ÷ 2 adalah...', '98', '99', '100', '101', 'A', 20, NULL),
('MatDas', 'Nilai dari 45 - 18 + 7 × 3 adalah...', '48', '50', '52', '54', 'A', 20, NULL),
('MatDas', 'Hasil dari 8 × 9 - 36 ÷ 4 + 5 adalah...', '68', '70', '72', '74', 'A', 20, NULL),
('MatDas', 'Nilai dari 100 - 25 × 2 + 15 ÷ 3 adalah...', '55', '57', '59', '61', 'A', 20, NULL),
('MatDas', 'Hasil dari 12 + 8 × 5 - 20 ÷ 4 adalah...', '47', '49', '51', '53', 'A', 20, NULL),

-- Square Roots
('MatDas', 'Nilai dari √144 + √81 adalah...', '15', '17', '19', '21', 'D', 20, NULL),
('MatDas', 'Hasil dari √169 - √64 + √25 adalah...', '10', '12', '14', '16', 'A', 20, NULL),
('MatDas', 'Nilai dari √196 + √49 - √36 adalah...', '13', '15', '17', '19', 'C', 20, NULL),
('MatDas', 'Hasil dari 2√100 + 3√16 adalah...', '32', '34', '36', '38', 'A', 20, NULL),
('MatDas', 'Nilai dari √225 ÷ √9 + √4 adalah...', '7', '8', '9', '10', 'A', 20, NULL),

-- Powers and Exponents
('MatDas', 'Hasil dari 2³ × 3² adalah...', '72', '54', '36', '18', 'A', 20, NULL),
('MatDas', 'Nilai dari 4² + 3³ - 2⁴ adalah...', '27', '25', '23', '21', 'A', 20, NULL),
('MatDas', 'Hasil dari 5² × 2³ ÷ 4² adalah...', '12.5', '15', '17.5', '20', 'A', 20, NULL),
('MatDas', 'Nilai dari (2³)² - 3² × 2² adalah...', '28', '30', '32', '34', 'A', 20, NULL),
('MatDas', 'Hasil dari 6² ÷ 3² + 4² adalah...', '20', '22', '24', '26', 'A', 20, NULL),

-- Linear Equations
('MatDas', 'Jika 3x - 7 = 14, maka x = ...', '5', '6', '7', '8', 'C', 20, NULL),
('MatDas', 'Nilai x dari 2x + 5 = 17 adalah...', '4', '5', '6', '7', 'C', 20, NULL),
('MatDas', 'Jika 4x - 3 = 21, maka x = ...', '5', '6', '7', '8', 'B', 20, NULL),
('MatDas', 'Hasil dari 5x + 8 = 33 adalah x = ...', '4', '5', '6', '7', 'B', 20, NULL),
('MatDas', 'Nilai x dari 3x + 12 = 30 adalah...', '4', '5', '6', '7', 'C', 20, NULL),

-- Fractions
('MatDas', 'Hasil dari 3/4 + 2/3 adalah...', '17/12', '5/7', '11/12', '13/12', 'A', 20, NULL),
('MatDas', 'Nilai dari 5/6 - 1/4 adalah...', '7/12', '2/3', '5/12', '1/2', 'A', 20, NULL),
('MatDas', 'Hasil dari 2/3 × 3/4 adalah...', '1/2', '5/12', '6/12', '2/3', 'A', 20, NULL),
('MatDas', 'Nilai dari 4/5 ÷ 2/3 adalah...', '6/5', '8/15', '12/10', '2/5', 'A', 20, NULL),
('MatDas', 'Hasil dari 1 1/2 + 2 1/3 adalah...', '3 5/6', '3 2/3', '4 1/6', '3 1/2', 'A', 20, NULL),

-- Percentages
('MatDas', 'Nilai dari 25% dari 80 adalah...', '15', '20', '25', '30', 'B', 20, NULL),
('MatDas', '30% dari 150 adalah...', '40', '45', '50', '55', 'B', 20, NULL),
('MatDas', '15% dari 200 + 20% dari 100 adalah...', '50', '55', '60', '65', 'A', 20, NULL),
('MatDas', 'Jika 40% dari x = 60, maka x = ...', '120', '140', '150', '160', 'C', 20, NULL),
('MatDas', '75% dari 120 - 25% dari 80 adalah...', '70', '75', '80', '85', 'A', 20, NULL),

-- Factorials and Combinations
('MatDas', 'Hasil dari 5! ÷ 3! adalah...', '20', '25', '30', '35', 'A', 20, NULL),
('MatDas', 'Nilai dari 6! ÷ 4! + 3! adalah...', '36', '38', '40', '42', 'A', 20, NULL),
('MatDas', 'Hasil dari 4! × 2! ÷ 3! adalah...', '8', '10', '12', '16', 'A', 20, NULL),
('MatDas', 'Nilai dari 7! ÷ 5! - 4! adalah...', '18', '20', '22', '24', 'A', 20, NULL),
('MatDas', 'Hasil dari (5!)/(3! × 2!) adalah...', '10', '12', '15', '20', 'A', 20, NULL),

-- Logarithms
('MatDas', 'Jika log₂ 8 = x, maka x = ...', '2', '3', '4', '5', 'B', 20, NULL),
('MatDas', 'Nilai dari log₃ 27 + log₂ 4 adalah...', '5', '6', '7', '8', 'A', 20, NULL),
('MatDas', 'Hasil dari log₁₀ 100 - log₁₀ 10 adalah...', '0', '1', '2', '3', 'B', 20, NULL),
('MatDas', 'Jika log₅ 125 = y, maka y = ...', '2', '3', '4', '5', 'B', 20, NULL),
('MatDas', 'Nilai dari 2 log₂ 8 - log₂ 4 adalah...', '4', '5', '6', '7', 'A', 20, NULL),

-- Trigonometry Basic
('MatDas', 'Hasil dari sin 30° + cos 60° adalah...', '0.5', '1', '1.5', '2', 'B', 20, NULL),
('MatDas', 'Nilai dari cos 0° + sin 90° adalah...', '1', '2', '1.5', '0.5', 'B', 20, NULL),
('MatDas', 'Hasil dari tan 45° × cos 0° adalah...', '0', '1', '√2', '2', 'B', 20, NULL),
('MatDas', 'Nilai dari sin² 30° + cos² 30° adalah...', '0.5', '0.75', '1', '1.25', 'C', 20, NULL),
('MatDas', 'Hasil dari 2 sin 60° - cos 30° adalah...', '0', '√3/2', '√3', '2√3', 'C', 20, NULL),

-- Cube Roots
('MatDas', 'Hasil dari ³√27 + ²√16 adalah...', '7', '8', '9', '10', 'A', 20, NULL),
('MatDas', 'Nilai dari ³√64 - ³√8 + ³√1 adalah...', '3', '4', '5', '6', 'A', 20, NULL),
('MatDas', 'Hasil dari 2³√125 + ³√216 adalah...', '16', '18', '20', '22', 'A', 20, NULL),
('MatDas', 'Nilai dari ³√343 ÷ ³√8 adalah...', '2.5', '3', '3.5', '4', 'A', 20, NULL),
('MatDas', 'Hasil dari ³√1000 - ³√27 × 2 adalah...', '4', '6', '8', '10', 'A', 20, NULL),

-- Mixed Operations
('MatDas', 'Hasil dari (5 + 3)² - 4 × 6 adalah...', '40', '36', '32', '28', 'A', 20, NULL),
('MatDas', 'Nilai dari 3² + 4² - 2 × 3 × 4 cos 60° adalah...', '13', '15', '17', '19', 'A', 20, NULL),
('MatDas', 'Hasil dari |−8| + |5| − |−3| adalah...', '8', '10', '12', '14', 'B', 20, NULL),
('MatDas', 'Nilai dari ⌊4.7⌋ + ⌈3.2⌉ adalah...', '7', '8', '9', '10', 'B', 20, NULL),
('MatDas', 'Hasil dari max(3, 7, 2) + min(8, 4, 6) adalah...', '10', '11', '12', '13', 'B', 20, NULL);
