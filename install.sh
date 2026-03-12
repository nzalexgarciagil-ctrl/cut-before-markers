#!/bin/bash
# install.sh — macOS installer for Cut Before Markers
# Run with: bash install.sh

EXTENSION_ID="cut-before-markers"
EXTENSION_NAME="Cut Before Markers"
DEST="$HOME/Library/Application Support/Adobe/CEP/extensions/$EXTENSION_ID"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "Installing $EXTENSION_NAME..."

# Copy files
rm -rf "$DEST"
mkdir -p "$DEST"
cp -r "$SCRIPT_DIR/CSXS"        "$DEST/"
cp    "$SCRIPT_DIR/index.html"  "$DEST/"
cp    "$SCRIPT_DIR/host.jsx"    "$DEST/"
cp    "$SCRIPT_DIR/CSInterface.js" "$DEST/"

echo "  Copied to: $DEST"

# Enable unsigned CEP extensions
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
defaults write com.adobe.CSXS.10 PlayerDebugMode 1

echo "  Debug mode enabled (allows unsigned extensions)"
echo ""
echo "Done! Restart Premiere Pro then go to:"
echo "  Window > Extensions > $EXTENSION_NAME"
echo ""
