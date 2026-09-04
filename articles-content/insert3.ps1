$ErrorActionPreference = "Stop"
$baseDir = "C:\Users\DISDUK~1\AppData\Local\Temp\opencode\mahessa-clone\articles-content"
$k = (Get-Content "C:\Users\DISDUKCAPIL 3\Documents\Andhika_SMKN2\MahessaTransHoliday\.env.local" | Where-Object { $_.StartsWith("SUPABASE_SERVICE_ROLE_KEY=") }) -replace "^SUPABASE_SERVICE_ROLE_KEY=", ""
$articles = Get-Content "$baseDir\articles.json" -Raw | ConvertFrom-Json
$now = (Get-Date).ToUniversalTime().ToString("o")

$inserted = 0
$failed = 0
foreach ($a in $articles) {
    $content = Get-Content "$baseDir\$($a.file)" -Raw
    $body = @{
        slug              = $a.slug
        title             = $a.title
        excerpt           = $a.excerpt
        content           = $content
        cover_image_url   = $a.cover_image_url
        category          = $a.category
        status            = "published"
        meta_title        = $a.meta_title
        meta_description  = $a.meta_description
        published_at      = $now
        view_count        = 0
    } | ConvertTo-Json -Depth 10

    $tmpFile = "$baseDir\body.json"
    Set-Content -Path $tmpFile -Value $body -NoNewline -Encoding UTF8

    Write-Host "[*] Insert $($a.slug)..."
    $p = Start-Process -FilePath "curl.exe" -ArgumentList @(
        "-s", "-X", "POST",
        "https://rxhibmwhkjpfwirzvojt.supabase.co/rest/v1/articles",
        "-H", "apikey: $k",
        "-H", "Authorization: Bearer $k",
        "-H", "Content-Type: application/json",
        "-H", "Prefer: return=minimal",
        "--data-binary", "@$tmpFile",
        "--max-time", "30",
        "-o", "$baseDir\out.txt",
        "-w", "%{http_code}"
    ) -Wait -PassThru -NoNewWindow -RedirectStandardOutput "$baseDir\curl-out.txt" -RedirectStandardError "$baseDir\curl-err.txt"

    $code = (Get-Content "$baseDir\curl-out.txt" -ErrorAction SilentlyContinue | Select-Object -Last 1).Trim()
    $out = Get-Content "$baseDir\out.txt" -ErrorAction SilentlyContinue

    if ($code -eq "201" -or $code -eq "200") {
        Write-Host "[OK] $($a.slug) ($code)"
        $inserted++
    } else {
        Write-Host "[FAIL] $($a.slug) ($code): $out"
        $failed++
    }
}
Write-Host "---"
Write-Host "Inserted: $inserted, Failed: $failed"
