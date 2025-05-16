import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    role: string | { name: string };
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles?.length) {
      return true; // no role restriction
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { user } = request;
    if (!user) {
      throw new ForbiddenException('User context is missing');
    }

    const userRole = typeof user.role === 'string' ? user.role : user.role.name;

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(`Access denied for role: ${userRole}`);
    }
    return true;
  }
}
