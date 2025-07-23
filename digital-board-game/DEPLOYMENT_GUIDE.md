# Panduan Deployment Game Board Digital SPLDV ke Railway

## Persiapan Sebelum Deployment

### 1. Pastikan Struktur Proyek
```
digital-board-game/
├── backend/
│   ├── src/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   └── static/ (berisi build frontend)
│   ├── requirements.txt
│   ├── Procfile
│   └── railway.json
└── frontend/
    ├── dist/ (hasil build)
    └── package.json
```

### 2. Build Frontend
```bash
cd frontend
pnpm run build
cp -r dist/* ../backend/src/static/
```

### 3. Update Requirements
```bash
cd backend
source venv/bin/activate
pip freeze > requirements.txt
```

## Deployment ke Railway

### Opsi 1: Deploy via GitHub (Recommended)

1. **Push ke GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect ke Railway**
   - Buka https://railway.app
   - Klik "Sign in" dan login dengan GitHub
   - Klik "Deploy a new project"
   - Pilih "Deploy from GitHub Repo"
   - Pilih repository Anda
   - Railway akan otomatis detect dan deploy

3. **Konfigurasi Environment Variables**
   - Di dashboard Railway, buka tab "Variables"
   - Tambahkan:
     - `PORT`: 5000 (opsional, Railway auto-detect)
     - `FLASK_ENV`: production

### Opsi 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login dan Deploy**
   ```bash
   railway login
   cd backend
   railway init
   railway up
   ```

## Konfigurasi Database untuk Production

Jika ingin menggunakan PostgreSQL (recommended untuk production):

1. **Tambah PostgreSQL Service di Railway**
   - Di dashboard project, klik "New Service"
   - Pilih "PostgreSQL"
   - Railway akan provide connection string

2. **Update Backend Code**
   ```python
   # Di main.py, ganti SQLite dengan PostgreSQL
   import os
   
   # Untuk production
   if os.environ.get('DATABASE_URL'):
       app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
   else:
       # Untuk development
       app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
   ```

3. **Install psycopg2**
   ```bash
   pip install psycopg2-binary
   pip freeze > requirements.txt
   ```

## Testing Deployment

1. **Cek URL yang diberikan Railway**
   - Format: `https://your-app-name.up.railway.app`

2. **Test Fitur Utama**
   - Login siswa/guru/admin
   - Socket.IO connection
   - Game functionality
   - Export Excel

## Troubleshooting

### Common Issues:

1. **Build Failed**
   - Pastikan requirements.txt up to date
   - Cek Python version compatibility

2. **Static Files Not Found**
   - Pastikan frontend sudah di-build dan copy ke backend/src/static/

3. **Socket.IO Connection Failed**
   - Pastikan CORS configured properly
   - Check Railway logs untuk error details

4. **Database Issues**
   - Untuk SQLite: pastikan folder database/ exists
   - Untuk PostgreSQL: pastikan connection string benar

### Monitoring

- **Logs**: Railway dashboard > Logs tab
- **Metrics**: Railway dashboard > Metrics tab
- **Health Check**: Railway auto-monitor via healthcheckPath

## Maintenance

1. **Update Deployment**
   - Push ke GitHub (auto-deploy)
   - Atau: `railway up` via CLI

2. **Backup Database**
   - Untuk PostgreSQL: gunakan Railway backup feature
   - Untuk SQLite: download file database

3. **Scaling**
   - Railway auto-scale berdasarkan traffic
   - Bisa set manual limits di dashboard

## Security Notes

- Ganti SECRET_KEY di production
- Disable debug mode
- Set proper CORS origins
- Use environment variables untuk sensitive data

## Support

Jika ada masalah deployment:
1. Cek Railway documentation: https://docs.railway.app
2. Cek logs di Railway dashboard
3. Test locally terlebih dahulu

