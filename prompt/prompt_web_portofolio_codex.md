# Prompt Codex Web Portofolio

## Konteks Desain

Prompt ini dibuat untuk membangun web portofolio personal menggunakan Codex, dengan gaya desain **Modern Minimalist & Utilitarian** sesuai blueprint `design.md`.

Arah utama desain:

- Portofolio terasa seperti direktori data atau software interface, bukan galeri gambar biasa.
- Struktur navigasi dangkal, semua proyek dapat dicapai maksimal dalam 2 klik.
- Menggunakan grid disiplin, idealnya 12 kolom.
- Menggunakan border tipis untuk menciptakan kesan tabular.
- Warna interface netral dan monokrom.
- Warna cerah hanya digunakan pada konten proyek atau thumbnail.
- Halaman utama berbentuk index table interaktif.
- Detail proyek berbentuk studi kasus linear seperti laporan penelitian atau product case study.

---

## Bagian 1, Setup Project

```text
Saya ingin membuat web portofolio personal dengan gaya Modern Minimalist & Utilitarian, terinspirasi dari arsitektur desain pada file design(2).md.

Tujuan:
Buat web portofolio yang terasa seperti direktori data atau software interface, bukan galeri biasa. Situs harus cepat, rapi, mudah dipindai, dan fokus pada daftar proyek.

Gunakan stack berikut:
- Next.js terbaru dengan App Router
- TypeScript
- Tailwind CSS
- Data proyek disimpan sementara di file lokal, misalnya /data/projects.ts
- Tidak perlu backend atau CMS dulu
- Gunakan struktur komponen yang bersih dan mudah dikembangkan

Tolong mulai dengan:
1. Membuat struktur project yang rapi.
2. Menyiapkan Tailwind CSS.
3. Membuat layout global.
4. Mengatur font sans-serif modern, gunakan Inter atau system font jika belum memasang font eksternal.
5. Mengatur warna dasar:
   - Background: #F4F4F4 atau #FAF8F5
   - Text: #111111 atau #1A1A1A
   - Border: #1A1A1A dengan opacity rendah
   - Accent: hijau botol redup atau biru royal tua
6. Pastikan desain responsive untuk desktop, tablet, dan mobile.

Jangan membuat desain yang terlalu dekoratif. Hindari card rounded berlebihan, shadow besar, gradient, animasi berat, atau warna terlalu ramai. Fokus pada grid, garis tipis, tipografi kecil, dan struktur tabular.
```

---

## Bagian 2, Struktur Folder dan Data Proyek

```text
Buat struktur folder untuk web portofolio ini:

/app
  /page.tsx
  /projects/[slug]/page.tsx
  /layout.tsx
  /globals.css

/components
  Header.tsx
  ProjectIndexTable.tsx
  ProjectRow.tsx
  ProjectHoverPreview.tsx
  ProjectFilter.tsx
  ProjectMetaTable.tsx
  CaseStudySection.tsx
  FooterNextProject.tsx

/data
  projects.ts

/lib
  utils.ts

Isi /data/projects.ts dengan beberapa contoh proyek dummy. Setiap project minimal memiliki data berikut:
- id
- slug
- number
- year
- title
- client
- category
- discipline
- role
- duration
- techStack
- thumbnail
- heroImage
- challenge
- methodology
- solution
- impactMetrics
- nextProjectSlug

Gunakan contoh data yang cocok untuk portofolio Business Analyst / UX Researcher / Digital Developer, misalnya:
1. Copenhagen Portal
2. E-Commerce Analytics Dashboard
3. Customer Journey Research
4. Internal Workflow Automation

Pastikan data cukup lengkap agar halaman index dan detail project bisa langsung tampil.
```

---

## Bagian 3, Layout Global dan Header

```text
Buat layout global sesuai arahan design(2).md.

Header harus memiliki 3 area:
1. Kiri:
   Mohammad Bayu — Business Analyst & Digital Developer

2. Tengah:
   Status dan waktu lokal, contoh:
   Available for Projects / 08:20 AM WIB

3. Kanan:
   Navigasi teks murni:
   Index
   Archive
   Info/Contact

Ketentuan desain:
- Header sticky di atas.
- Gunakan grid 12 kolom.
- Tinggi header ringkas.
- Border bawah tipis.
- Tidak menggunakan icon kecuali benar-benar perlu.
- Navigasi berupa teks, bukan button besar.
- Font kecil, sekitar 10pt sampai 11pt.
- Pada mobile, header boleh menjadi 2 baris tetapi tetap rapi.

Tambahkan fungsi waktu lokal WIB yang berjalan secara client-side. Jika perlu, buat komponen Header sebagai client component.
```

---

## Bagian 4, Halaman Utama Index Table

```text
Buat halaman utama sebagai index table interaktif.

Struktur utama:
- Bagian atas berisi intro singkat, maksimal 2 sampai 3 baris.
- Setelah itu tampilkan filter kategori.
- Lalu tampilkan tabel proyek.

Tabel proyek harus mengikuti kolom berikut:
1. No / Tahun
2. Nama Proyek
3. Kategori
4. Peran / Disiplin

Contoh tampilan baris:
01 / 2026 | Copenhagen Portal | Web App / Platform | Business Analysis / Frontend
02 / 2025 | E-Commerce Analytics Dashboard | Dashboard / Analytics | Data Analysis / UX Research

Ketentuan desain:
- Gunakan CSS Grid, bukan table HTML biasa jika lebih fleksibel.
- Gunakan sistem 12 kolom.
- Setiap baris memiliki border-bottom tipis.
- Hover baris mengubah background sedikit saja.
- Klik baris akan membuka halaman detail project berdasarkan slug.
- Seluruh halaman harus terasa seperti index data atau direktori proyek.
- Jangan gunakan kartu visual besar di halaman utama.
- Thumbnail hanya muncul saat hover, bukan tampil permanen.

Buat filtering instan:
- Filter kategori di atas tabel.
- Filter tidak reload halaman.
- Filter "All" untuk menampilkan semua project.
- Saat filter aktif, beri indikator warna aksen yang halus.
```

---

## Bagian 5, Hover Thumbnail Cursor-Tracking

```text
Tambahkan fitur hover thumbnail pada tabel project.

Perilaku:
- Saat cursor berada di atas salah satu baris project, tampilkan thumbnail project.
- Thumbnail muncul dekat cursor.
- Thumbnail mengikuti pergerakan cursor.
- Saat cursor keluar dari baris, thumbnail hilang.
- Thumbnail tidak boleh mengganggu klik pada baris.
- Gunakan position fixed dan pointer-events none.
- Gunakan transisi ringan, tetapi jangan terlalu animatif.
- Pada perangkat mobile atau touch screen, fitur hover thumbnail boleh dinonaktifkan.

Ketentuan visual thumbnail:
- Ukuran sekitar 280px sampai 360px di desktop.
- Border tipis warna gelap.
- Tidak perlu shadow besar.
- Gambar menggunakan object-cover.
- Jika image belum tersedia, gunakan placeholder visual sederhana berbasis warna netral.
```

---

## Bagian 6, Halaman Detail Studi Kasus

```text
Buat halaman detail project di /projects/[slug].

Struktur halaman studi kasus harus linear dan menyerupai laporan penelitian atau product case study.

Urutan halaman:
1. Hero Section
   - Full-bleed media berupa gambar besar.
   - Gunakan heroImage dari data project.
   - Tinggi minimal 70vh di desktop.
   - Gunakan object-cover.
   - Border bawah tipis.

2. Project Meta-Data
   Buat tabel ringkas 2 atau 4 kolom berisi:
   - Client / Industry
   - Duration
   - Role
   - Tech Stack

3. The Challenge
   - Tampilkan statement masalah dengan tipografi lebih besar.
   - Jangan terlalu dekoratif.
   - Gunakan layout grid agar teks tidak terlalu lebar.

4. Methodology / Experiment
   - Tampilkan proses kerja secara bertahap.
   - Jika data berupa array, tampilkan sebagai numbered sections.
   - Sediakan area untuk chart atau visualisasi data dummy.

5. The Solution
   - Tampilkan galeri screenshot atau layout solusi.
   - Gunakan lazy-loading pada image.
   - Tampilan tetap bersih, grid-based, dan tidak seperti galeri fotografi.

6. Impact & Metrics
   - Buat kotak highlight khusus untuk metrik.
   - Contoh:
     +24% Task Completion Rate
     -18% Manual Processing Time
     +31% Dashboard Adoption
   - Metrik harus terlihat jelas tetapi tetap minimal.

7. Footer Next Project
   - Di bagian paling bawah, tampilkan link besar:
     Next Project →
   - Link menuju nextProjectSlug.
   - Tambahkan border-top.
```

---

## Bagian 7, Design System dan Styling Detail

```text
Perbaiki styling global agar sesuai dengan design(2).md.

Aturan desain:
- Gunakan pendekatan Modern Minimalist & Utilitarian.
- Tampilan harus seperti software interface, direktori, atau data index.
- Struktur navigasi harus dangkal, seluruh project dapat dicapai maksimal dalam 2 klik.
- Gunakan grid 12 kolom secara konsisten.
- Gunakan border 1px atau border tipis untuk memisahkan area.
- Warna interface netral dan monokrom.
- Warna cerah hanya boleh muncul pada thumbnail atau konten proyek.
- Font utama sans-serif geometris atau neo-grotesque.
- Ukuran teks utama kecil, sekitar 10pt sampai 11pt.
- Judul utama sekitar 18pt sampai 24pt.
- Hindari:
  - gradient
  - neumorphism
  - glassmorphism
  - rounded corner besar
  - shadow tebal
  - animasi berlebihan
  - warna aksen terlalu banyak

Tambahkan utility class atau CSS custom properties untuk:
- --background
- --foreground
- --border
- --muted
- --accent

Pastikan spacing konsisten dan layout tetap nyaman dibaca.
```

---

## Bagian 8, Responsive dan Accessibility

```text
Pastikan web portofolio responsive dan accessible.

Responsive:
- Desktop:
  Gunakan 12-column grid penuh.
- Tablet:
  Kolom table boleh sedikit dipadatkan.
- Mobile:
  Project row boleh berubah menjadi layout stacked:
  No / Tahun di atas,
  Nama proyek sebagai teks utama,
  Kategori dan peran di bawahnya.

Accessibility:
- Semua link harus bisa diakses keyboard.
- Tambahkan focus-visible style.
- Pastikan contrast teks cukup.
- Gambar harus memiliki alt text.
- Jangan mengandalkan hover saja untuk informasi penting.
- Cursor-tracking thumbnail hanya enhancement, bukan informasi utama.

Performance:
- Gunakan next/image untuk gambar.
- Aktifkan lazy-loading untuk gambar galeri.
- Hindari library animasi berat jika tidak perlu.
- Pastikan halaman tetap cepat saat dibuka.
```

---

## Bagian 9, Final Testing dan Debugging

```text
Lakukan pengecekan akhir project.

Pastikan:
1. npm install berhasil.
2. npm run dev berhasil.
3. Halaman utama terbuka tanpa error.
4. Header tampil sesuai desain.
5. Waktu WIB muncul dan berjalan.
6. Filter kategori bekerja tanpa reload.
7. Hover thumbnail muncul di desktop.
8. Klik project row membuka halaman detail.
9. Halaman detail project berhasil membaca slug.
10. Jika slug tidak ditemukan, tampilkan notFound().
11. Next Project link bekerja.
12. Tidak ada error TypeScript.
13. Tidak ada error ESLint penting.
14. Layout mobile tetap rapi.
15. Semua gambar memiliki alt text.

Jika ada error, perbaiki sampai project bisa berjalan dengan:
npm run dev

Setelah berhasil, berikan ringkasan:
- File apa saja yang dibuat.
- Fitur apa saja yang sudah selesai.
- Cara menjalankan project.
- Catatan pengembangan lanjutan jika nanti ingin menambahkan CMS asli.
```

---

## Bagian 10, Prompt Sekali Jalan untuk Codex

```text
Buat web portofolio personal menggunakan Next.js terbaru, TypeScript, Tailwind CSS, dan App Router. Sesuaikan desain dengan file design(2).md.

Konsep utama:
Web portofolio harus menggunakan gaya Modern Minimalist & Utilitarian. Situs terasa seperti direktori data atau software interface, bukan galeri gambar biasa. Fokus utama adalah index table proyek yang cepat dipindai, struktur navigasi dangkal, grid disiplin, border tipis, warna netral, dan interaksi sederhana.

Stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Data project lokal di /data/projects.ts
- Tidak perlu backend atau CMS dulu

Buat struktur:
- /app/page.tsx
- /app/projects/[slug]/page.tsx
- /app/layout.tsx
- /app/globals.css
- /components/Header.tsx
- /components/ProjectIndexTable.tsx
- /components/ProjectRow.tsx
- /components/ProjectHoverPreview.tsx
- /components/ProjectFilter.tsx
- /components/ProjectMetaTable.tsx
- /components/CaseStudySection.tsx
- /components/FooterNextProject.tsx
- /data/projects.ts
- /lib/utils.ts

Data project:
Buat beberapa project dummy yang cocok untuk portofolio Business Analyst / UX Researcher / Digital Developer:
1. Copenhagen Portal
2. E-Commerce Analytics Dashboard
3. Customer Journey Research
4. Internal Workflow Automation

Setiap project harus memiliki:
- id
- slug
- number
- year
- title
- client
- category
- discipline
- role
- duration
- techStack
- thumbnail
- heroImage
- challenge
- methodology
- solution
- impactMetrics
- nextProjectSlug

Header:
Gunakan layout 3 area:
- Kiri: Mohammad Bayu — Business Analyst & Digital Developer
- Tengah: Available for Projects / waktu lokal WIB
- Kanan: Index, Archive, Info/Contact
Header sticky, border-bottom tipis, teks kecil, dan responsive.

Halaman utama:
Buat index table interaktif dengan kolom:
1. No / Tahun
2. Nama Proyek
3. Kategori
4. Peran / Disiplin

Fitur halaman utama:
- Filter kategori instan tanpa reload.
- Filter All.
- Row project clickable menuju /projects/[slug].
- Hover row menampilkan thumbnail dekat cursor.
- Thumbnail mengikuti cursor.
- Thumbnail hilang saat cursor keluar.
- Disable hover thumbnail di mobile atau touch device.
- Jangan tampilkan thumbnail permanen di halaman utama.

Halaman detail project:
Buat struktur linear seperti laporan studi kasus:
1. Full-bleed hero image, tinggi minimal 70vh desktop.
2. Project meta-data table berisi Client / Industry, Duration, Role, Tech Stack.
3. The Challenge, teks besar dan jelas.
4. Methodology / Experiment, tampilkan proses bertahap.
5. The Solution, galeri screenshot dengan lazy-loading.
6. Impact & Metrics, highlight box untuk metrik.
7. Footer Next Project → menuju project berikutnya.

Design system:
- Background: #F4F4F4 atau #FAF8F5
- Text: #111111 atau #1A1A1A
- Border tipis: rgba(26,26,26,0.18)
- Accent: hijau botol redup atau biru royal tua
- Font: Inter atau system sans-serif
- Body text: kecil, sekitar 10pt sampai 11pt
- Main title: sekitar 18pt sampai 24pt
- Gunakan CSS Grid 12 kolom
- Hindari gradient, glassmorphism, shadow besar, rounded besar, dan animasi berat

Accessibility:
- Semua link keyboard accessible.
- Tambahkan focus-visible style.
- Gambar memiliki alt text.
- Contrast teks aman.
- Jangan jadikan hover sebagai satu-satunya sumber informasi penting.

Performance:
- Gunakan next/image.
- Lazy-load gambar galeri.
- Jangan pakai library animasi berat.
- Pastikan TypeScript bersih.

Testing:
Pastikan:
- npm install berhasil
- npm run dev berhasil
- Halaman utama tampil
- Header dan waktu WIB tampil
- Filter bekerja
- Hover thumbnail bekerja di desktop
- Klik project membuka detail page
- Dynamic route /projects/[slug] bekerja
- notFound() muncul jika slug tidak valid
- Next Project link bekerja
- Mobile layout rapi
- Tidak ada error TypeScript atau ESLint penting

Setelah selesai, berikan ringkasan file yang dibuat, fitur yang sudah selesai, cara menjalankan project, dan saran pengembangan berikutnya jika nanti ingin menambahkan CMS asli.
```

---

## Cara Pakai yang Disarankan

Gunakan **Bagian 10** jika ingin Codex mengerjakan langsung dari awal sampai selesai.

Gunakan **Bagian 1 sampai Bagian 9** jika ingin proses lebih terkontrol, misalnya menjalankan Codex bertahap per fitur.
