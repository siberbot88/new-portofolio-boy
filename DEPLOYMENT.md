# 🚀 Panduan Deploy Portfolio Website

Repository: https://github.com/siberbot88/new-portofolio-boy.git

## 📋 Daftar Isi
1. [Deploy ke Vercel (Recommended)](#deploy-ke-vercel)
2. [Deploy ke Netlify](#deploy-ke-netlify)
3. [Deploy ke VPS/Server Sendiri](#deploy-ke-vps)
4. [Deploy ke GitHub Pages](#deploy-ke-github-pages)

---

## 🎯 Deploy ke Vercel (Recommended)

Vercel adalah platform terbaik untuk Next.js karena dibuat oleh tim yang sama.

### Langkah-langkah:

#### 1. Persiapan
```bash
# Pastikan semua perubahan sudah di-push
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Deploy via Vercel Dashboard
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub account
3. Klik **"Add New Project"**
4. Import repository: `siberbot88/new-portofolio-boy`
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

6. Klik **"Deploy"**

#### 3. Deploy via Vercel CLI (Alternative)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

### Environment Variables (Jika diperlukan)
Jika ada environment variables, tambahkan di Vercel Dashboard:
- Settings → Environment Variables
- Tambahkan variable yang diperlukan

### Custom Domain
1. Buka project di Vercel Dashboard
2. Settings → Domains
3. Tambahkan domain custom Anda
4. Update DNS records sesuai instruksi

---

## 🌐 Deploy ke Netlify

### Langkah-langkah:

#### 1. Via Netlify Dashboard
1. Buka [netlify.com](https://netlify.com)
2. Login dengan GitHub
3. Klik **"Add new site"** → **"Import an existing project"**
4. Pilih GitHub dan authorize
5. Pilih repository: `siberbot88/new-portofolio-boy`
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (kosongkan)

7. Klik **"Deploy site"**

#### 2. Buat netlify.toml (Optional)
```bash
# Buat file netlify.toml di root project
```

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### 3. Deploy via Netlify CLI (Alternative)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy

# Deploy ke production
netlify deploy --prod
```

---

## 🖥️ Deploy ke VPS/Server Sendiri

### Prerequisites:
- VPS dengan Ubuntu/Debian
- Node.js 20+ terinstall
- Nginx terinstall
- Domain (optional)

### Langkah-langkah:

#### 1. Setup Server
```bash
# SSH ke server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### 2. Clone dan Setup Project
```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/siberbot88/new-portofolio-boy.git portfolio
cd portfolio

# Install dependencies
sudo npm install

# Build project
sudo npm run build
```

#### 3. Setup PM2
```bash
# Start aplikasi dengan PM2
sudo pm2 start npm --name "portfolio" -- start

# Auto-start on reboot
sudo pm2 startup
sudo pm2 save
```

#### 4. Configure Nginx
```bash
# Buat config file
sudo nano /etc/nginx/sites-available/portfolio
```

Paste konfigurasi berikut:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 5. Setup SSL dengan Let's Encrypt (Optional)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

#### 6. Update Deployment Script
Buat file `deploy.sh`:
```bash
#!/bin/bash
cd /var/www/portfolio
git pull origin main
npm install
npm run build
pm2 restart portfolio
```

```bash
# Make executable
chmod +x deploy.sh

# Run untuk update
./deploy.sh
```

---

## 📄 Deploy ke GitHub Pages

**Note**: GitHub Pages tidak support Next.js SSR secara native. Perlu export static.

### Langkah-langkah:

#### 1. Update next.config.ts
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/new-portofolio-boy',
  assetPrefix: '/new-portofolio-boy/',
};

export default nextConfig;
```

#### 2. Update package.json
Tambahkan script:
```json
{
  "scripts": {
    "export": "npm run build && next export",
    "deploy": "npm run export && gh-pages -d out"
  }
}
```

#### 3. Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### 4. Deploy
```bash
# Build dan deploy
npm run deploy
```

#### 5. Configure GitHub Pages
1. Buka repository di GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` → `/ (root)`
5. Save

Website akan tersedia di: `https://siberbot88.github.io/new-portofolio-boy/`

---

## 🔧 Troubleshooting

### Build Error
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Port sudah digunakan
```bash
# Cek port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### PM2 tidak jalan
```bash
# Restart PM2
pm2 restart all

# Check logs
pm2 logs portfolio
```

---

## 📊 Monitoring & Maintenance

### Vercel
- Dashboard otomatis menampilkan analytics
- Logs tersedia di deployment details

### VPS
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs portfolio

# Monitor resources
pm2 monit
```

---

## 🎉 Selesai!

Portfolio Anda sekarang sudah live! 

**Quick Links:**
- Repository: https://github.com/siberbot88/new-portofolio-boy
- Vercel: (akan tersedia setelah deploy)
- Dokumentasi Next.js: https://nextjs.org/docs

**Tips:**
- Gunakan Vercel untuk deployment tercepat dan termudah
- Untuk kontrol penuh, gunakan VPS
- Selalu test build lokal sebelum deploy: `npm run build`
- Monitor performance dengan Lighthouse atau PageSpeed Insights

---

Made with ❤️ by Mohammad Bayu
