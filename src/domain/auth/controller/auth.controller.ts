import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import ms from 'ms';
import { Public } from 'src/global/decorator/public.decorator';
import {
  REISSUE_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from 'src/global/result/res-code.result';
import { ResultResponse } from 'src/global/result/response.result';
import { REFRESH_TOKEN_SUBJECT } from '../constants';
import { LocalAuthGuard } from '../guard/local.guard';
import { AuthService } from '../service/auth.service';
import { SignedUser } from 'src/global/decorator/user.decorator';
import { ReissueAuthGuard } from '../guard/reissue.guard';
import { REFRESH_TOKEN_EXPIRES_TIME } from '../constants';
import { addTime } from 'src/global/utils/time.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      req.user,
    );

    res.cookie(REFRESH_TOKEN_SUBJECT, refreshToken, { httpOnly: true, expires: addTime(REFRESH_TOKEN_EXPIRES_TIME) });
    return new ResultResponse(SIGN_IN_SUCCESS, { accessToken });
  }


  @Post('/reissue')
  @Public()
  @UseGuards(ReissueAuthGuard)
  async reissue(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.reissue(
      req.user,
    );

    res.cookie(REFRESH_TOKEN_SUBJECT, refreshToken, { httpOnly: true, expires: addTime(REFRESH_TOKEN_EXPIRES_TIME) });
    return new ResultResponse(REISSUE_SUCCESS, { accessToken });
  }


  @Post('/signout')
  @Public()
  async signOut(@SignedUser() user, @Res({ passthrough: true }) res: Response) {
    res.cookie(REFRESH_TOKEN_SUBJECT, '', {
      maxAge: 0,
    });
    user && await this.authService.signOut(user);
    return new ResultResponse(SIGN_OUT_SUCCESS);
  }
}
