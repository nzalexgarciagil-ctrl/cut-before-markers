# Cut Before Markers

A simple Premiere Pro extension that razor-cuts your timeline X seconds before every sequence marker.

**Perfect for gaming highlights** — add a marker on every kill/moment, run the tool, and every clip is already trimmed to start X seconds before the action.

![Screenshot](screenshot.png)

## Install

### Windows
1. Download / clone this repo
2. Right-click `install.ps1` → **Run with PowerShell**
3. Restart Premiere Pro
4. **Window → Extensions → Cut Before Markers**

### macOS
1. Download / clone this repo
2. `bash install.sh`
3. Restart Premiere Pro
4. **Window → Extensions → Cut Before Markers**

### Manual install
Copy the folder to your CEP extensions directory:

| OS | Path |
|----|------|
| Windows | `%APPDATA%\Adobe\CEP\extensions\cut-before-markers\` |
| macOS | `~/Library/Application Support/Adobe/CEP/extensions/cut-before-markers/` |

Then enable unsigned extensions:

- **Windows:** set `HKCU\Software\Adobe\CSXS.11\PlayerDebugMode` = `1`
- **macOS:** run `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`

## How to use

1. Add sequence markers at each moment you want to keep (default shortcut: **M**)
2. Open the panel: **Window → Extensions → Cut Before Markers**
3. Type how many seconds before each marker you want (default: 15)
4. Click **Run Cut**

Markers less than X seconds from the start of the timeline are skipped automatically.

## Requirements

- Adobe Premiere Pro 2020 or later (CEP 10+)
