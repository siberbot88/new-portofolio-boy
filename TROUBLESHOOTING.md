# 🔧 Troubleshooting Guide

Panduan mengatasi masalah umum saat development dan deployment.

---

## 🚨 Build Errors

### Error: "npm run build exited with 127"

**Penyebab**: Build command tidak ditemukan atau script error.

**Solusi**:
```bash
# 1. Pastikan dependencies terinstall
npm install

# 2. Test build lokal
npm run build

# 3. Jika masih error, clear cache
rm -rf .next node_modules
npm install
npm run build
```

---

### Error: "Turbopack is not supported on this platform"

**Penyebab**: Turbopack memerlukan native bindings yang tidak tersedia di beberapa platform.

**Solusi untuk Windows**:
```bash
# Gunakan webpack instead
npm run build:windows
```

**Solusi untuk Vercel/Linux**: 
- Tidak perlu action, build script sudah otomatis menggunakan mode yang tepat
- Script `npm run build` akan jalan normal di Vercel

---

### Error: Path contains exclamation mark (!)

**Penyebab**: Webpack tidak mengizinkan karakter khusus seperti `!` di path folder.

**Contoh path bermasalah**:
```
D:\!KULIAH BAYU\portofolio  ❌
```

**Solusi**:
1. **Pindahkan project ke folder tanpa karakter khusus**:
```bash
# Contoh path yang aman:
D:\kuliah-bayu\portofolio  ✅
C:\projects\portfolio      ✅
```

2. **Atau gunakan PowerShell script** (sudah tersedia):
```bash
# Script otomatis membuat drive alias tanpa karakter khusus
npm run dev:windows
npm run build:windows
```

---

## 🌐 Deployment Errors

### Vercel: Build Failed

**Langkah troubleshooting**:

1. **Check Build Logs**
   - Buka Vercel Dashboard
   - Klik deployment yang failed
   - Lihat "Build Logs" untuk error detail

2. **Test Build Lokal**
```bash
# Simulate Vercel build
npm install
npm run build
```

3. **Clear Vercel Cache**
   - Vercel Dashboard → Settings → General
   - Scroll ke "Build & Development Settings"
   - Klik "Clear Build Cache"
   - Redeploy

4. **Check Environment Variables**
   - Pastikan semua env vars sudah diset
   - Vercel Dashboard → Settings → Environment Variables

---

### Vercel: Git Submodule Warning

**Warning**:
```
Warning: Failed to fetch one or more git submodules
```

**Penyebab**: Ada folder `tmp/repo-scan/` yang berisi git repositories.

**Solusi**:

**Opsi 1: Hapus folder tmp** (Recommended):
```bash
# Hapus folder tmp dari git
git rm -rf tmp/repo-scan
git commit -m "Remove git submodules from tmp folder"
git push origin main
```

**Opsi 2: Tambahkan ke .gitignore**:
```bash
# Edit .gitignore
echo "tmp/" >> .gitignore
git add .gitignore
git commit -m "Ignore tmp folder"
git push origin main
```

---

### Netlify: Build Failed

**Solusi**:
1. Check build command di `netlify.toml` atau dashboard
2. Pastikan: `npm run build`
3. Publish directory: `.next`

---

## 🖼️ Image Issues

### Images Not Loading

**Penyebab**: Path salah atau file tidak ada.

**Solusi**:
```typescript
// ✅ Correct path
image: '/projects/project-name.png'

// ❌ Wrong paths
image: 'projects/project-name.png'  // Missing leading /
image: '/public/projects/project-name.png'  // Don't include /public
```

**Check file exists**:
```bash
# Pastikan file ada di folder public
ls public/projects/
```

---

### Images Too Large

**Penyebab**: File size terlalu besar, memperlambat website.

**Solusi**:
```bash
# Compress images online:
# - TinyPNG: https://tinypng.com
# - Squoosh: https://squoosh.app

# Atau gunakan CLI tool
npm install -g sharp-cli
sharp -i input.png -o output.png --quality 80
```

**Recommended sizes**:
- Project thumbnails: < 200KB
- Hero images: < 500KB
- Icons: < 50KB

---

## 🎨 Styling Issues

### Tailwind Styles Not Applied

**Penyebab**: CSS belum di-build atau cache issue.

**Solusi**:
```bash
# 1. Rebuild Tailwind CSS
npm run styles:build

# 2. Clear Next.js cache
rm -rf .next

# 3. Restart dev server
npm run dev
```

---

### Custom CSS Not Working

**Penyebab**: Import order atau specificity issue.

**Solusi**:
```typescript
// app/layout.tsx
// Import order matters!
import './globals.css'  // ✅ Import first
```

---

## ⚡ Performance Issues

### Slow Page Load

**Diagnosis**:
```bash
# Run Lighthouse audit
# Chrome DevTools → Lighthouse → Generate Report
```

**Common fixes**:

1. **Optimize Images**:
```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image 
  src="/projects/image.png"
  width={800}
  height={600}
  alt="Project"
/>
```

2. **Lazy Load Components**:
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

3. **Reduce Bundle Size**:
```bash
# Analyze bundle
npm run build
# Check output for large modules
```

---

## 🔄 Git Issues

### Push Rejected

**Error**: `! [rejected] main -> main (fetch first)`

**Solusi**:
```bash
# Pull changes first
git pull origin main

# Then push
git push origin main
```

---

### Merge Conflicts

**Solusi**:
```bash
# 1. Pull latest changes
git pull origin main

# 2. Resolve conflicts in files
# Edit files marked with <<<<<<< HEAD

# 3. Add resolved files
git add .

# 4. Commit
git commit -m "Resolve merge conflicts"

# 5. Push
git push origin main
```

---

## 🔐 Environment Variables

### Env Vars Not Working

**Local Development**:
```bash
# Create .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=your-secret-key
```

**Vercel**:
1. Dashboard → Settings → Environment Variables
2. Add variables
3. Redeploy

**Important**:
- `NEXT_PUBLIC_*` = Available in browser
- Other vars = Server-side only

---

## 📱 Mobile Issues

### Layout Broken on Mobile

**Diagnosis**:
```bash
# Test responsive design
# Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
```

**Common fixes**:
```css
/* Use responsive units */
width: 100%;        /* ✅ */
width: 1200px;      /* ❌ */

/* Use Tailwind responsive classes */
<div className="w-full md:w-1/2 lg:w-1/3">
```

---

### Touch Events Not Working

**Solusi**:
```typescript
// Add touch event handlers
<div
  onTouchStart={handleTouch}
  onTouchEnd={handleTouchEnd}
>
```

---

## 🎭 Animation Issues

### GSAP Animations Not Working

**Penyebab**: GSAP not loaded atau timing issue.

**Solusi**:
```typescript
'use client'  // ✅ Add this for client components

import { useEffect } from 'react'
import gsap from 'gsap'

useEffect(() => {
  // Animations here
  gsap.to('.element', { x: 100 })
}, [])
```

---

### Lenis Smooth Scroll Not Working

**Solusi**:
```typescript
'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

useEffect(() => {
  const lenis = new Lenis()
  
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  
  return () => {
    lenis.destroy()
  }
}, [])
```

---

## 🐛 TypeScript Errors

### Type Errors

**Check types**:
```bash
npm run typecheck
```

**Common fixes**:
```typescript
// Add proper types
interface Project {
  id: string
  title: string
  // ...
}

// Use type assertion when needed
const data = response as Project[]
```

---

## 🔍 Debugging Tips

### Enable Verbose Logging

```bash
# Next.js debug mode
DEBUG=* npm run dev

# Vercel CLI debug
vercel --debug
```

---

### Check Console Errors

```javascript
// Browser Console (F12)
// Look for:
// - Red errors
// - Yellow warnings
// - Network failures
```

---

### Use React DevTools

```bash
# Install React DevTools extension
# Chrome: https://chrome.google.com/webstore
# Firefox: https://addons.mozilla.org/firefox
```

---

## 📞 Getting Help

Jika masalah masih berlanjut:

1. **Check Documentation**:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Tailwind Docs](https://tailwindcss.com/docs)

2. **Search Issues**:
   - GitHub Issues: https://github.com/siberbot88/new-portofolio-boy/issues
   - Stack Overflow: https://stackoverflow.com

3. **Create Issue**:
   - Buat issue baru di GitHub
   - Sertakan error message lengkap
   - Sertakan steps to reproduce

4. **Community Support**:
   - Next.js Discord: https://nextjs.org/discord
   - Vercel Discord: https://vercel.com/discord

---

## ✅ Prevention Checklist

Untuk menghindari masalah:

- [ ] Selalu test build lokal sebelum push
- [ ] Gunakan path folder tanpa karakter khusus
- [ ] Commit regularly dengan message yang jelas
- [ ] Update dependencies secara berkala
- [ ] Monitor Vercel deployment logs
- [ ] Backup sebelum major changes
- [ ] Test di multiple browsers
- [ ] Test responsive design
- [ ] Optimize images sebelum upload
- [ ] Use TypeScript untuk catch errors early

---

**Last Updated**: May 2026

Made with ❤️ by Mohammad Bayu
