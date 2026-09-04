$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Net.Http

$k = (Get-Content "C:\Users\DISDUKCAPIL 3\Documents\Andhika_SMKN2\MahessaTransHoliday\.env.local" | Where-Object { $_.StartsWith("SUPABASE_SERVICE_ROLE_KEY=") }) -replace "^SUPABASE_SERVICE_ROLE_KEY=", ""
$client = [System.Net.Http.HttpClient]::new()
$client.DefaultRequestHeaders.Add("apikey", $k) | Out-Null
$client.DefaultRequestHeaders.Add("Authorization", "Bearer $k") | Out-Null
$client.DefaultRequestHeaders.Add("Prefer", "return=representation") | Out-Null

$articles = @(
    @{
        slug = "10-tempat-wisata-lembang-bandung"
        title = "10 Tempat Wisata di Lembang Bandung yang Wajib Dikunjungi"
        category = "Destinasi"
        cover = "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200"
        excerpt = "Panduan lengkap tempat wisata Lembang: Tangkuban Perahu, Farmhouse, Dusun Bambu, Curug Maribaya, dan lainnya. Cocok untuk liburan keluarga dan gathering."
        meta_title = "10 Tempat Wisata Lembang Bandung 2026 | Mahessa"
        meta_description = "Panduan tempat wisata Lembang terbaik: Tangkuban Perahu, Farmhouse, Dusun Bambu, Curug Maribaya, Floating Market, dan lainnya. Itinerary + harga sewa Hiace dari Cimahi Bandung."
        file = "01-lembang.md"
    },
    @{
        slug = "panduan-liburan-ciwidey-1-hari"
        title = "Panduan Liburan ke Ciwidey 1 Hari: Kawah Putih, Ranca Upas, Rancabali"
        category = "Destinasi"
        cover = "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200"
        excerpt = "Itinerary Ciwidey 1 hari: Kawah Putih, Situ Patenggang, Ranca Upas. Estimasi biaya sewa Hiace All-In dari Bandung."
        meta_title = "Itinerary Ciwidey 1 Hari: Kawah Putih & Ranca Upas 2026 | Mahessa"
        meta_description = "Panduan liburan Ciwidey 1 hari lengkap: Kawah Putih, Ranca Upas, Situ Patenggang. Estimasi biaya Hiace All-In dari Bandung. Cocok untuk keluarga dan gathering."
        file = "02-ciwidey.md"
    },
    @{
        slug = "itinerary-pangandaran-2-hari-1-malam"
        title = "Itinerary Pangandaran 2 Hari 1 Malam: Green Canyon & Pantai Batu Karas"
        category = "Paket Wisata"
        cover = "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200"
        excerpt = "Paket Pangandaran 2D1N dari Bandung: itinerary lengkap Green Canyon, Pantai Barat, Batu Karas, dan estimasi biaya Hiace all-in."
        meta_title = "Paket Pangandaran 2 Hari 1 Malam dari Bandung 2026 | Mahessa"
        meta_description = "Itinerary Pangandaran 2 hari 1 malam dari Bandung: Green Canyon body rafting, Pantai Barat, Batu Karas. Paket Hiace all-in mulai Rp. 4.250.000. Cocok untuk long weekend."
        file = "03-pangandaran.md"
    },
    @{
        slug = "paket-wisata-garut-1-hari"
        title = "Rekomendasi Paket Wisata Garut 1 Hari: Kawah Kamojang, Situ Bagendit, Pantai Santolo"
        category = "Paket Wisata"
        cover = "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=1200"
        excerpt = "Paket Garut 1 hari dari Bandung: Kawah Kamojang, Situ Bagendit, Pantai Santolo. Itinerary + estimasi biaya Hiace all-in."
        meta_title = "Paket Wisata Garut 1 Hari dari Bandung 2026 | Mahessa"
        meta_description = "Paket Garut 1 hari dari Bandung: Kawah Kamojang, Situ Bagendit, Pantai Santolo, Curug Citiis. Itinerary lengkap dan biaya Hiace all-in mulai Rp. 1.300.000."
        file = "04-garut.md"
    },
    @{
        slug = "panduan-sewa-hiace-rombongan"
        title = "Panduan Sewa Hiace untuk Rombongan: Pilih Hiace Premio atau Commuter?"
        category = "Tips Rental"
        cover = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200"
        excerpt = "Panduan lengkap memilih Hiace Premio atau Commuter untuk rombongan: perbandingan kapasitas, harga, dan kapan pilih yang mana."
        meta_title = "Sewa Hiace Premio vs Commuter untuk Rombongan | Mahessa"
        meta_description = "Panduan sewa Hiace untuk rombongan: perbandingan Hiace Premio (14 kursi) dan Hiace Commuter (16 kursi). Tarif, kapasitas, dan kapan pilih masing-masing. Booking via WhatsApp."
        file = "05-hiace-rombongan.md"
    },
    @{
        slug = "tips-memilih-rental-mobil-terpercaya-bandung"
        title = "Tips Memilih Rental Mobil Terpercaya di Bandung & Cimahi"
        category = "Tips Rental"
        cover = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200"
        excerpt = "Tips memilih rental mobil terpercaya di Bandung: cek izin, kondisi mobil, lisensi driver, transparansi harga, dan track record. Hindari penipuan rental."
        meta_title = "Tips Memilih Rental Mobil Terpercaya Bandung & Cimahi | Mahessa"
        meta_description = "Panduan memilih rental mobil terpercaya di Bandung dan Cimahi: cek izin usaha, kondisi unit, lisensi driver, transparansi harga, dan review. Hindari rental abal-abal."
        file = "06-tips-rental-terpercaya.md"
    },
    @{
        slug = "panduan-perjalanan-bandung-bromo-2-hari-1-malam"
        title = "Panduan Perjalanan Bandung – Bromo 2 Hari 1 Malam"
        category = "Paket Wisata"
        cover = "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200"
        excerpt = "Paket Bromo 2D1N dari Bandung: itinerary sunrise Penanjakan, lautan pasir, kawah Bromo. Estimasi biaya Hiace all-in mulai Rp. 10 juta."
        meta_title = "Paket Bromo 2 Hari 1 Malam dari Bandung 2026 | Mahessa"
        meta_description = "Panduan perjalanan Bandung Bromo 2 hari 1 malam: itinerary sunrise Penanjakan, lautan pasir, kawah Bromo. Paket Hiace all-in mulai Rp. 10.000.000 termasuk Jeep 4WD."
        file = "07-bromo.md"
    },
    @{
        slug = "antar-jemput-bandara-kertajati-kcic-padalarang"
        title = "Antar Jemput Bandara Kertajati & KCIC Padalarang: Panduan Lengkap"
        category = "Antar Jemput"
        cover = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200"
        excerpt = "Tarif antar jemput Bandara Kertajati dari Bandung, plus layanan KCIC Padalarang Whoosh. Panduan lengkap untuk traveler dari Cimahi, Bandung, dan Padalarang."
        meta_title = "Antar Jemput Bandara Kertajati & KCIC Padalarang 2026 | Mahessa"
        meta_description = "Tarif antar jemput Bandara Kertajati dari Cimahi Bandung mulai Rp. 1.3 juta, plus KCIC Padalarang Whoosh dari Rp. 250rb. Panduan lengkap + cara pesan."
        file = "08-kcic-kertajati.md"
    }
)

$inserted = 0
$failed = 0
foreach ($a in $articles) {
    $contentPath = "C:\Users\DISDUK~1\AppData\Local\Temp\opencode\mahessa-clone\articles-content\$($a.file)"
    $content = Get-Content $contentPath -Raw

    $body = @{
        slug = $a.slug
        title = $a.title
        excerpt = $a.excerpt
        content = $content
        cover_image_url = $a.cover
        category = $a.category
        status = "published"
        meta_title = $a.meta_title
        meta_description = $a.meta_description
        published_at = (Get-Date).ToUniversalTime().ToString("o")
        view_count = 0
    } | ConvertTo-Json -Depth 10

    try {
        $task = $client.PostAsync("https://rxhibmwhkjpfwirzvojt.supabase.co/rest/v1/articles", [System.Net.Http.StringContent]::new($body, [System.Text.Encoding]::UTF8, "application/json"))
        $task.Wait()
        $resp = $task.Result
        $content = $resp.Content.ReadAsStringAsync()
        $content.Wait()
        $body_resp = $content.Result
        if ($resp.IsSuccessStatusCode) {
            Write-Host "[OK] $($a.slug)"
            $inserted++
        } else {
            Write-Host "[FAIL] $($a.slug) - $($resp.StatusCode): $body_resp"
            $failed++
        }
    } catch {
        Write-Host "[ERROR] $($a.slug): $_"
        $failed++
    }
}
Write-Host "---"
Write-Host "Inserted: $inserted, Failed: $failed"
