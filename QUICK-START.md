# ⚡ Quick Start - Deploy Portfolio dalam 5 Menit

## 🎯 Cara Tercepat: Deploy ke Vercel

### Opsi 1: One-Click Deploy (TERMUDAH)

1. **Klik tombol ini:**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/siberbot88/new-portofolio-boy)

2. **Login dengan GitHub**

3. **Klik "Deploy"**

4. **Selesai!** ✅ Website Anda sudah live dalam 2-3 menit

---

### Opsi 2: Via Vercel Dashboard (RECOMMENDED)

#### Step 1: Buka Vercel
```
https://vercel.com
```

#### Step 2: Import Project
1. Klik **"Add New..."** → **"Project"**
2. Pilih **"Import Git Repository"**
3. Cari: `siberbot88/new-portofolio-boy`
4. Klik **"Import"**

#### Step 3: Configure (Biarkan Default)
```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### Step 4: Deploy
1. Klik **"Deploy"**
2. Tunggu 2-3 menit
3. **Done!** 🎉

#### Step 5: Dapatkan URL
Vercel akan memberikan URL seperti:
```
https://new-portofolio-boy.vercel.app
```

---

### Opsi 3: Via Command Line (UNTUK DEVELOPER)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (dari folder project)
vercel

# 4. Deploy ke Production
vercel --prod
```

---

## 🌐 Custom Domain (Optional)

### Di Vercel:

1. Buka project di Vercel Dashboard
2. **Settings** → **Domains**
3. Tambahkan domain Anda (contoh: `bayuportfolio.com`)
4. Update DNS di provider domain Anda:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

5. Tunggu propagasi DNS (5-30 menit)
6. **Selesai!** Domain custom sudah aktif

---

## 🔧 Update Website Setelah Deploy

### Cara Update Content:

1. **Edit file lokal** (misalnya `data/projects.ts`)

2. **Commit dan Push:**
```bash
git add .
git commit -m "Update project data"
git push origin main
```

3. **Vercel otomatis deploy ulang!** ✨
   - Tidak perlu klik apa-apa
   - Website update dalam 2-3 menit

---

## 📊 Monitoring

### Cek Status Deploy:
1. Buka Vercel Dashboard
2. Pilih project Anda
3. Lihat tab **"Deployments"**

### Lihat Analytics:
1. Tab **"Analytics"** untuk visitor stats
2. Tab **"Logs"** untuk debugging

---

## ❓ Troubleshooting

### Build Failed?

**Solusi 1: Clear Cache**
```bash
# Di Vercel Dashboard
Settings → General → Clear Build Cache
```

**Solusi 2: Check Logs**
```bash
# Di Vercel Dashboard
Deployments → [Latest] → View Function Logs
```

**Solusi 3: Test Build Lokal**
```bash
npm install
npm run build
```

### Domain Tidak Connect?

1. **Cek DNS Settings** di domain provider
2. **Tunggu propagasi** (bisa sampai 48 jam, biasanya 30 menit)
3. **Cek status** di: https://dnschecker.org

### Website Lambat?

1. **Optimize Images**: Compress gambar di `/public/projects/`
2. **Check Vercel Analytics**: Lihat bottleneck
3. **Enable Caching**: Sudah otomatis di Vercel

---

## 🎨 Customization Cepat

### Ganti Nama & Info:

**File: `app/layout.tsx`**
```typescript
export const metadata = {
  title: 'Nama Anda - Portfolio',
  description: 'Deskripsi Anda',
}
```

### Tambah Project Baru:

**File: `data/projects.ts`**
```typescript
{
  id: 'project-baru',
  title: 'Project Baru',
  year: '2024',
  category: 'Web Development',
  tags: ['React', 'Next.js'],
  description: 'Deskripsi project',
  image: '/projects/project-baru.png',
  featured: true,
}
```

### Ganti Warna:

**File: `app/globals.css`**
```css
:root {
  --background: #ffffff;
  --foreground: #000000;
}
```

---

## 📱 Share Portfolio Anda

Setelah deploy, share link Anda:

```
🌐 Portfolio: https://new-portofolio-boy.vercel.app
📧 Email: your-email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐙 GitHub: github.com/siberbot88
```

---

## 🎉 Selesai!

Portfolio Anda sekarang **LIVE** dan bisa diakses dari mana saja!

### Next Steps:
- ✅ Share link ke LinkedIn
- ✅ Tambahkan ke CV
- ✅ Update project secara berkala
- ✅ Monitor analytics

### Butuh Bantuan?
- 📖 Baca [DEPLOYMENT.md](./DEPLOYMENT.md) untuk detail lengkap
- 📚 Lihat [README.md](./README.md) untuk dokumentasi
- 🐛 Report issues di GitHub

---

**Total Waktu Deploy: 5 Menit** ⚡

Made with ❤️ by Mohammad Bayu
