# install.ps1 — Windows installer for Cut Before Markers
# Run with: Right-click > Run with PowerShell

$extensionId   = "cut-before-markers"
$extensionName = "Cut Before Markers"

Write-Host ""
Write-Host "Installing $extensionName..." -ForegroundColor Cyan

# Destination
$dest = "$env:APPDATA\Adobe\CEP\extensions\$extensionId"

# Copy files
if (Test-Path $dest) {
    Remove-Item $dest -Recurse -Force
}
Copy-Item $PSScriptRoot $dest -Recurse -Exclude "install.ps1","install.sh","README.md"

Write-Host "  Copied to: $dest" -ForegroundColor Green

# Enable unsigned CEP extensions (required for unlisted extensions)
$regPath = "HKCU:\Software\Adobe\CSXS.11"
if (-not (Test-Path $regPath)) { New-Item $regPath -Force | Out-Null }
Set-ItemProperty -Path $regPath -Name "PlayerDebugMode" -Value "1" -Type String

$regPath10 = "HKCU:\Software\Adobe\CSXS.10"
if (-not (Test-Path $regPath10)) { New-Item $regPath10 -Force | Out-Null }
Set-ItemProperty -Path $regPath10 -Name "PlayerDebugMode" -Value "1" -Type String

Write-Host "  Debug mode enabled (allows unsigned extensions)" -ForegroundColor Green

Write-Host ""
Write-Host "Done! Restart Premiere Pro then go to:" -ForegroundColor Cyan
Write-Host "  Window > Extensions > $extensionName" -ForegroundColor White
Write-Host ""
Pause
