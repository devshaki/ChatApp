import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { HashingService } from 'src/hashing/hashing.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
  ) {}

  public async checkUserLogin(
    username: string,
    password: string,
  ): Promise<string> {
    const user = await this.userModel.findOne({ username: username });
    if (user && this.hashingService.verifyPassword(password, user.password)) {
      return user._id.toString();
    }
    throw new Error('Invalid username or password');
  }

  public async createUser(userDto: UserDto): Promise<string> {
    const existingUser = await this.userModel.findOne({
      username: userDto.username,
    });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    userDto.password = this.hashingService.hashPassword(userDto.password);
    const user = new this.userModel({
      username: userDto.username,
      password: userDto.password,
    });
    await user.save();
    return user._id.toString();
  }

  public async isUserValid(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username: username });
    return !!user;
  }

  public async getUsernames(): Promise<string[]> {
    const users = await this.userModel.find({});
    return users.map((user) => user.username);
  }
}
