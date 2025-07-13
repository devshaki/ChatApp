import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { HashingService } from 'src/hashing/hashing.service';
import { MessageDto } from 'src/dto/message.dto';
import { GroupDto } from 'src/dto/group.dto';
import { Group, GroupDocument } from 'src/schemas/group.schema';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { group } from 'console';
@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    @InjectModel(Group.name)
    private groupModel: Model<GroupDocument>,
    private readonly hashingService: HashingService,
  ) {}

  // authenticate
  async checkUserLogin(username: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ username: username });
    if (user && this.hashingService.verifyPassword(password, user.password)) {
      return user._id.toString();
    }
    throw new Error('Invalid username or password');
  }

  async createUser(userDto: UserDto): Promise<string> {
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

  // messages
  async addMessage(messageDto: MessageDto): Promise<string> {
    const message = new this.messageModel({
      body: messageDto.body,
      senderId: messageDto.senderId,
      chatId: messageDto.chatId,
      createdAt: messageDto.createdAt || Date.now().toString(),
    });
    await message.save();
    return message._id.toString();
  }

  async getMessagesByGroup(groupId: string): Promise<MessageDto[]> {
    const messages = await this.messageModel.find({ chatId: groupId });
    return messages.map((message) => ({
      body: message.body,
      senderId: message.senderId,
      chatId: message.chatId,
      createdAt: message.createdAt,
    }));
  }

  async addGroup(groupDto: GroupDto, username: string): Promise<string> {
    const group = new this.groupModel({
      name: groupDto.name,
      description: groupDto.description,
    });
    await group.save();
    await this.addUserToGroup(group._id.toString(), username);
    return group._id.toString();
  }

  async addUserToGroup(groupId: string, username: string): Promise<void> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      return;
    }
    user.contacts.push(groupId);
    await user.save();
  }

  async removeUserFromGroup(username: string, groupId: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    user.contacts = user.contacts.filter((contact) => contact !== groupId);
    await user.save();
  }

  async getGroupsByUser(username: string): Promise<GroupDto[]> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      return [];
    }
    const groupIds = user.contacts;
    const groups = await this.groupModel.find({ _id: { $in: groupIds } });
    return groups.map((group) => ({
      name: group.name,
      description: group.description,
      groupId: group._id.toString(),
    }));
  }

  async getMembersInGroup(groupId: string): Promise<string[]> {
    const usersInGroup = await this.userModel.find({ contacts: groupId });
    const usernames = usersInGroup.map((user) => user.username);
    return usernames;
  }

  async addFriend(username: string, friendname: string) {
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

  async removeFriend(username: string, friendname: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    user.contacts = user.contacts.filter((contact) => contact !== friendname);
    await user.save();
  }

  async getFriends(username: string): Promise<string[]> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    return user.contacts;
  }
}
