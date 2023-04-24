import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StringUtils } from 'src/utils/string.utils';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: Array<User> = [];

  constructor(private stringUtils: StringUtils) {}

  public create(user: User): User {
    user.id = randomUUID();
    user.createDate = new Date();
    user.fullName = this.stringUtils.nameLowerCase(user.fullName);
    this.users.push(user);
    return user;
  }
  //Boa prática tipar tbm o retorno
  public getUsers(): User[] {
    return this.users;
  }

  public searchByLogin(login: string): User {
    const user = this.users.find((user) => user.login == login);
    return user;
  }
}
