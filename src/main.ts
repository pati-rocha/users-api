import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //fallbackOnErros -> Se definido como true, o contêiner padrão(container IOC fornecido pelo Nest) será usado caso o contêiner fornecido gere uma exceção na injeção de dependência
  await app.listen(3000);
}
bootstrap();
