import http from 'http';
import App from './app';

class Server {
  private server!: http.Server;

  constructor(private app = new App(), private port = 3333) {

  }

  public setupServer() {
    this.app.init();
  }

  public startServer() {
    this.server = http.createServer(this.app.getApp()).listen(this.port, () => {
      console.log(
        `Express server listening on port ${this.port} | NODE_ENV=${process.env.NODE_ENV}`,
      );
    });
  }

  public stopServer() {
    this.server.close();
  }
}

const server = new Server();

server.setupServer();
server.startServer();
