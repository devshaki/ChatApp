import { Injectable } from '@nestjs/common';
import { Socket } from "socket.io";
import * as cookie from 'cookie';

@Injectable()
export class CookiesService {

    findCookieInSocket(client: Socket, cookieName: string): string | undefined {
        const rawCookies = client.handshake.headers.cookie || '';
        const parsedCookies = cookie.parse(rawCookies);
        return parsedCookies[cookieName];
    }
}
