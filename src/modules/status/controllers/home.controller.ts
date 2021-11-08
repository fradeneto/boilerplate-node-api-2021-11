import { Request, Response } from 'express';
import { Controller, Get } from '@decorators/index';

@Controller()
export class HomeController {
  @Get()
  public index(request: Request, response: Response): Response {
    return response.status(200).json({ msg: 'Home v3' });
  }
}
