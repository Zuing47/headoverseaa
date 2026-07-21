Get-ChildItem -Path 'public/videos' -File -Filter '*.mp4' | ForEach-Object {
    $f = $_.FullName
    $info = ffprobe -v error -select_streams a -show_entries stream=codec_name,bit_rate -of default=noprint_wrappers=1 $f 2>&1
    $has = if ($info) { "AUDIO: $info" } else { "no audio" }
    Write-Output "$($_.Name) -> $has"
}
