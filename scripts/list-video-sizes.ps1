Get-ChildItem -Path 'public/videos' -File | Sort-Object Length -Descending | ForEach-Object {
    $sizeMb = [math]::Round($_.Length / 1MB, 2)
    Write-Output ("$sizeMb MB`t$($_.Name)")
}
