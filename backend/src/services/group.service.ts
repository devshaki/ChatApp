import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupDto } from 'src/dto/group.dto';
import { Group } from 'src/schemas/group.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async getGroupById(groupId: string): Promise<GroupDto> {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new Error('Group not found');
    }
    return {
      name: group.name,
      description: group.description,
      groupId: group._id.toString(),
      isDm: group.isDm,
    };
  }

  public async addGroup(groupDto: GroupDto, username: string): Promise<string> {
    const group = new this.groupModel({
      name: groupDto.name,
      description: groupDto.description,
      isDm: groupDto.isDm || false,
    });
    await group.save();
    await this.addUserToGroup(username, group._id.toString());
    return group._id.toString();
  }

  public async addUserToGroup(
    username: string,
    groupId: string,
  ): Promise<void> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      return;
    }
    user.chats.push(groupId);
    await user.save();
  }

  public async removeUserFromGroup(username: string, groupId: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    user.chats = user.chats.filter((chat) => chat !== groupId);
    await user.save();
  }

  public async getGroupsByUser(username: string): Promise<GroupDto[]> {
    const user = await this.userModel
      .findOne({ username: username })
      .populate('chats');

    if (!user) {
      return [];
    }
    console.log(user.populated('chats'));
    console.log(user.chats);

    // const crdh = user.chats.filter((chat) => chat.isDm === false);
    const groupIds = user.chats;
    const groups = await this.groupModel.find({
      _id: { $in: groupIds },
      isDm: false,
    });
    return groups.map((group) => ({
      name: group.name,
      description: group.description,
      groupId: group._id.toString(),
    }));
  }

  public async getMembersInGroup(groupId: string): Promise<string[]> {
    const usersInGroup = await this.userModel.find({ chats: groupId });
    const usernames = usersInGroup.map((user) => user.username);
    return usernames;
  }
}
