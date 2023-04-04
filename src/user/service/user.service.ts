import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from '../dto/createUser.dto';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    console.log('find all');

    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    console.log('find one: ', user);

    if (!user) {
      throw new Error('User not Found');
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async save(userDto: UserSignupDto) {
    const createdUser = await this.userRepository.save(
      UserSignupDto.toEntity(userDto),
    );
    return createdUser.id;
  }
}
