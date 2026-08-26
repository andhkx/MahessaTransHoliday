# Mahessa Trans Holiday — Website Generation Prompt

**Last Updated:** 2026-08-26  
**Project:** Website Rebuild dari nol (Next.js + Tailwind + Cloudflare Pages)  
**Bahasa:** Indonesian (fokus ID dulu, EN later)  
**Target Audience:** Pengguna Indonesia + calon customer internasional  

---

## 📋 PROJECT BRIEF

### Latar Belakang
Mahessa Trans Holiday adalah layanan rental mobil dan perjalanan wisata berbasis di Cimahi, Bandung, dan Padalarang. Mereka menyediakan:
- Rental mobil lepas kunci (12 jam & 24 jam)
- Rental mobil dengan driver
- Charter & transfer (antar-jemput point to point)
- Paket wisata (city tour, perjalanan dinas, wisata luar kota)

Tujuan: Rebuild website lama (Laravel) menjadi website modern (Next.js) dengan focus pada mobile-first, SEO, dan conversion via WhatsApp.

### Key Metrics
- Mobile-first responsive design
- Page load performance: Desktop 95+, Mobile 90+ (Lighthouse)
- Reservasi hanya via WhatsApp (no payment gateway needed)
- Single landing page + detail pages untuk mobil & paket

---

## 🎨 DESIGN DIRECTION

### Brand Identity
- **Logo:** Mahessa Trans Holiday (airplane + car fusion design)
- **Primary Color:** Biru Tua/Medium (dari logo) — `#004B96` atau `#0052A3`
- **Secondary Color:** Biru lebih terang
- **Accent Color:** Orange (`#F39C12`)
- **Tone:** Clean, trustworthy, premium — bukan terlalu corporate, tapi juga jangan casual
- **Vibe:** Dibikinin-style (hero → layanan → portfolio → pricing → FAQ → CTA) + Hitou aesthetic

### Typography & Components
- **Font:** Mengikuti Hitou.my.id style (modern sans-serif, besar untuk heading)
- **Navbar:** Glassmorphism effect (seperti Hitou)
- **Card Layout:** Rounded corners, clean spacing
- **Buttons:** CTA-focused, warna accent orange
- **Spacing:** Whitespace yang lega, mobile-friendly padding

### Visual Guidelines
- Foto mobil asli Mahessa (bukan mockup/ilustrasi)
- Galeri foto dokumentasi penumpang (social proof)
- Ikon simple untuk layanan
- Minimal animation (subtle, tidak distract)

---

## 🏗️ WEBSITE STRUCTURE

### Sitemap & Routes

```
/                          → Landing Page (home)
/armada                    → List semua kendaraan
/armada/[slug]             → Detail kendaraan (e.g., /armada/toyota-avanza)
/paket                     → List paket perjalanan
/paket/[slug]              → Detail paket (e.g., /paket/hiace-bandung)
/layanan                   → List layanan (upcoming, not priority v1)
/galeri                    → Gallery dokumentasi
/faq                       → Frequently Asked Questions
/kontak                    → Contact & location
```

**Priority v1:** Landing page + /armada + /armada/[slug] + /paket + /paket/[slug] + /galeri + /faq

---

## 📄 PAGE-BY-PAGE STRUCTURE

### 01 — Landing Page (/)

#### 01a — Navbar
- Logo Mahessa (kiri)
- Menu: Beranda | Layanan | Armada | Paket | Galeri | FAQ
- CTA: Tombol "WhatsApp" (warna accent orange)
- Mobile: Hamburger menu
- Style: Glassmorphism (backdrop blur, semi-transparent)

#### 01b — Hero Section
**Goal:** Dalam 3-5 detik, user tahu Mahessa itu apa & harus klik apa.

**Heading:**
```
Perjalanan nyaman,
kendaraan siap menemani.
```

**Subtext:**
```
Rental mobil lepas kunci, dengan driver, charter, hingga 
perjalanan wisata dan perjalanan dinas dari Cimahi, Bandung & Padalarang.
```

**CTA Buttons:**
- [ Konsultasi via WhatsApp ] (Primary, orange)
- [ Lihat Armada ] (Secondary)

**Visual:** Foto mobil Mahessa yang bagus (preferably Avanza atau Innova) — besar, eye-catching.

---

#### 01c — Quick Service (4 Cards)
**Section Title:** "Butuh perjalanan seperti apa?"

Tampilkan 4 pilihan utama dalam card layout (grid 2x2 mobile, 1x4 desktop):

**Card 1: Rental Mobil**
- Icon: 🚗
- Text: "Lepas kunci 12 atau 24 jam. Pilih sendiri, berkendara sendiri."
- CTA: "Lihat Armada →"

**Card 2: Mobil + Driver**
- Icon: 👨‍✈️
- Text: "Perjalanan lebih nyaman bersama driver berpengalaman Mahessa."
- CTA: "Tanya Driver →"

**Card 3: Charter & Transfer**
- Icon: 📍
- Text: "Antar-jemput dan perjalanan sesuai kebutuhan & jadwalmu."
- CTA: "Hubungi →"

**Card 4: Paket Wisata**
- Icon: 🌴
- Text: "City tour, wisata, hingga perjalanan luar kota. All-in solution."
- CTA: "Lihat Paket →"

---

#### 01d — Featured Armada (5-6 mobil)
**Section Title:** "Pilih kendaraan untuk perjalananmu"

Horizontal scroll (mobile) / grid (desktop). Tampilkan 3-4 di viewport, ada "Lihat Semua →" button.

**Card Layout:**
```
[ Foto Mobil ]

Toyota Avanza New TSS G
Automatic | 7 seats

Mulai Rp450.000 / 24 jam
Lepas Kunci · + Driver

[ Tanya via WhatsApp ]
```

**Mobil yang ditampilkan (recommendation):**
1. Honda Brio (entry-level)
2. Toyota Avanza (populer)
3. Toyota Innova Reborn (premium mid)
4. Alphard (luxury)
5. Hiace (group/charter)

---

#### 01e — Featured Paket Wisata (3-4 paket)
**Section Title:** "Perjalanan tanpa ribet"

Grid card (pricing-style, bukan carousel). Tampilkan 3-4, ada "Lihat Semua Paket →"

**Card Layout:**
```
Bandung

1 Hari

Mulai Rp1.300.000

[ Lihat Detail ]
```

**Paket yang ditampilkan (recommendation):**
1. Bandung (Rp1.3jt) — entry point
2. Garut (Rp1.5jt) — populer
3. Jakarta (Rp1.85jt) — high value
4. Bali (Rp12.75jt) — premium

---

#### 01f — Kenapa Mahessa? (Value Proposition)
**Section Title:** "Kenapa pilih Mahessa?"

**4 Benefit Cards (atau bisa text + icon):**

**Unit Terawat**
"Mobil bersih, terawat, dan siap digunakan untuk perjalananmu."

**Pilihan Fleksibel**
"Lepas kunci atau dengan driver, sesuai kebutuhan dan budget."

**Berbagai Kebutuhan**
"Wisata, city tour, airport transfer, charter, perjalanan dinas — semua kami layani."

**Pengalaman Terbukti**
"Telah melayani ratusan penumpang untuk berbagai jenis perjalanan dan kebutuhan."

---

#### 01g — Galeri (Photo Showcase)
**Section Title:** "Cerita perjalanan bersama Mahessa"

**Layout:**
- Foto besar di atas (featured)
- 4-6 foto kecil di bawah (grid)
- Mobile: 1 foto besar, 2 foto kecil per baris

**File naming:** galeri1.png, galeri2.png, galeri3.png, ... (simple, sistematis)

**CTA:** "Lihat Galeri Lengkap →" (link ke /galeri)

---

#### 01h — FAQ Section
**Section Title:** "Pertanyaan yang sering diajukan"

**Expand/Collapse cards (accordion)** — 6-8 pertanyaan penting:

1. **Apakah tersedia rental lepas kunci?**
   "Ya, semua unit kami tersedia untuk rental lepas kunci dengan durasi 12 jam atau 24 jam. Syarat: KTP, SIM A, dan data pendukung."

2. **Apakah semua mobil bisa dengan driver?**
   "Ya, semua unit di armada kami dapat disewa dengan driver profesional."

3. **Apa perbedaan harga 12 jam dan 24 jam?**
   "Harga 12 jam sedang kami update. Hubungi via WhatsApp untuk penawaran terkini."

4. **Apakah bisa antar-jemput dari Stasiun KCIC Padalarang?**
   "Ya, kami melayani charter dan transfer dari berbagai lokasi termasuk Stasiun KCIC Padalarang."

5. **Apakah harga paket sudah termasuk BBM?**
   "Ya, paket All In Hiace sudah termasuk mobil, driver, BBM, tol, parkir, dan tiket penyeberangan."

6. **Apakah melayani perjalanan luar kota?**
   "Ya, kami melayani perjalanan luar kota dalam maupun multi-hari. Lihat paket wisata untuk rute dan harga."

7. **Bagaimana cara reservasi?**
   "Hubungi kami via WhatsApp dengan detail kebutuhan perjalananmu (tanggal, lokasi, jenis kendaraan). Tim kami akan membantu."

8. **Apakah ada biaya tambahan selain harga yang tertera?**
   "Harga sudah fixed seperti tertera. Biaya tambahan (overtime, tujuan di luar coverage) akan dikonfirmasi sebelumnya."

---

#### 01i — CTA Section (Before Footer)
**Title:** "Sudah tahu mau pergi ke mana?"

**Text:**
```
Ceritakan kebutuhan perjalananmu, biar kami bantu pilihkan 
kendaraan dan layanan yang sesuai dengan budget dan jadwalmu.
```

**Button:** [ Konsultasi via WhatsApp ]

---

#### 01j — Footer
**Content:**
- **Brand:** Mahessa Trans Holiday + tagline: "Rental mobil, charter, wisata, dan perjalanan untuk berbagai kebutuhan."
- **Services:** Rental Mobil, Mobil + Driver, Charter & Transfer, Paket Wisata
- **Contact:** WhatsApp link, Alamat garasi, Google Maps embed
- **Social Media:** (Jika ada)
- **Copyright:** Tahun + company name

---

### 02 — Armada List Page (/armada)

**Hero/Header:**
```
Pilih kendaraan untuk perjalananmu

Kami punya berbagai pilihan mulai dari mobil compact hingga
kendaraan premium untuk setiap kebutuhan perjalanan.
```

**Content:**
- Grid 2 kolom (mobile) / 3-4 kolom (desktop)
- Tampilkan **14 unit** (semua dari pricelist)
- Card yang sama seperti di landing: foto, nama, transmisi, harga mulai, CTA

**Grouping (Optional — bisa ditambah nanti):**
- Entry Level: Brio, Terios
- Mid Range: Avanza, Rush, City
- Premium: Innova Reborn, Innova Zenix, Pajero, Fortuner
- Luxury: Alphard
- Group: Hiace

---

### 03 — Armada Detail Page (/armada/[slug])

**URL Example:** `/armada/toyota-avanza`, `/armada/toyota-innova-reborn`, dll.

**Page Struktur:**

#### 03a — Header + Hero
```
Toyota Avanza New TSS G

Rental Toyota Avanza di Cimahi, Bandung, dan Padalarang untuk 
kebutuhan keluarga, wisata, perjalanan dinas, maupun transfer.
```

Foto mobil besar (hero image).

---

#### 03b — Pricing Section

**Lepas Kunci:**
```
12 Jam       Mulai Rp... (atau "Hubungi untuk harga")
24 Jam       Rp450.000
```

**Dengan Driver:**
```
Mulai Rp... (atau "Hubungi untuk penawaran")
```

---

#### 03c — Spesifikasi Singkat (Table atau Card)
```
Kapasitas Penumpang    7 orang
Transmisi              Automatic
Bahan Bakar            Bensin
AC                     Full AC
Bagasi                 Luas
```

---

#### 03d — Deskripsi & Kegunaan

**Text:** 2-3 paragraf natural yang menjelaskan mobil ini cocok untuk apa.

Example untuk Avanza:
```
Toyota Avanza adalah pilihan tepat untuk keluarga atau rombongan 
kecil. Dengan kapasitas 7 penumpang dan konsumsi bahan bakar yang 
irit, Avanza cocok untuk perjalanan dalam kota maupun luar kota. 
Mobil ini terawat, bersih, dan siap untuk petualangan Anda.

Sangat cocok untuk:
- Perjalanan keluarga
- Wisata kelompok kecil
- Perjalanan dinas
- Airport transfer
```

---

#### 03e — Fasilitas & Features (Checklist atau Card)
```
✓ AC Dingin
✓ Audio System
✓ Power Steering
✓ Bagasi Luas
✓ Kursi Nyaman
✓ Window/Kaca Tinted
```

---

#### 03f — Galeri Mobil (2-4 foto)
Foto berbagai sudut mobil (bagian depan, samping, dalam, bagasi).

---

#### 03g — Bagaimana Memesan (Simple Steps)
```
1. Hubungi via WhatsApp dengan detail perjalanan (tanggal, durasi, tujuan)
2. Tim kami konfirmasi ketersediaan dan harga
3. Serah terima kunci (atau berangkat dengan driver)
4. Nikmati perjalanan!
```

---

#### 03h — CTA
```
Tertarik menggunakan Toyota Avanza?

[ Tanya via WhatsApp ]
```

**WhatsApp Message Template:**
```
Halo Mahessa Trans Holiday, saya ingin menanyakan ketersediaan 
Toyota Avanza New TSS G untuk rental. Saya ingin sewa [12/24 jam] 
pada tanggal [XX Bulan YYYY]. Berapa harganya?
```

---

#### 03i — Related Armada (Carousel/Links)
Tampilkan 3-4 mobil lain yang mungkin menarik (bisa based on tier atau popularity).

Contoh: Jika user liat Avanza, tampilkan Terios, Rush, dan Innova.

---

### 04 — Paket Wisata List Page (/paket)

**Hero/Header:**
```
Paket Perjalanan

Nikmati perjalanan tanpa ribet dengan paket all-in kami. 
Mobil, driver, BBM, tol, parkir — semua sudah termasuk.
```

**Content:**
- Grid atau card list
- Tampilkan **10 paket Hiace** (dari pricelist)
- Sorting/filter (optional): By duration, By price, Popular
- Card yang sama seperti landing: Tujuan, Durasi, Harga mulai, CTA

**Card Layout:**
```
Bandung

1 Hari

Mulai Rp1.300.000

[ Lihat Detail ]
```

---

### 05 — Paket Detail Page (/paket/[slug])

**URL Example:** `/paket/hiace-bandung`, `/paket/hiace-garut`, dll.

**Page Struktur:**

#### 05a — Header
```
Sewa Hiace Bandung 1 Hari

Paket perjalanan all-in dengan Toyota Hiace untuk perjalanan 
dari Bandung. Mobil, driver, BBM, tol, parkir, dan tiket 
penyeberangan sudah termasuk dalam paket.
```

---

#### 05b — Pricing
```
Mulai Rp1.300.000
```

---

#### 05c — Apa yang Termasuk (Include)
```
✓ Mobil Toyota Hiace (nyaman, full AC, bersih)
✓ Driver berpengalaman
✓ BBM (Bensin/Solar)
✓ Tol
✓ Parkir
✓ Tiket Penyeberangan (jika ada)
```

---

#### 05d — Apa yang Tidak Termasuk (Exclude)
```
✗ Retribusi Wisata / Tiket Masuk Atraksi
✗ Akomodasi Driver (untuk multi-hari)
✗ Makan-minum
✗ Overtime (per jam tambahan: Rp...)
```

---

#### 05e — Deskripsi Paket (2-3 paragraf)

Example untuk Bandung:
```
Paket ini dirancang untuk perjalanan city tour atau wisata 
dalam Kota Bandung. Dengan durasi 1 hari (8-10 jam), Anda 
dapat mengunjungi berbagai tempat menarik seperti Taman Hutan 
Raya Ir. Djuanda, kawasan Braga, atau pabrik-pabrik kerajinan.

Termasuk:
- Pickup dari lokasi Anda atau dari pusat Bandung
- Driver yang ramah dan tahu tempat-tempat menarik
- Perjalanan sesuai itinerary yang kamu inginkan

Durasi: 1 Hari
Durasi perjalanan adalah 8-10 jam mulai dari pickup.
```

---

#### 05f — Cocok Untuk (Use Cases)
```
✓ Wisata Keluarga
✓ Rombongan / Group
✓ Perjalanan Dinas
✓ Team Outing
✓ City Tour
```

---

#### 05g — Rute & Itinerary (Jika Ada)
Untuk paket multi-hari (Yogya, Bromo, Bali), bisa sertakan rough itinerary.

For 1-day packages (Bandung, Garut), cukup jelaskan area coverage.

---

#### 05h — FAQ Umum (Expandable)
3-4 pertanyaan yang khusus untuk paket ini:

Example untuk Bandung:
- "Apakah pickup dari lokasi saya?"
- "Berapa jam perjalanannya?"
- "Boleh ganti rute/tempat tujuan?"
- "Apakah bisa ditambah jam?"

---

#### 05i — CTA
```
Tertarik dengan Paket Bandung?

[ Tanya via WhatsApp ]
```

**WhatsApp Message Template:**
```
Halo Mahessa Trans Holiday, saya tertarik dengan Paket Hiace 
Bandung 1 Hari mulai Rp1.300.000. Saya ingin menanyakan 
ketersediaan untuk tanggal [XX Bulan YYYY]. Bagaimana prosesnya?
```

---

#### 05j — Related Paket (Links)
Tampilkan 3-4 paket lain (bisa sorted by: popularity, price, duration).

---

### 06 — Galeri Page (/galeri)

**Section Title:** "Cerita perjalanan bersama Mahessa"

**Layout:**
- Featured foto besar di atas (carousel atau single)
- Grid foto kecil di bawah (masonry atau grid layout)
- Mobile: 1 kolom, desktop: 2-3 kolom

**Foto Naming:** galeri1.png, galeri2.png, ... (sistematis)

**Catatan:** Ini dokumentasi penumpang real — social proof terkuat.

---

### 07 — FAQ Page (/faq)

Sama seperti di landing page, tapi bisa ditambah lebih banyak pertanyaan (15-20).

Expand/collapse accordion format.

---

### 08 — Contact Page (/kontak) [Optional, bisa di Footer aja]

**Content:**
- Alamat Garasi: [Lengkap]
- Nomor WhatsApp: +62 XXX XXXX XXXX
- Email: (jika ada)
- Jam Operasional: (jika ada)
- Google Maps Embed

---

## 📊 DATA STRUCTURE

### vehicles.ts
```typescript
export const vehicles = [
  {
    id: "honda-brio",
    slug: "honda-brio",
    name: "Honda Brio E AT",
    category: "entry", // entry, midrange, premium, luxury, group
    transmission: "Automatic",
    capacity: 5,
    fuelType: "Bensin",
    image: "/images/vehicles/honda-brio.jpg",
    pricing: {
      leaseKey: {
        "12h": null, // "Hubungi untuk harga" atau number
        "24h": 350000,
      },
      withDriver: {
        startingPrice: null,
      },
    },
    description: "Mobil compact dan irit untuk perjalanan dalam kota...",
    specs: [
      { label: "Kapasitas", value: "5 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Bensin" },
    ],
    suitableFor: ["Perjalanan keluarga", "City tour", "Airport transfer"],
    features: ["AC Dingin", "Power Steering", "Audio System"],
    serviceAreas: ["Cimahi", "Bandung", "Padalarang"],
    seo: {
      title: "Rental Honda Brio Cimahi & Bandung | Mahessa Trans Holiday",
      description: "Sewa Honda Brio di Cimahi, Bandung dan Padalarang. Tersedia lepas kunci 12/24 jam atau dengan driver. Hubungi Mahessa Trans Holiday.",
      keywords: ["rental brio", "sewa brio cimahi", "brio bandung"],
    },
  },
  // ... lebih banyak vehicles
];
```

### packages.ts
```typescript
export const packages = [
  {
    id: "hiace-bandung",
    slug: "hiace-bandung",
    destination: "Bandung",
    duration: "1 Hari",
    durationHours: 8, // untuk sorting
    price: 1300000,
    image: "/images/packages/bandung.jpg",
    description: "Paket city tour Bandung dengan Hiace...",
    included: [
      "Mobil Toyota Hiace",
      "Driver berpengalaman",
      "BBM",
      "Tol",
      "Parkir",
    ],
    excluded: [
      "Retribusi Wisata",
      "Akomodasi Driver",
      "Makan-minum",
    ],
    suitableFor: ["Wisata keluarga", "City tour", "Perjalanan dinas"],
    itinerary: null, // atau array steps
    serviceAreas: ["Cimahi", "Bandung", "Padalarang"],
    faq: [
      {
        q: "Apakah pickup dari lokasi saya?",
        a: "Ya, kami akan pickup Anda dari lokasi yang disepakati.",
      },
    ],
    seo: {
      title: "Sewa Hiace Bandung 1 Hari | Mahessa Trans Holiday",
      description: "Paket Hiace Bandung 1 hari mulai Rp1.300.000. Sudah termasuk mobil, driver, BBM, tol, dan parkir.",
      keywords: ["hiace bandung", "sewa hiace", "charter bandung"],
    },
  },
  // ... 10 paket lainnya
];
```

### faq.ts
```typescript
export const faqMain = [
  {
    id: "rental-lepas-kunci",
    question: "Apakah tersedia rental lepas kunci?",
    answer: "Ya, semua unit kami tersedia untuk rental lepas kunci...",
  },
  // ... lebih banyak
];
```

---

## 🎯 WHATSAPP INTEGRATION

Setiap CTA WhatsApp menggunakan template pesan yang smart:

**Di armada detail:**
```javascript
const generateWhatsAppLink = (vehicleName: string) => {
  const message = `Halo Mahessa Trans Holiday, saya ingin menanyakan ketersediaan ${vehicleName} untuk rental. Saya ingin sewa [12/24 jam] pada tanggal [XX Bulan YYYY]. Berapa harganya?`;
  return `https://wa.me/62XXX?text=${encodeURIComponent(message)}`;
};
```

**Di paket detail:**
```javascript
const generatePackageLink = (packageName: string, price: number) => {
  const message = `Halo Mahessa Trans Holiday, saya tertarik dengan Paket ${packageName} mulai Rp${price.toLocaleString('id-ID')}. Saya ingin menanyakan ketersediaan untuk tanggal [XX Bulan YYYY].`;
  return `https://wa.me/62XXX?text=${encodeURIComponent(message)}`;
};
```

---

## 🎨 COLOR PALETTE (From Logo)

```
Primary Blue:        #004B96 (atau #0052A3)
Secondary Blue:      #0066CC (terang)
Accent Orange:       #F39C12
Neutral Dark:        #1A1A1A
Neutral Light:       #F5F5F5
White:               #FFFFFF
```

**Usage:**
- Primary Blue: Navbar, headings, main CTA buttons
- Accent Orange: WhatsApp buttons, highlights, accents
- Neutral: Text, backgrounds, borders

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:  320px - 768px
Tablet:  768px - 1024px
Desktop: 1024px+
```

Mobile-first approach. Setiap component dirancang untuk work sempurna di mobile dulu.

---

## 🔍 SEO CHECKLIST

- [ ] Setiap halaman punya unique title & meta description
- [ ] H1, H2, H3 hierarchy correct
- [ ] Internal linking antar pages (detail mobil ↔ list armada, etc)
- [ ] Image alt text untuk semua foto
- [ ] Structured data (JSON-LD) untuk Organization, LocalBusiness
- [ ] Sitemap.xml generated
- [ ] robots.txt configured
- [ ] Performance: Lazy load images, optimize bundle size
- [ ] Mobile-friendly (test di Google Mobile-Friendly Test)

---

## ⚡ TECHNICAL REQUIREMENTS

### Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3+
- **Hosting:** Cloudflare Pages
- **Repository:** GitHub

### Project Structure
```
mahessa-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (landing)
│   │   ├── armada/
│   │   │   ├── page.tsx (list)
│   │   │   └── [slug]/
│   │   │       └── page.tsx (detail)
│   │   ├── paket/
│   │   │   ├── page.tsx (list)
│   │   │   └── [slug]/
│   │   │       └── page.tsx (detail)
│   │   ├── galeri/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   └── kontak/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── VehicleCard.tsx
│   │   ├── PackageCard.tsx
│   │   ├── FaqAccordion.tsx
│   │   └── ...
│   ├── data/
│   │   ├── vehicles.ts
│   │   ├── packages.ts
│   │   ├── services.ts
│   │   └── faq.ts
│   ├── lib/
│   │   ├── cn.ts (tailwind utility)
│   │   └── constants.ts
│   └── styles/
│       └── globals.css
├── public/
│   └── images/
│       ├── vehicles/
│       ├── packages/
│       └── gallery/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Performance Targets
- **Lighthouse Desktop:** 95+
- **Lighthouse Mobile:** 90+
- **First Contentful Paint:** < 1.5s
- **Cumulative Layout Shift:** < 0.1

### Image Optimization
- Next.js Image component (automatic optimization)
- WebP format for modern browsers
- Responsive srcset untuk mobile/desktop
- Lazy loading untuk below-fold images

---

## 📝 COPYWRITING GUIDELINES

**Tone:** Professional tapi friendly, tidak terlalu formal.

**DO:**
- Gunakan benefit language ("Nikmati perjalanan nyaman")
- Specific details (harga jelas, kapasitas jelas)
- Call-to-action yang action-oriented ("Tanya via WhatsApp", "Lihat Detail")
- Social proof (jika ada testimonial)

**DON'T:**
- Cliché generik ("Kami mengutamakan kepuasan pelanggan")
- Terlalu banyak adjective ("Amazing, Incredible, Awesome")
- Passive voice (gunakan active)
- Wall of text (gunakan whitespace, bullet points)

---

## 🚀 DEVELOPMENT PHASE

### Phase 1: Setup + Core Pages
1. Init Next.js + Tailwind + TypeScript
2. Setup file structure
3. Create data files (vehicles.ts, packages.ts, faq.ts)
4. Build Navbar + Footer (reusable components)
5. Build Landing Page
6. Build Armada List & Detail pages
7. Build Paket List & Detail pages

### Phase 2: Polish + SEO
1. Add metadata untuk setiap page
2. Optimize images
3. Add internal linking
4. Setup sitemap.xml
5. Performance testing (Lighthouse)
6. Mobile testing

### Phase 3: Launch + Monitoring
1. Deploy ke Cloudflare Pages
2. Setup custom domain (hitoustudio.my.id atau mahessaholiday.my.id)
3. Monitor performance di Google Search Console
4. Setup analytics (Vercel Analytics atau Google Analytics)

---

## ✅ DELIVERABLES CHECKLIST

- [ ] Landing page dengan semua sections
- [ ] Armada list & detail pages (14 unit)
- [ ] Paket list & detail pages (10 paket)
- [ ] Galeri page
- [ ] FAQ page
- [ ] Responsive design (mobile-first)
- [ ] Navbar + Footer dengan branding Mahessa
- [ ] WhatsApp integration (smart templates)
- [ ] Color scheme dari logo Mahessa
- [ ] SEO metadata per page
- [ ] Performance optimized (Lighthouse 95+/90+)
- [ ] GitHub ready, Cloudflare Pages ready

---

## 📞 CONTACT INFO [TO BE FILLED]

- **WhatsApp:** +62 [XXX]
- **Alamat:** [Alamat Garasi Mahessa]
- **Jam Operasional:** [Jam kerja]
- **Email:** [Email jika ada]

---

## 🎬 NEXT STEPS

1. AI generate seluruh component + pages (menggunakan prompt ini)
2. Cek output, validate structure
3. Manual refinement (copy, layout tweaks, if any)
4. Setup GitHub repo + Cloudflare Pages
5. Add images (galeri1.png, galeri2.png, dll)
6. Deploy & test di browser
7. Final QA (mobile, desktop, performance)

---

**End of Prompt**

---

**Usage Notes:**
- Prompt ini lengkap untuk dipakai dengan Deepseek API atau Claude API
- Cocok untuk di-execute via OpenCode atau any LLM completion endpoint
- AI akan generate component code, page structure, data files, dan styling (Tailwind)
- Ambil output, commit ke GitHub, deploy ke Cloudflare Pages
