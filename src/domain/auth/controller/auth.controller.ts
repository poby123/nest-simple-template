import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SigninRequestDto } from 'src/domain/user/dto/siginin-req.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerivce: AuthService) {}

  @Post('/signin')
  async signIn(@Body() signinReq: SigninRequestDto) {
    return await this.authSerivce.signIn(signinReq);
  }
}
