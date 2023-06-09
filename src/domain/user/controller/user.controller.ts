import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Public } from 'src/global/decorator/public.decorator';
import { SignedUser } from 'src/global/decorator/user.decorator';
import {
  GET_ALL_USERS_SUCCESS,
  GET_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
} from 'src/global/result/res-code.result';
import { ResultResponse } from 'src/global/result/response.result';
import { SignupRequestDto } from '../dto/signup-req.dto';
import { UserProfileListDto } from '../dto/user-profile-list.dto';
import { UserProfileDto } from '../dto/user-profile.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) { }

  @Get('/all')
  @HttpCode(GET_ALL_USERS_SUCCESS.status)
  async getUsers(): Promise<ResultResponse> {
    const users = await this.userSerivce.findAll();
    const userProfiles = users.map((u) => UserProfileDto.of(u));

    const data = new UserProfileListDto(userProfiles);
    return new ResultResponse(GET_ALL_USERS_SUCCESS, data);
  }

  @Get('/profile')
  @HttpCode(GET_USER_SUCCESS.status)
  async getMyProfile(@SignedUser() user) {
    console.log(user);

    const data = await this.userSerivce.getUserById(user.id);
    return new ResultResponse(GET_USER_SUCCESS, data);
  }

  @Get(':id')
  @HttpCode(GET_USER_SUCCESS.status)
  async getUser(@Param('id') id: number) {
    const user = await this.userSerivce.getUserById(id);

    const data = UserProfileDto.of(user);
    return new ResultResponse(GET_USER_SUCCESS, data);
  }

  @Post('/signup')
  @HttpCode(SIGNUP_USER_SUCCESS.status)
  @Public()
  async postUser(@Body() signupDto: SignupRequestDto) {
    const createdUser: User = await this.userSerivce.save(signupDto);
    const data = UserProfileDto.of(createdUser);
    return new ResultResponse(SIGNUP_USER_SUCCESS, data);
  }
}
