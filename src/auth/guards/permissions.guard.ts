import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

interface RequestWithUser extends Request {
  user: {
    permissions: Array<string | { code: string }>;
  };
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions?.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const { user } = req;
    if (!user) {
      throw new ForbiddenException('User context is missing');
    }

    const userPermissions: string[] = user.permissions.map((p) =>
      typeof p === 'string' ? p : p.code,
    );

    const hasAll = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );
    if (!hasAll) {
      throw new ForbiddenException(
        `Missing required permissions: ${requiredPermissions.join(', ')}`,
      );
    }
    return true;
  }
}
