import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { HashingService } from 'src/hashing/hashing.service';
import { User } from 'src/schemas/user.schema';
import { FriendService } from './friend.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
    private readonly friendService: FriendService,
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

  public async getUsernames(username: string): Promise<string[]> {
    const users = await this.userModel.find({});
    const friends = await this.friendService.getFriends(username);
    return users
      .filter((user) => user.username !== username)
      .filter((user) => !friends.includes(user.username))
      .map((user) => user.username);
  }
}
