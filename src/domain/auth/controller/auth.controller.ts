import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/global/decorator/public.decorator';
import { LocalAuthGuard } from '../guard/local.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerivce: AuthService) {}

  @Post('/signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req) {
    const accessToken = this.authSerivce.signIn(req.user);
    return accessToken;
  }
}
