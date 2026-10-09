# setup.ps1 — same setup, run in PowerShell on Windows

param([switch]$SkipDotEnv)

$ErrorActionPreference = "Stop"
$appName = "Clickable Screenshots"

function Log($msg) { Write-Host ""; Write-Host "- $msg" }
function Ok($msg)  { Write-Host ""; Write-Host "  OK  $msg" }
function Warn($msg) { Write-Host ""; Write-Host "  WARN  $msg" }
function Err($msg) { Write-Host ""; Write-Host "  ERROR  $msg" -ForegroundColor Red; exit 1 }

# Prerequisites
$nodeOk = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeOk) { Err "Node >= 18 not found. Install: https://nodejs.org" }
$ver = node -e "console.log(parseInt(process.version.Substring(1).Split('.')[0]))"
if ($ver -lt 18) { Err "Node >= 18 required (found $ver)" }

# Install
Log "Installing dependencies (npm ci)..."
npm ci --no-audit --no-fund
Ok "npm ci complete"

# Env
if (-not (Test-Path .env) -and (Test-Path .env.example)) {
  Log "Creating .env from .env.example — review values before continuing"
  Copy-Item .env.example .env
}
if (-not (Test-Path .env)) { Warn ".env missing — create it from .env.example" }
Ok ".env ready"

# iOS toolchain
if (-not (Get-Command pod -ErrorAction SilentlyContinue)) {
  Warn "CocoaPods (pod) not found. Run:  sudo gem install cocoapods"
}
if (Get-Command Get-ItemProperty -ErrorAction SilentlyContinue) {
  $isMac = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion").ReleaseId -match "10|11"
  if (-not $isMac) { Warn "iOS simulator builds need macOS + Xcode Command Line Tools — Android is the default target here." }
}

Log "Setup complete."
Log "Next steps:"
"  1. Review .env (replace CHANGE_ME; set MOCK_MODE=false when ready)"
"  2. npx expo start"
"  3. npx expo run:ios   (macOS only) | npx expo run:android"
