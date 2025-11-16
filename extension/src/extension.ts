import * as vscode from 'vscode';
import * as WebSocket from 'ws';
import * as path from 'path';
import * as os from 'os';
import * as qrcode from 'qrcode';

let wsServer: WebSocket.Server | null = null;
let currentPanel: vscode.WebviewPanel | undefined = undefined;

interface CodeSnippet {
  code: string;
  language: string;
  timestamp: number;
}

// Store the extension context
export let context: vscode.ExtensionContext;

export function activate(extensionContext: vscode.ExtensionContext) {
  context = extensionContext;
  console.log('CodeSnap extension is now active!');

  // Register commands
  const startServerCmd = vscode.commands.registerCommand('codesnap.startServer', startServer);
  const pairDeviceCmd = vscode.commands.registerCommand('codesnap.pairDevice', pairDevice);
  const receiveCodeCmd = vscode.commands.registerCommand('codesnap.receiveCode', receiveCode);

  context.subscriptions.push(startServerCmd, pairDeviceCmd, receiveCodeCmd);

  // Auto-start the server when the extension is activated
  startServer();
}

function startServer() {
  const config = vscode.workspace.getConfiguration('codesnap');
  const port = config.get<number>('port', 3001);

  if (wsServer) {
    wsServer.close();
  }

  wsServer = new WebSocket.Server({ port });
  
  wsServer.on('connection', (ws: WebSocket) => {
    vscode.window.showInformationMessage('Device connected to CodeSnap!');

    ws.on('message', (data: string) => {
      try {
        const snippet: CodeSnippet = JSON.parse(data);
        vscode.window.showInformationMessage('Received new code snippet from device!');
        
        // Open the received code in a new editor
        vscode.workspace.openTextDocument({
          content: snippet.code,
          language: snippet.language || 'plaintext'
        }).then(doc => {
          vscode.window.showTextDocument(doc as vscode.TextDocument);
        });
      } catch (error) {
        console.error('Error processing received code:', error);
      }
    });

    ws.on('close', () => {
      vscode.window.showInformationMessage('Device disconnected from CodeSnap');
    });
  });

  vscode.window.showInformationMessage(`CodeSnap server started on port ${port}`);
}

async function pairDevice() {
  if (!wsServer) {
    vscode.window.showErrorMessage('CodeSnap server is not running. Please start the server first.');
    return;
  }

  const ipAddress = getLocalIpAddress();
  const port = vscode.workspace.getConfiguration('codesnap').get<number>('port', 3001);
  const connectionString = `codesnap:${ipAddress}:${port}`;

  // Generate QR code
  const qrCodeDataUrl = await qrcode.toDataURL(connectionString);
  
  // Create and show a new webview panel with the QR code
  if (currentPanel) {
    currentPanel.reveal(vscode.ViewColumn.Beside);
  } else {
    currentPanel = vscode.window.createWebviewPanel(
      'codesnapPairing',
      'Pair Device',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );

    // Handle panel disposal
    currentPanel.onDidDispose(
      () => {
        currentPanel = undefined;
      },
      null,
      context.subscriptions
    );
  }

  // Set the webview's HTML content
  currentPanel.webview.html = getWebviewContent(ipAddress, port.toString(), qrCodeDataUrl);
}

function receiveCode() {
  if (!wsServer) {
    vscode.window.showErrorMessage('CodeSnap server is not running. Please start the server first.');
    return;
  }
  vscode.window.showInformationMessage('Ready to receive code snippets...');
}

function getLocalIpAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const details of iface) {
      if (!details.internal && details.family === 'IPv4') {
        return details.address;
      }
    }
  }
  return 'localhost';
}

function getWebviewContent(ip: string, port: string, qrCodeDataUrl: string): string {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pair Device - CodeSnap</title>
      <style>
          body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              padding: 20px;
              text-align: center;
              background-color: #1e1e1e;
              color: #ffffff;
          }
          .container {
              max-width: 500px;
              margin: 0 auto;
              padding: 20px;
              background-color: #252526;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          h1 {
              color: #569cd6;
              margin-bottom: 20px;
          }
          .qr-container {
              margin: 20px 0;
              padding: 20px;
              background: white;
              border-radius: 8px;
              display: inline-block;
          }
          .connection-info {
              margin: 20px 0;
              padding: 15px;
              background: #2d2d2d;
              border-radius: 6px;
              font-family: monospace;
              word-break: break-all;
          }
          .instructions {
              text-align: left;
              margin: 20px 0;
              line-height: 1.5;
          }
          .step {
              margin-bottom: 10px;
              display: flex;
              align-items: flex-start;
          }
          .step-number {
              background: #569cd6;
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-right: 10px;
              flex-shrink: 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Pair Your Device</h1>
          
          <div class="qr-container">
              <img src="${qrCodeDataUrl}" alt="QR Code for pairing" />
          </div>
          
          <div class="connection-info">
              <div>Server: ${ip}:${port}</div>
          </div>
          
          <div class="instructions">
              <div class="step">
                  <div class="step-number">1</div>
                  <div>Open the CodeSnap app on your phone</div>
              </div>
              <div class="step">
                  <div class="step-number">2</div>
                  <div>Tap on "Connect to VS Code" and scan the QR code above</div>
              </div>
              <div class="step">
                  <div class="step-number">3</div>
                  <div>Take a photo of your code and send it to VS Code</div>
              </div>
          </div>
      </div>
  </body>
  </html>`;
}

export function deactivate() {
  if (wsServer) {
    wsServer.close();
    wsServer = null;
  }
}
