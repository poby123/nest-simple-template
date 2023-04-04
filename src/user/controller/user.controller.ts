import { Body, Controller, Get, Injectable, Param, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserSignupDto } from '../dto/createUser.dto';
import { UserProfileDto } from '../dto/user-profile.dto';
import { UserProfileListDto } from '../dto/user-profile-list.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Get('/:id')
  async getUser(@Param() params) {
    const { id } = params;
    const user = await this.userSerivce.findOne(id);

    return UserProfileDto.of(user);
  }

  @Get('/all')
  async getUsers() {
    console.log('/all ');

    const users = await this.userSerivce.findAll();
    console.log(users);

    const userProfiles = users.map((u) => UserProfileDto.of(u));

    const ret = new UserProfileListDto();
    ret.users = userProfiles;

    return ret;
  }

  @Post('/add')
  async postUser(@Body() signupDto: UserSignupDto) {
    return await this.userSerivce.save(signupDto);
  }
}
