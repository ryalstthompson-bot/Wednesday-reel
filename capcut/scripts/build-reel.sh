#!/usr/bin/env bash
# Build a new Wednesday Reel CapCut draft from capcut/wednesday-reel.spec.json.
# Usage: ./capcut/scripts/build-reel.sh [--drafts <path>]
#
# Assets expected at capcut/assets/:
#   clip.mp4        — main video footage
#   voiceover.mp3   — narration track
#   music.mp3       — background music
#
# After running, open CapCut and the "Wednesday Reel" project will be in your library.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SPEC="$REPO_ROOT/capcut/wednesday-reel.spec.json"

DRAFTS_ARG="${1:-}"

echo "Building Wednesday Reel from spec: $SPEC"

npx capcut-cli compile "$SPEC" ${DRAFTS_ARG:+--drafts "$DRAFTS_ARG"}

echo ""
echo "Done. Open CapCut to find the 'Wednesday Reel' draft ready to review and export."
