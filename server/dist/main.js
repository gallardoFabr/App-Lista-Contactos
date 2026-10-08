import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import * as dotenv from "dotenv";
import { ValidationPipe } from '@nestjs/common';
dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: '*',
    });
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
//# sourceMappingURL=main.js.map