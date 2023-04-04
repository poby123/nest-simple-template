import { User } from '../entity/user.entity';

export class UserProfileDto {
  name: string;

  constructor() {}

  static of(user: User): UserProfileDto {
    const ret = new UserProfileDto();
    ret.name = user.name;

    return ret;
  }
}
