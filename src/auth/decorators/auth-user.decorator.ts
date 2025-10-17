import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthUser as AuthUserShape } from '../jwt.strategy';

export const AuthUser = createParamDecorator(
  (data: keyof AuthUserShape | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: AuthUserShape }>();
    if (!request.user) return undefined;
    return data ? request.user[data] : request.user;
  },
);
