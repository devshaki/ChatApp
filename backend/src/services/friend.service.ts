import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async addFriend(username: string, friendname: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.contacts.includes(friendname)) {
      throw new Error('Contact already exists');
    }
    user.contacts.push(friendname);
    await user.save();
  }

  public async removeFriend(username: string, friendname: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    user.contacts = user.contacts.filter((contact) => contact !== friendname);
    await user.save();
  }

  public async getFriends(username: string): Promise<string[]> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    return user.contacts;
  }
  public async getUsernames(): Promise<string[]> {
    const users = await this.userModel.find({});
    return users.map((user) => user.username);
  }
}
