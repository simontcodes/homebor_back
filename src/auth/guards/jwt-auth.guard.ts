// src/auth/guards/jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic ? true : super.canActivate(context);
  }

  // 👇 Add this to see WHY you get 401
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // info can be TokenExpiredError, JsonWebTokenError: invalid signature, etc.
      const req = context.switchToHttp().getRequest();
      // Log just the type/message to avoid leaking secrets
      console.warn('[JwtAuthGuard] Rejecting request', {
        path: req?.url,
        reason: err?.message ?? info?.message ?? info?.name ?? 'unknown',
        name: info?.name,
      });
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
