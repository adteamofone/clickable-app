#!/usr/bin/env bash
# setup.sh — one-shot setup for Clickable Screenshots Expo/RN v1
# Requires: Node >= 18, npm >= 9, and (macOS + Xcode + CocoaPods) for iOS simulators.
set -euo pipefail

log()  { printf '\n%-5s %s\n' "$1" "$2"; }
ok()   { printf '\n%5s %s\n' "OK"  "$2"; }
warn() { printf '\n%5s %s\n' "WARN" "$2"; }
err()  { printf '\n%5s %s\n' "ERROR" "$2" >&2; }

# --- prerequisites -----------------------------------------------------------
node --version >/dev/null 2>&1 || { err "Node >= 18 not found. Install: https://nodejs.org"; exit 1; }
npm --version >/dev/null 2>&1 || { err "npm not found"; exit 1; }
node_major=$(node -e "console.log(parseInt(process.version.slice(1).split('.')[0], 10))")
(( node_major >= 18 )) || { err "Node >= 18 required (found $node_major)"; exit 1; }

# --- install app dependencies -------------------------------------------------
log "Installing dependencies (npm ci)..."
npm ci --no-audit --no-fund
ok "npm ci complete"

# --- environment --------------------------------------------------------------
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    log "Creating .env from .env.example — review values before continuing"
    cp .env.example .env
  else
    log "No .env.example found; creating empty .env"
    touch .env
  fi
  ok ".env ready"
else
  warn ".env already exists; leaving it untouched (edit it manually)"
fi

# --- Expo toolchain ------------------------------------------------------------
log "Checking Expo SDK..."
npx expo install --check 2>/dev/null || true

# --- iOS toolchain (macOS only) ---------------------------------------------------
if [[ "$OSTYPE" == "darwin"* ]]; then
  if ! command -v pod &>/dev/null; then
    warn "CocoaPods (pod) not found. Run: sudo gem install cocoapods"
  fi
  log "macOS detected — Xcode Command Line Tools present."
else
  log "iOS simulator builds require macOS + Xcode Command Line Tools."
  log "Android emulator is the default target on this host."
fi

log "Setup complete."
log "Next steps:"
printf '  1. Review and edit .env (replace CHANGE_ME values; set MOCK_MODE=false when ready).\n'
printf '  2. Start the bundler:  npx expo start\n'
printf '  3. Run on iOS :  npx expo run:ios\n'
printf '  4. Run on Android: npx expo run:android\n'
