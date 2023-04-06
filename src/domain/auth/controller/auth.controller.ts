import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'src/global/decorator/public.decorator';
import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from 'src/global/result/res-code.result';
import { ResultResponse } from 'src/global/result/response.result';
import { COOKIE_REFRESH_TOKEN_TYPE } from '../constants';
import { LocalAuthGuard } from '../guard/local.guard';
import { AuthService } from '../service/auth.service';
import { SignedUser } from 'src/global/decorator/user.decorator';
import { ReissueAuthGuard } from '../guard/reissue.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      req.user,
    );

    res.cookie(COOKIE_REFRESH_TOKEN_TYPE, refreshToken, { httpOnly: true });
    return new ResultResponse(SIGN_IN_SUCCESS, { accessToken });
  }

  @Post('/reissue')
  @Public()
  @UseGuards(ReissueAuthGuard)
  async reissue(@Req() req: Request) {
    console.log('reissue guard passed!');
  }

  @Post('/signout')
  async signOut(@SignedUser() user, @Res({ passthrough: true }) res: Response) {
    res.cookie(COOKIE_REFRESH_TOKEN_TYPE, '', {
      maxAge: 0,
    });
    this.authService.signOut(user);
    return new ResultResponse(SIGN_OUT_SUCCESS);
  }
}
