import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { StringUtils } from 'src/utils/string.utils';
import { IsUserAlreadyExistConstraint } from './isUserExists.validator';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, StringUtils, IsUserAlreadyExistConstraint],
})
export class UsersModule {}
