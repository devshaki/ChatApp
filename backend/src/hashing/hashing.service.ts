import { Injectable } from '@nestjs/common';
import {hashSync,compareSync} from 'bcrypt-ts';

@Injectable()
export class HashingService {


    hashPassword(password: string): string {
        return hashSync(password,0);
    }

    verifyPassword(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword);
    }
}
