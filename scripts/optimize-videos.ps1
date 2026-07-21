$ErrorActionPreference = "Continue"
$PSNativeCommandUseErrorActionPreference = $false
$dir = "public/videos"
$crf = 21
$preset = "slow"

# name => scale filter ("" = no rescale)
$targets = [ordered]@{
    "niagara-falls-sunrise.mp4"        = "scale=-2:1080"
    "ocean-navigation.mp4"             = "scale=-2:1080"
    "back-portrait-a.mp4"              = "scale=1080:-2"
    "back-portrait-b.mp4"              = "scale=1080:-2"
    "back-markets.mp4"                 = ""
    "founder-us-presence.mp4"          = ""
    "contact.mp4"                      = ""
    "drakkar.mp4"                      = ""
    "riolaser.mp4"                     = ""
    "roadpro.mp4"                      = ""
    "once.mp4"                         = ""
    "us-city-skyline-sunset-web.mp4"   = ""
}

foreach ($name in $targets.Keys) {
    $src = Join-Path $dir $name
    $tmp = Join-Path $dir ("_opt_" + $name)
    $scale = $targets[$name]

    if (-not (Test-Path $src)) {
        Write-Output "SKIP (missing): $name"
        continue
    }

    $beforeBytes = (Get-Item $src).Length

    $args = @("-y", "-i", $src)
    if ($scale -ne "") {
        $args += @("-vf", $scale)
    }
    $args += @("-c:v", "libx264", "-preset", $preset, "-crf", "$crf", "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", $tmp)

    Write-Output "=== Encoding $name (scale: $(if ($scale) {$scale} else {'none'})) ==="
    & ffmpeg @args 2>&1 | Select-Object -Last 3

    if ((Test-Path $tmp) -and (Get-Item $tmp).Length -gt 10000) {
        $afterBytes = (Get-Item $tmp).Length
        $beforeMb = [math]::Round($beforeBytes / 1MB, 2)
        $afterMb = [math]::Round($afterBytes / 1MB, 2)
        $pct = [math]::Round((1 - ($afterBytes / $beforeBytes)) * 100, 1)
        Write-Output "  $beforeMb MB -> $afterMb MB  (-$pct%)"
        Move-Item -Force $tmp $src
    } else {
        Write-Output "  FAILED - keeping original for $name"
        if (Test-Path $tmp) { Remove-Item $tmp }
    }
}
