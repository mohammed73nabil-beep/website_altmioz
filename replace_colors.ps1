$files = Get-ChildItem -Path 'resources' -Recurse -Include *.jsx,*.css,*.php | Where-Object { -not $_.DirectoryName.Contains('vendor') -and -not $_.DirectoryName.Contains('node_modules') }
$files += Get-Item 'tailwind.config.js'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    $content = $content -replace '(?i)#dba61f', '#22C55E'
    $content = $content -replace '(?i)#C9A227', '#16A34A'
    $content = $content -replace '(?i)#e3c059', '#4ADE80'
    $content = $content -replace '(?i)#0B1F3A', '#064E3B'
    $content = $content -replace '(?i)#071324', '#022C22'
    $content = $content -replace '(?i)rgba\(219, 166, 31, 0\.5\)', 'rgba(34, 197, 94, 0.5)'
    $content = $content -replace '(?i)rgba\(232, 192, 79, 0\.4\)', 'rgba(74, 222, 128, 0.4)'
    $content = $content -replace 'gold-gradient', 'green-gradient'
    $content = $content -replace 'text-gold', 'text-green'
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Output "Updated $($file.FullName)"
    }
}
