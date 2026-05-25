# Arsitektur Desain Portofolio (Gaya Utilitarian / Index-Based)
*Terinspirasi dari mschristensen.com*

Dokumen ini memuat cetak biru (*blueprint*) arsitektur informasi, struktur tata letak, dan sistem interaksi untuk membangun portofolio digital modern yang mengutamakan efisiensi pemindaian data (*data scannability*).

---

## 1. Arsitektur Global & Filosofi Visual

Desain ini mengadopsi pendekatan **Modern Minimalist & Utilitarian**. Portofolio diperlakukan sebagai sebuah direktori atau perangkat lunak (*software interface*), bukan sekadar galeri gambar statis.

### Aturan Utama:
* **Struktur Datar (*Flat Architecture*):** Meminimalkan kedalaman navigasi. Pengunjung harus dapat menjangkau seluruh proyek dalam maksimal 2 kali klik.
* **Disiplin Grid:** Menggunakan sistem 12-kolom yang kaku (CSS Grid). Batas antar elemen dipertegas dengan garis tipis (`border: 1px solid`) untuk menciptakan kesan tabular yang bersih.
* **Kontras Fungsional:** Warna cerah diisolasi hanya untuk konten proyek (*thumbnail*), sementara antarmuka situs tetap menggunakan warna netral/monokrom agar tidak mendistorsi perhatian penonton.

---

## 2. Tata Letak Halaman Utama (Index & CMS)

Halaman utama berfungsi sebagai tabel data interaktif yang memuat ringkasan seluruh karya.

### A. Struktur Navigasi Atas (*Header*)
* **Kiri:** Nama & Peran Utama (contoh: *Mohammad Bayu — UX Researcher & Digital Developer*).
* **Tengah:** Indikator status atau data waktu lokal (contoh: *Tersedia untuk Proyek / 08:20 AM WIB*).
* **Kanan:** Menu navigasi berbasis teks murni (*Index, Archive, Info/Contact*).

### B. Komponen Daftar Proyek (*The Index Table*)
Menggunakan susunan baris (*rows*) berbasis data CMS dengan pembagian kolom berikut:

| Kolom 1 (No/Tahun) | Kolom 2 (Nama Proyek) | Kolom 3 (Kategori) | Kolom 4 (Peran/Disiplin) |
| :--- | :--- | :--- | :--- |
| `01 / 2026` | **Nama Aplikasi / Klien** | Web App / E-commerce | UX Research / Frontend |
| `02 / 2025` | **Nama Platform** | Systems & Platforms | Quantitative Analysis |

### C. Perilaku Interaksi (*Hover Behavior*)
* **Kursor Melayang (*Hover*):** Ketika kursor pengguna berada di atas salah satu baris proyek, sebuah *thumbnail* gambar proyek pratinjau muncul secara instan di dekat kursor dan bergerak mengikuti arah gerak kursor (*cursor-tracking thumbnail*).
* **Filter Instan:** Tautan kategori di bagian atas tabel dapat diklik untuk menyaring baris proyek secara langsung tanpa memuat ulang halaman (*zero-reload filtering*).

---

## 3. Struktur Detail Halaman Studi Kasus

Ketika baris proyek diklik, pengguna dialihkan ke halaman studi kasus linier yang dirancang menyerupai struktur laporan penelitian ilmiah yang sistematis.

### A. Pembuka (*Hero Section*)
* Visual penuh (*full-bleed media*) berupa video interaksi produk atau gambar antarmuka resolusi tinggi yang memenuhi area pandang.

### B. Blok Informasi Proyek (*Project Meta-Data*)
Tabel ringkas 2 atau 4 kolom untuk memberikan konteks instan sebelum membaca narasi:
* **Klien / Industri:** Nama perusahaan.
* **Durasi:** Batasan waktu pengerjaan (misal: *3 Bulan*).
* **Peran:** Tanggung jawab spesifik secara mendetail.
* **Tech Stack:** Teknologi atau alat yang digunakan (misal: *Webflow, Python, Figma*).

### C. Narasi & Artefak Penyelidikan
Bagian ini dibagi menjadi blok-blok teks vertikal yang bersih tanpa dekorasi:
1.  **Masalah (*The Challenge*):** Pernyataan masalah utama dengan tipografi berukuran besar (*oversized font*).
2.  **Metodologi / Eksperimen:** Penjelasan langkah demi langkah. Bagian ini sangat optimal untuk menyisipkan diagram batang, visualisasi data, atau grafik hasil analisis kuantitatif.
3.  **Solusi Akhir (*The Solution*):** Galeri tangkapan layar produk (*high-fidelity UI layout*) dengan fungsi *lazy-loading* untuk menjaga performa kecepatan situs.
4.  **Metrik Dampak (*Impact & Metrics*):** Kotak highlight khusus yang menampilkan data performa setelah solusi diimplementasikan (misal: *+24% Task Completion Rate*).

---

## 4. Spesifikasi Desain Sistem (Saran Parameter)

* **Tipografi:** Gunakan satu rumpun font Sans-Serif geometris atau neo-grotesque untuk seluruh elemen (misal: *Inter, Helvetica Neue, SF Pro, atau Satoshi*). 
    * *Ukuran Teks Utama:* 10pt - 11pt (menjaga kesan teknis yang rapat).
    * *Ukuran Judul Utama:* 18pt - 24pt (bersih, tidak terlalu masif).
* **Palet Warna:**
    * *Latar Belakang:* Abu-abu sangat terang (`#F4F4F4`), Off-white (`#FAF8F5`), atau Putih Murni (`#FFFFFF`).
    * *Teks & Garis:* Hitam pekat (`#000000`) atau Slate gelap (`#1A1A1A`).
    * *Warna Aksen:* Gunakan satu warna desaturasi hanya untuk penanda aktif/status (misal: Hijau botol redup atau Biru royal tua).

---

## 5. Alur Navigasi Keluar (*Footer*)
Di bagian paling bawah setiap halaman studi kasus, pasang tautan besar ke proyek berikutnya (*"Next Project →"*). Ini menjaga *user flow* tetap berputar di dalam portofolio Anda dan menurunkan *bounce rate*.
