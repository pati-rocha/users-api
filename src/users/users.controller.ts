import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  //private UserService = new UsersService();
  constructor(private userService: UsersService) {}

  // /users/login -> route params
  @Get(':login')
  public getUsersByLogin(@Param('login') login: string): User {
    const user = this.userService.searchByLogin(login);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found!',
      });
    }
    return user;
  }

  // users?page=0&size=10 -> query params
  @Get()
  public getAll(
    @Query('page') page: number,
    @Query('page') size: number,
  ): Array<User> {
    //o retorno vai ser um array de User
    console.log(page);
    console.log(size);
    return this.userService.getUsers();
  }

  @Post()
  //Body está sendo atribuído a variável user
  public create(@Body() user: User): User {
    //o Body vai receber o User e o retorno vai ser um USer
    const userCreated = this.userService.create(user);
    return userCreated;
  }

  @Post(':login')
  @HttpCode(200) //forma de alterar o código default q seria 201
  @Header('x-teste', 'essa msensagem é fake') //header customizado
  public validateUser(@Param('login') login: string): object {
    console.log(login);
    return {
      message: 'Usuário válido!',
    };
  }
}
