import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { name, username, email, password } = createUserDto;
    const existUsername = await this.userRepository.existsBy({ username });
    const existEmail = await this.userRepository.existsBy({ email });
    if (existUsername) {
      console.log(existUsername)
      throw new BadRequestException('the username is existed');
    }
    if (existEmail) {
      throw new BadRequestException('the email is existed');
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const createdUser = this.userRepository.create({
      name,
      email,
      username,
      password: hashPassword,
    });
    await this.userRepository.save(createdUser);

    return { id: createdUser.id, name, email, username };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        accountStatus: true,
      },
    });

    return { data: users, total, page, limit };
  }

  async findOne(username: string, passwordSelected: boolean = false) {
    const user = await this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        name: true,
        email: true,
        accountStatus: true,
        password: passwordSelected,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
