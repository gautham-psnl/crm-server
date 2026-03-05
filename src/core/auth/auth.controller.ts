import { All, Controller, Req, Res, UsePipes } from '@nestjs/common';
import type { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './better-auth';

// Better Auth manages its own body parsing and validation — bypass NestJS's
// global ValidationPipe entirely for all /api/auth/* routes.
@UsePipes()
@Controller('api/auth')
export class AuthController {
    @All('/*path')
    async handleBetterAuth(@Req() req: Request, @Res() res: Response) {
        const handler = toNodeHandler(auth.handler);
        return handler(req, res);
    }
}
