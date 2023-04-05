import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserSignupRequestDto } from '../dto/create-user.dto';
import { UserProfileListDto } from '../dto/user-profile-list.dto';
import { UserProfileDto } from '../dto/user-profile.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { CustomException } from 'src/global/error/custom-exception';
import { ErrorCode } from 'src/global/error/error-code';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Get('/all')
  async getUsers() {
    const users = await this.userSerivce.findAll();
    const userProfiles = users.map((u) => UserProfileDto.of(u));

    return new UserProfileListDto(userProfiles);
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
