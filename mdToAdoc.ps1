$sourceFolder = ""
$targetFolder = ""

if (-not (Test-Path -Path $targetFolder)) {
    New-Item -ItemType Directory -Path $targetFolder | Out-Null
}

Get-ChildItem -Path $sourceFolder -Filter *.md -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Substring($sourceFolder.Length).TrimStart('\')
    $outputPath = Join-Path $targetFolder ($relativePath -replace '\.md$', '.adoc')
    $outputDir = Split-Path -Path $outputPath
    if (-not (Test-Path -Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }

    pandoc $_.FullName -f markdown -t asciidoc -o $outputPath
    Write-Host "Converted: $($_.FullName) → $outputPath"
}
