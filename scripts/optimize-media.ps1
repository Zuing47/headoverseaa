# Compress all public/videos/*.mp4 aggressively (720p, CRF 23, no audio except keep-audio list)
$keepAudio = @("videoplayback.mp4")
$skip = @("realestate.mov")
$videos = Get-ChildItem "public/videos" -Filter "*.mp4" -File
foreach ($v in $videos) {
  if ($skip -contains $v.Name) { continue }
  if ($v.Name -match '^\d' -or $v.Name -match '\(1\)') {
    Write-Output "DELETE orphan $($v.Name)"
    Remove-Item $v.FullName -Force
    continue
  }
  $before = $v.Length
  $tmp = Join-Path $v.DirectoryName ("_opt_" + $v.Name)
  $audioArgs = if ($keepAudio -contains $v.Name) { @("-c:a","aac","-b:a","96k","-ac","1") } else { @("-an") }
  $args = @(
    "-y","-i",$v.FullName,
    "-vf","scale='min(1280,iw)':-2",
    "-c:v","libx264","-preset","medium","-crf","23",
    "-maxrate","2.2M","-bufsize","4.4M",
    "-profile:v","main","-pix_fmt","yuv420p",
    "-movflags","+faststart"
  ) + $audioArgs + @($tmp)
  & ffmpeg @args 2>$null
  if ((Test-Path $tmp) -and (Get-Item $tmp).Length -gt 50000) {
    $after = (Get-Item $tmp).Length
    if ($after -lt $before) {
      Move-Item -Force $tmp $v.FullName
      Write-Output ("OK {0}: {1:N2} -> {2:N2} MB" -f $v.Name, ($before/1MB), ($after/1MB))
    } else {
      Remove-Item $tmp -Force
      Write-Output ("KEEP {0} ({1:N2} MB)" -f $v.Name, ($before/1MB))
    }
  } else {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    Write-Output ("FAIL {0}" -f $v.Name)
  }
}

# Delete heavy unused
@(
  "public/videos/realestate.mov",
  "public/images/head/presence.mp4",
  "public/videos/us-city-skyline-sunset-web.mp4"
) | ForEach-Object {
  if (Test-Path $_) { Remove-Item $_ -Force; Write-Output "RM $_" }
}

# Compress heavy JPGs to web size
$imgs = @(
  "public/images/lawrencec1979-buildings-8271782.jpg",
  "public/images/mpewny-buildings-668616.jpg",
  "public/images/patricklfc93-new-york-7781184.jpg",
  "public/images/alexas_fotos-banner-3368374.jpg",
  "public/images/nginnhong-canyon-9215914.jpg",
  "public/images/howwecreatevalues.jpg",
  "public/images/fundo.jpg",
  "public/images/pexels-fabianoshow4-564869275-29560675.jpg",
  "public/images/private-equity.jpg",
  "public/images/erikawittlieb-house-2483336.jpg",
  "public/images/luxury-residential-real-estate.jpg",
  "public/images/nyc-chrysler-building-midtown.jpg",
  "public/images/us-skyline-hq.jpg",
  "public/images/us-skyline-presence.jpg",
  "public/images/eua2.jpg",
  "public/images/private.jpg"
)
foreach ($img in $imgs) {
  if (-not (Test-Path $img)) { continue }
  $before = (Get-Item $img).Length
  $tmp = $img + ".tmp.jpg"
  ffmpeg -y -i $img -vf "scale='min(1920,iw)':-2" -q:v 5 $tmp 2>$null
  if ((Test-Path $tmp) -and (Get-Item $tmp).Length -gt 10000 -and (Get-Item $tmp).Length -lt $before) {
    Move-Item -Force $tmp $img
    Write-Output ("IMG {0}: {1:N2} -> {2:N2} MB" -f (Split-Path $img -Leaf), ($before/1MB), ((Get-Item $img).Length/1MB))
  } else {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
  }
}

# PNG douglas2 -> jpg if smaller
if (Test-Path "public/images/douglas2.png") {
  $before = (Get-Item "public/images/douglas2.png").Length
  ffmpeg -y -i "public/images/douglas2.png" -vf "scale='min(1200,iw)':-2" -q:v 4 "public/images/douglas2.jpg" 2>$null
  if ((Test-Path "public/images/douglas2.jpg") -and (Get-Item "public/images/douglas2.jpg").Length -lt $before) {
    Write-Output ("douglas2 png->jpg {0:N2}->{1:N2}" -f ($before/1MB), ((Get-Item "public/images/douglas2.jpg").Length/1MB))
  }
}

Write-Output "DONE"
