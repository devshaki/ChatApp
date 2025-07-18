import { Injectable } from '@nestjs/common';
import { hashSync, compareSync } from 'bcrypt-ts';

@Injectable()
export class HashingService {
  public hashPassword(password: string): string {
    return hashSync(password, 10);
  }

  public verifyPassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
