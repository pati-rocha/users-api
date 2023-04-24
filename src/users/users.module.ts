import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { StringUtils } from 'src/utils/string.utils';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, StringUtils],
})
export class UsersModule {}
