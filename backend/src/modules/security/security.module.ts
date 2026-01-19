import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './crypto.service';
import { TokenService } from './token.service';
import { HashService } from './hash.service';
import { ValidationService } from './validation.service';
import { JwtManagerService } from './jwtManager.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    CryptoService,
    TokenService,
    HashService,
    ValidationService,
    JwtManagerService,
  ],
  exports: [
    CryptoService,
    TokenService,
    HashService,
    ValidationService,
    JwtManagerService,
  ],
})
export class SecurityModule {}
