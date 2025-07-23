import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupDto } from 'src/dto/group.dto';
import { Group, GroupDocument } from 'src/schemas/group.schema';
import { MessageService } from './message.service';
import { GroupService } from './group.service';
import { FriendService } from './friend.service';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class DmService {
  constructor(
    @InjectModel(Group.name)
    private groupModel: Model<GroupDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly friendService: FriendService,
    private readonly groupService: GroupService,
  ) {}

  public async deleteDm(username: string, contact: string): Promise<void> {
    const group = await this.getDm(username, contact);
    if (group && group.groupId) {
      await this.groupModel.findByIdAndDelete(group.groupId);
    }
    await this.friendService.removeFriend(username, contact);
  }
  public async createDm(
    username: string,
    friendname: string,
  ): Promise<GroupDto | undefined> {
    const newDm: GroupDto = {
      name: ``,
      description: ``,
      isDm: true,
    };
    const groupId = await this.groupService.addGroup(newDm, username);
    await this.groupService.addUserToGroup(friendname, groupId);
    return;
  }
  public async getDm(
    username: string,
    friendname: string,
  ): Promise<GroupDto | null> {
    const user = await this.userModel
      .findOne({ username: username })
      .populate('chats');
    if (!user) {
      throw new Error('User not found');
    }
    const friend = await this.userModel
      .findOne({ username: friendname })
      .populate('chats');
    if (!friend) {
      throw new Error('Friend not found');
    }

    const tedt = this.userModel.findOne({
      chats: { $and: [{ $in: user.chats }, { $in: friend.chats }] },
    });
    const temp = this.groupModel.findOne({
      isDm: true,
    });
    const commonGroupIds = user.chats.filter((groupId) =>
      friend.chats.includes(groupId),
    );
    if (commonGroupIds.length === 0) {
      await this.createDm(username, friendname);
      return this.getDm(username, friendname);
    }
    const group = await this.groupModel.findOne({
      _id: { $in: commonGroupIds },
      isDm: true,
    });
    if (!group) {
      await this.createDm(username, friendname);
      return this.getDm(username, friendname);
    }
    return {
      name: group.name,
      description: group.description,
      groupId: group._id.toString(),
      isDm: group.isDm,
    };
  }
}
