import 'dotenv/config';
import 'reflect-metadata';
import express, {
  Application, Request, Response, Router,
} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
// import csurf from 'csurf';
import { statusControllers } from './modules/status/controllers';
import { RouteDefinition } from './RouteDefinition';

class App {
  private express: express.Application;

  public constructor() {
    this.express = express();
  }

  public init() {
    this.express.disable('etag');
    this.setupMiddlewares();
    this.setupRoutes(statusControllers);
  }

  public getApp(): Application {
    return this.express;
  }

  private setupMiddlewares(): void {
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: '*',
      }),
    );
    // this.express.use(csurf());
    this.express.use(compression());
  }

  private setupRoutes(controllers: any[]): void {
    const routes = Router();

    controllers.forEach((Controller) => {
      const instance = new Controller();
      const prefix = Reflect.getMetadata('prefix', Controller);
      const controllerRoutes: Array<RouteDefinition> = Reflect.getMetadata(
        'routes',
        Controller,
      );

      controllerRoutes.forEach((route) => {
        if (route.middleware) {
          routes[route.requestMethod](
            prefix + route.path,
            route.middleware,
            (req: Request, res: Response) => {
              instance[route.methodName](req, res);
            },
          );
        } else {
          routes[route.requestMethod](
            prefix + route.path,
            (req: Request, res: Response) => {
              instance[route.methodName](req, res);
            },
          );
        }
      });
    });

    this.express.use(routes);
  }
}

export default App;
