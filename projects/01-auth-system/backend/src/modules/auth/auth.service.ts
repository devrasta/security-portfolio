import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { HashService } from '@/modules/security/hash.service';
import { TokenService } from '@/modules/security/token.service';
import { ValidationService } from '@/modules/security/validation.service';
import { JwtManagerService } from '@/modules/security/jwtManager.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtManagerService,
    private validationService: ValidationService,
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Validate
    if (!this.validationService.isValidEmail(dto.email)) {
      throw new BadRequestException('Invalid email');
    }
    if (!this.validationService.isStrongPassword(dto.password)) {
      throw new BadRequestException('Weak password');
    }

    // 2. Hash password
    const hashedPassword = await this.hashService.hashPassword(dto.password);

    // 3. Generate verification token
    const verificationToken = this.tokenService.generateVerificationToken();

    // 4. Create user
    return this.usersService.createUser({
      ...dto,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
    });
  }

  async login(loginParams: LoginDto) {
    // 1. Find user
    const user = await this.usersService.findByEmail(loginParams.email);

    // 2. Verify password
    const isValid = await this.hashService.verifyPassword(
      user.password,
      loginParams.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generate tokens
    const accessToken = this.jwtService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.jwtService.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
}
