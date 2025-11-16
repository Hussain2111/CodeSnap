# CodeSnap VS Code Extension

A VS Code extension that allows you to pair your mobile device with VS Code to transfer code snippets using the CodeSnap mobile app.

## Features

- Start a local WebSocket server to receive code snippets
- Generate a QR code for easy pairing with the mobile app
- Automatically open received code in a new editor tab with syntax highlighting
- Simple and intuitive user interface

## Installation

1. Install the extension from the VS Code Marketplace (coming soon)
2. Or, to install from source:
   ```bash
   cd extension
   npm install
   npm run compile
   ```
   Then press F5 to open a new VS Code window with the extension loaded.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS)
2. Run the `CodeSnap: Start Server` command to start the WebSocket server
3. Run the `CodeSnap: Pair Device` command to generate a QR code
4. Open the CodeSnap app on your mobile device and scan the QR code
5. Take a photo of your code using the app and send it to VS Code

## Configuration

You can configure the following settings in your VS Code settings (File > Preferences > Settings):

- `codesnap.port`: The port number for the WebSocket server (default: 3001)

## Requirements

- VS Code 1.85.0 or higher
- Node.js 14.x or higher
- CodeSnap mobile app (available on iOS and Android)

## Extension Settings

This extension contributes the following settings:

* `codesnap.port`: The port number for the WebSocket server

## Known Issues

- The WebSocket server may be blocked by your firewall. Make sure to allow incoming connections on the specified port.

## Release Notes

### 0.0.1

Initial release of CodeSnap VS Code extension

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
