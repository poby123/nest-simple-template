import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SigninRequestDto } from 'src/domain/user/dto/siginin-req.dto';
import { LocalAuthGuard } from '../guard/local.guard';
import { Public } from 'src/global/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerivce: AuthService) { }

  @Post('/signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req) {
    const accessToken = this.authSerivce.signIn(req.user);
    return accessToken;
  }
}
