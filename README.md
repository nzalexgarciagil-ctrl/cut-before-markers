# Cut Before Markers

Premiere Pro extension. Put markers on your timeline, run this, and it cuts X seconds before each one.

## Install

### Windows
1. Download/clone this repo
2. Right-click `install.ps1` → Run with PowerShell
3. Restart Premiere Pro
4. Window → Extensions → Cut Before Markers

### macOS
1. Download/clone this repo
2. `bash install.sh`
3. Restart Premiere Pro
4. Window → Extensions → Cut Before Markers

### Manual install
Drop the folder here:

| OS | Path |
|----|------|
| Windows | `%APPDATA%\Adobe\CEP\extensions\cut-before-markers\` |
| macOS | `~/Library/Application Support/Adobe/CEP/extensions/cut-before-markers/` |

You'll also need to allow unsigned extensions:

- **Windows:** set `HKCU\Software\Adobe\CSXS.11\PlayerDebugMode` = `1`
- **macOS:** `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`

## How to use

1. Hit **M** to drop a marker at each moment
2. Window → Extensions → Cut Before Markers
3. Type how many seconds before each marker (default is 15)
4. Hit Run Cut

Markers too close to the start of the timeline get skipped.

## Requirements

Premiere Pro 2020 or later
