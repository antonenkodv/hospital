import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    /** Setup Global Pipes */
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const PORT = configService.get<number>('PORT');

    app.listen(PORT).then(() => console.log(`Server listening on port ${PORT}`));
}
bootstrap();
