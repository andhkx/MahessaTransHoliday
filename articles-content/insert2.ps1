$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Net.Http

$k = (Get-Content "C:\Users\DISDUKCAPIL 3\Documents\Andhika_SMKN2\MahessaTransHoliday\.env.local" | Where-Object { $_.StartsWith("SUPABASE_SERVICE_ROLE_KEY=") }) -replace "^SUPABASE_SERVICE_ROLE_KEY=", ""
$client = [System.Net.Http.HttpClient]::new()
$client.DefaultRequestHeaders.Add("apikey", $k) | Out-Null
$client.DefaultRequestHeaders.Add("Authorization", "Bearer $k") | Out-Null
$client.DefaultRequestHeaders.Add("Prefer", "return=representation") | Out-Null

$articles = Get-Content "C:\Users\DISDUK~1\AppData\Local\Temp\opencode\mahessa-clone\articles-content\articles.json" -Raw | ConvertFrom-Json

$inserted = 0
$failed = 0
foreach ($a in $articles) {
    $contentPath = "C:\Users\DISDUK~1\AppData\Local\Temp\opencode\mahessa-clone\articles-content\$($a.file)"
    $content = Get-Content $contentPath -Raw

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
        published_at      = (Get-Date).ToUniversalTime().ToString("o")
        view_count        = 0
    } | ConvertTo-Json -Depth 10

    try {
        $task = $client.PostAsync("https://rxhibmwhkjpfwirzvojt.supabase.co/rest/v1/articles", [System.Net.Http.StringContent]::new($body, [System.Text.Encoding]::UTF8, "application/json"))
        $task.Wait()
        $resp = $task.Result
        $rd = $resp.Content.ReadAsStringAsync()
        $rd.Wait()
        $body_resp = $rd.Result
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
