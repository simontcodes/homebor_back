import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const slug = req.headers['x-tenant-slug'] || req.hostname.split('.')[0];
    req['tenantSlug'] = slug;
    next();
  }
}
