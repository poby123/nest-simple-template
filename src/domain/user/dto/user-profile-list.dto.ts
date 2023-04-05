import { UserProfileDto } from './user-profile.dto';

export class UserProfileListDto {
  users: Array<UserProfileDto>;

  constructor(users: Array<UserProfileDto>) {
    this.users = users;
  }
}
