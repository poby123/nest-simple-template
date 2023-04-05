import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { GET_ALL_USERS_SUCCESS } from 'src/global/result/res-code.result';
import { ResultResponse } from 'src/global/result/response.result';
import { UserSignupRequestDto } from '../dto/create-user.dto';
import { UserProfileListDto } from '../dto/user-profile-list.dto';
import { UserProfileDto } from '../dto/user-profile.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Get('/all')
  @HttpCode(GET_ALL_USERS_SUCCESS.status)
  async getUsers(): Promise<ResultResponse> {
    const users = await this.userSerivce.findAll();
    const userProfiles = users.map((u) => UserProfileDto.of(u));

    const data = new UserProfileListDto(userProfiles);
    return new ResultResponse(GET_ALL_USERS_SUCCESS, data);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.userSerivce.findOne(id);

    return UserProfileDto.of(user);
  }

  @Post('/add')
  async postUser(@Body() signupDto: UserSignupRequestDto) {
    const createdUser: User = await this.userSerivce.save(signupDto);
    return UserProfileDto.of(createdUser);
  }
}
