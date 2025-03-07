import * as WebSocket from 'ws';

class Network {
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.initialize();
  }

  private initialize(): void {
    this.ws.on('open', () => {
      console.log('Connected to peer-to-peer network');
    });

    this.ws.on('message', (data: string) => {
      console.log('Received message:', data);
      // Handle incoming messages (e.g., blockchain updates)
    });

    this.ws.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  }

  public broadcast(data: any): void {
    this.ws.send(JSON.stringify(data));
  }
}

// Example usage
const network = new Network('ws://localhost:8080');

// Broadcast a message
network.broadcast({ type: 'transaction', data: { from: 'Alice', to: 'Bob', amount: 10 } });
