#!/usr/bin/env bash
# Simple helper to start a local http server for this project
set -euo pipefail
cd "$(dirname "$0")"
PORT=${1:-8000}
echo "Starting HTTP server on http://localhost:$PORT"
python3 -m http.server "$PORT"
