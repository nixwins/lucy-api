import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/users.dto';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(userEmail: string) {
    const user = await this.userRepository.findOne({ email: userEmail });
    if (user) {
      return user;
    }
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    }
  }

  async create(user: UserDto) {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}
