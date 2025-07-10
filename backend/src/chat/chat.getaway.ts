import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "src/dto/message.dto";
import { ChatService } from "./chat.service";
import { Server, Socket } from "socket.io";
import * as cookie from 'cookie';
import { CookiesService } from "src/cookies/cookies.service";

@WebSocketGateway()
export class ChatGateway {

    constructor(private readonly chatService: ChatService, private readonly cockiesService:CookiesService) {}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: MessageDto): string {
        const username = this.cockiesService.findCookieInSocket(client, 'username');
        if (!username) {
            client.emit('error', 'Unauthorized user');
            return 'Error: Unauthorized user';
        }
        this.chatService.addMessage(payload, username)
        this.server.emit('message', payload);
        return 'Message received';
    }
}