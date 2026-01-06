import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtManagerService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly config: ConfigService,
  ) {}
  // Generate Access Token (15 min)
  generateAccessToken(payload: JwtPayload): string {
    return this.nestJwtService.sign(
      { sub: payload.userId, email: payload.email, role: payload.role },
      {
        expiresIn: this.config.get('JWT_EXPIRES_IN'),
        secret: this.config.get('JWT_SECRET'),
      },
    );
  }

  // Generate Refresh Token (7 days)
  generateRefreshToken(userId: string): string {
    return this.nestJwtService.sign(
      { sub: userId, type: 'refresh' },
      {
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
        secret: this.config.get('JWT_REFRESH_SECRET'),
      },
    );
  }

  // Verify Access Token
  verifyAccessToken(token: string): JwtPayload {
    return this.nestJwtService.verify(token, this.config.get('JWT_SECRET'));
  }
}
