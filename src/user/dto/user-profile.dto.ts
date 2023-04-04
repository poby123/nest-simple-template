import { User } from '../entity/user.entity';

export class UserProfileDto {
  id: number;
  name: string;

  constructor() { }

  static of(user: User): UserProfileDto {
    const ret = new UserProfileDto();

    ret.id = user.id;
    ret.name = user.name;

    return ret;
  }
}
