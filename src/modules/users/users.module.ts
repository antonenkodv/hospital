import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from '../../core/models/users/user.provider';

@Module({
    providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
