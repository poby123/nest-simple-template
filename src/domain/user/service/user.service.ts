import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupRequestDto } from '../dto/signup-req.dto';
import { User } from '../entity/user.entity';
import { UserNotFoundException } from '../exception/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email, isActive: true });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async save(userDto: SignupRequestDto) {
    const createdUser: User = await this.userRepository.save(
      await SignupRequestDto.toEntity(userDto),
    );
    return createdUser;
  }
}
