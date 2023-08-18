import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /** Setup Global Pipes */
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const PORT = 3000;
    app.listen(PORT).then(() => console.log(`Server listening on port ${PORT}`));
}
bootstrap();
