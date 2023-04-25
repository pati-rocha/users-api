import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUserAlreadyExist } from './isUserExists.validator';

export class User {
  id: string;

  @IsNotEmpty({
    message: 'login is required',
  })
  @IsString({
    message: 'login is nees to be a string',
  })
  @IsUserAlreadyExist({})
  login: string;

  @IsEmail({})
  email: string;

  @IsNotEmpty({
    message: 'password is required',
  })
  password: string;

  @IsNotEmpty({
    message: 'fullname is requires',
  })
  fullName: string;
  address: Address;
  createDate: Date;
}

export class Address {
  road: string;
  number: number;
}
