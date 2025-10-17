// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from 'src/users/user.repository';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  permissions: string[];
  tenant: null | { id: string; name: string; slug: string };
}

// This is the *populated* shape your repository should return for this strategy.
// Adjust field names if your relations differ.
type RepoUser = {
  id: string;
  email: string;
  role?: string | { name: string };
  permissions?: Array<string | { code: string }>;
  tenant?: { id: string; name: string; slug: string } | null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepo: UserRepository,
    cfg: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: cfg.get<string>('JWT_SECRET', ''), // ❗ same source as sign
      ignoreExpiration: false,
      algorithms: ['HS256'], // match signOptions.algorithm
      // clockTolerance: 5, // optional
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    role?: unknown;
  }): Promise<AuthUser> {
    const user = (await this.userRepo.findByIdWithRoleAndPermissions(
      payload.sub,
    )) as RepoUser | null;
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }
    // Optional: if ('isActive' in user && user.isActive === false) throw new UnauthorizedException('User disabled');

    const roleName =
      typeof user.role === 'string' ? user.role : (user.role?.name ?? 'user');

    const rawPerms = Array.isArray(user.permissions) ? user.permissions : [];
    const permissions = rawPerms
      .map((p) => (typeof p === 'string' ? p : p?.code))
      .filter((p): p is string => !!p);

    const tenant = user.tenant?.id
      ? { id: user.tenant.id, name: user.tenant.name, slug: user.tenant.slug }
      : null;

    return {
      id: user.id,
      email: user.email,
      role: roleName,
      permissions,
      tenant,
    };
  }
}
