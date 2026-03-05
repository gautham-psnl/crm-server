import {
    PipeTransform,
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private readonly schema: ZodSchema) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: unknown, metadata: any) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message: 'Validation failed',
                    errors: error.issues.map((e) => ({
                        path: e.path.join('.'),
                        message: e.message,
                    })),
                });
            }
            throw new BadRequestException('Validation failed');
        }
    }
}
