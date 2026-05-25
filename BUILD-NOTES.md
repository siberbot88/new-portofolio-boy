# 🔧 Build Notes

## ⚠️ Windows Path Issue

Jika Anda mengalami error build di Windows dengan pesan:
```
The provided value contains exclamation mark (!) which is not allowed
```

**Penyebab**: Path folder mengandung karakter khusus (`!`) yang tidak diizinkan oleh Webpack.

**Solusi**:

### Opsi 1: Pindahkan Project (Recommended untuk Development Lokal)
```bash
# Pindahkan project ke path tanpa karakter khusus
# Dari: D:\!KULIAH BAYU\portofolio
# Ke: D:\kuliah-bayu\portofolio
# atau: C:\projects\portofolio
```

### Opsi 2: Gunakan Script Clean (Sudah Tersedia)
```bash
# Untuk development
npm run dev:clean

# Untuk build
npm run build:clean

# Untuk start
npm run start:clean
```

Script `*:clean` menggunakan PowerShell untuk membuat drive virtual sementara yang menghindari masalah path panjang dan karakter khusus.

### Opsi 3: Deploy Langsung (Tidak Perlu Build Lokal)
Deploy langsung ke Vercel/Netlify tanpa build lokal. Platform deployment menggunakan Linux yang tidak memiliki masalah ini.

---

## ✅ Build di Production (Vercel/Netlify)

Build akan **BERHASIL** di Vercel/Netlify karena:
- ✅ Menggunakan Linux (tidak ada masalah path Windows)
- ✅ Path tidak mengandung karakter khusus
- ✅ Environment production sudah dioptimasi

**Tidak perlu khawatir!** Error build lokal tidak akan terjadi di production.

---

## 📝 Available Scripts

### Standard (Linux/Mac/Production)
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
```

### Windows dengan Path Khusus
```bash
npm run dev:clean    # Development dengan clean path
npm run build:clean  # Build dengan clean path
npm run start:clean  # Start dengan clean path
```

### Utilities
```bash
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run styles:build # Build Tailwind CSS
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Tidak perlu build lokal
# Langsung push ke GitHub, Vercel akan build otomatis
git push origin main
```

### Netlify
```bash
# Sama seperti Vercel
git push origin main
```

### VPS/Server
```bash
# Clone di server (Linux)
git clone https://github.com/siberbot88/new-portofolio-boy.git
cd new-portofolio-boy
npm install
npm run build  # Akan berhasil di Linux
npm start
```

---

## 🔍 Troubleshooting

### Error: "powershell: command not found"
**Platform**: Linux/Mac/Vercel/Netlify
**Solusi**: Gunakan script standard (`npm run build`), bukan `*:clean`

### Error: "exclamation mark (!) not allowed"
**Platform**: Windows dengan path khusus
**Solusi**: 
1. Gunakan `npm run build:clean`
2. Atau pindahkan project ke path normal

### Error: "Turbopack not supported"
**Platform**: Windows dengan WASM bindings
**Solusi**: Script sudah menggunakan `--webpack` flag

---

## 💡 Tips

1. **Development Lokal di Windows**: Gunakan script `*:clean`
2. **Deployment**: Gunakan script standard (otomatis di Vercel/Netlify)
3. **Production Server**: Script standard akan bekerja di Linux
4. **Best Practice**: Hindari karakter khusus di path project

---

Made with ❤️ by Mohammad Bayu
