// apps/backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClientOptions } from '@prisma/client/runtime/library'; // Для типизации options, если хотите
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service'; // Убедитесь, что PrismaService импортируется отсюда, а не из @prisma/client

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.local', '.env'], // Можно оставить, если планируете .env.local
      envFilePath: `.env`, // Или просто .env, если .env.local пока не используется
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: PrismaService,
      inject: [ConfigService], // ConfigService будет внедрен в useFactory
      useFactory: (configService: ConfigService): PrismaService => {
        // Логика сборки URL, как мы делали для Mongoose
        const nodeEnv = configService.get<string>('NODE_ENV');
        if (!nodeEnv) throw new Error('[BackendService] NODE_ENV is not defined');

        const user = configService.get<string>('DB_USER');
        if (!user) throw new Error('[BackendService] DB_USER is not defined');

        const password = configService.get<string>('DB_PASSWORD');
        if (!password) throw new Error('[BackendService] DB_PASSWORD is not defined');

        const port = configService.get<string>('DB_PORT');
        if (!port) throw new Error('[BackendService] DB_PORT is not defined');

        const dbName = configService.get<string>('DB_NAME');
        if (!dbName) throw new Error('[BackendService] DB_NAME is not defined');

        const schema = configService.get<string>('DB_SCHEMA');
        if (!schema) throw new Error('[BackendService] DB_SCHEMA is not defined');

        let host: string;

        if (nodeEnv === 'production') {
          const prodHost = configService.get<string>('PROD_DB_HOST');
          if (!prodHost) {
            throw new Error('[BackendService] PROD_DB_HOST is not defined for production');
          }
          host = prodHost;
        } else {
          const devHost = configService.get<string>('DEV_DB_HOST');
          if (!devHost) {
            throw new Error('[BackendService] DEV_DB_HOST is not defined for development');
          }
          host = devHost;
        }

        const dynamicDatabaseUrl = `postgresql://${user}:${password}@${host}:${port}/${dbName}?schema=${schema}`;

        console.log(`[BackendService] NODE_ENV: ${nodeEnv}`);
        console.log(`[BackendService] PrismaService factory will use datasource URL: ${dynamicDatabaseUrl}`);

        // Типизация options необязательна, но может помочь с автодополнением
        const prismaOptions: PrismaClientOptions = {
          datasources: {
            db: { // 'db' должно совпадать с именем вашего datasource в schema.prisma
              url: dynamicDatabaseUrl,
            },
          },
          // Здесь можно добавить другие опции PrismaClient, если они нужны, например, логирование
          // log: ['query', 'info', 'warn', 'error'],
        };
        return new PrismaService(prismaOptions);
      },
    },
  ],
})
export class AppModule {}
