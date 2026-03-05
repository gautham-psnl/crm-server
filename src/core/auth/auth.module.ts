import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PermissionGuard } from '../../common/guards/permission.guard';

@Module({
    controllers: [AuthController],
    providers: [PermissionGuard],
    exports: [PermissionGuard],
})
export class AuthModule { }
