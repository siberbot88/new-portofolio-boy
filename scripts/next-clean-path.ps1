$ErrorActionPreference = "Stop"
$NextArgs = $args

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$CandidateLetters = @("P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z")
$DriveLetter = $CandidateLetters | Where-Object {
  -not (Get-PSDrive -Name $_ -ErrorAction SilentlyContinue)
} | Select-Object -First 1

if (-not $DriveLetter) {
  throw "No available drive letter for clean Next.js workspace alias."
}

$DriveName = "${DriveLetter}:"
$DriveRoot = "${DriveName}\"
$CreatedSubst = $false

try {
  subst $DriveName $ProjectRoot
  $CreatedSubst = $true

  Push-Location $DriveRoot
  & ".\node_modules\.bin\next.cmd" @NextArgs
  $ExitCode = $LASTEXITCODE
  Pop-Location

  exit $ExitCode
}
finally {
  if ((Get-Location).Path -eq $DriveRoot) {
    Pop-Location
  }

  if ($CreatedSubst) {
    subst $DriveName /D
  }
}
