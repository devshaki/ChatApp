import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "src/dto/message.dto";
import { ChatService } from "./chat.service";
import { Server, Socket } from "socket.io";
import * as cookie from 'cookie';
import { CookiesService } from "src/cookies/cookies.service";
import { AuthGateway } from "src/auth/auth.gateway";
import { DatabaseService } from "src/database/database.service";

@WebSocketGateway()
export class ChatGateway {

    constructor(private readonly chatService: ChatService, private readonly cockiesService:CookiesService, private readonly authGateway:AuthGateway, private readonly databaseService:DatabaseService) {}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: MessageDto): string {
        const username = this.cockiesService.findCookieInSocket(client, 'username');
        if (!username) {
            client.emit('error', 'Unauthorized user');
            return 'Error: Unauthorized user';
        }
        this.chatService.emitToChat(payload.chatId, "message",payload);
        this.chatService.addMessage(payload, username)
        this.server.emit('message', payload);
        return 'Message received';
    }

    @SubscribeMessage('add')
    handleJoin(client: Socket, groupId: string): string {
        const username = this.cockiesService.findCookieInSocket(client, 'username');
        if (!username) {
            client.emit('error', 'Unauthorized user');
            return 'Error: Unauthorized user';
        }
        const joinMessage:MessageDto = {body:this.authGateway.getClientUsername(client) + " has joined the chat",chatId:groupId,senderId:"console"};
        this.chatService.emitToChat(groupId, "message", joinMessage);
        this.chatService.addMessage(joinMessage, username);
        this.databaseService.addUserToGroup(groupId, username);
        return 'User joined the chat';
    }

    @SubscribeMessage('leave')
    handleLeave(client: Socket, groupId: string): string {
        const username = this.cockiesService.findCookieInSocket(client, 'username');
        if (!username) {
            client.emit('error', 'Unauthorized user');
            return 'Error: Unauthorized user';
        }
        const leaveMessage:MessageDto = {body:this.authGateway.getClientUsername(client) + " has left the chat",chatId:groupId,senderId:"console"};
        this.chatService.emitToChat(groupId, "message", leaveMessage);
        this.chatService.addMessage(leaveMessage, username);
        this.databaseService.removeUserFromGroup(username, groupId);
        return 'User left the chat';
    }

    @SubscribeMessage('kick')
    handleKick(client: Socket, payload: { groupId: string, username: string }): string {
        const adminUsername = this.cockiesService.findCookieInSocket(client, 'username');
        if (!adminUsername) {
            client.emit('error', 'Unauthorized user');
            return 'Error: Unauthorized user';
        }
        const kickMessage:MessageDto = {body:`${adminUsername} has kicked ${payload.username} from the chat`,chatId:payload.groupId,senderId:"console"};
        this.chatService.emitToChat(payload.groupId, "message", kickMessage);
        this.chatService.addMessage(kickMessage, adminUsername);
        this.databaseService.removeUserFromGroup(payload.username, payload.groupId);
        return `User ${payload.username} kicked from the chat`;
    }


}