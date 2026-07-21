Get-ChildItem -Path 'public/videos' -File -Filter '*.mp4' | ForEach-Object {
    $f = $_.FullName
    $info = ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,bit_rate,codec_name -show_entries format=duration,size,bit_rate -of default=noprint_wrappers=1 $f 2>&1
    Write-Output "=== $($_.Name) ==="
    Write-Output $info
    Write-Output ""
}
