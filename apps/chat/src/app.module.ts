// apps/chat/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message, MessageSchema } from './message.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`, // Загружает .env для доступа к CHAT_MONGODB_URI и другим переменным
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule уже загрузил переменные в process.env
      useFactory: async (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV'); // Все еще полезно для логирования или других настроек
        const chatMongoUri = configService.get<string>('CHAT_MONGODB_URI'); // Пытаемся получить готовую строку

        if (!chatMongoUri) {
          // Если CHAT_MONGODB_URI не установлена (например, если вы забыли ее в .env или Docker env),
          // можно оставить вашу старую логику сборки URI как fallback,
          // но это усложняет. Лучше гарантировать, что CHAT_MONGODB_URI всегда есть.
          // Для простоты, сейчас просто выбросим ошибку.
          throw new Error('[ChatService] CHAT_MONGODB_URI is not defined in environment variables.');
        }

        console.log(`[ChatService] NODE_ENV: ${nodeEnv}`);
        console.log(`[ChatService] Attempting to connect to MongoDB with URI from env: ${chatMongoUri}`);

        return {
          uri: chatMongoUri, // Используем URI напрямую из переменной окружения
          connectionFactory: (connection) => {
            if (connection.readyState === 1) {
              console.log('✅ [ChatService] MongoDB connected successfully on initial check!');
            }
            connection.on('connected', () => console.log('✅ [ChatService] MongoDB event: connected'));
            connection.on('disconnected', () => console.log('❌ [ChatService] MongoDB event: disconnected'));
            connection.on('error', (error: any) => console.log('❌ [ChatService] MongoDB event: error', error));
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}









// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { Message, MessageSchema } from './message.schema';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env`,
//     }),
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => {
//         const nodeEnv = configService.get<string>('NODE_ENV');
//         if (!nodeEnv) throw new Error('[ChatService] NODE_ENV is not defined');

//         const user = configService.get<string>('MONGO_USER');
//         if (!user) throw new Error('[ChatService] MONGO_USER is not defined');

//         const password = configService.get<string>('MONGO_PASSWORD');
//         if (!password) throw new Error('[ChatService] MONGO_PASSWORD is not defined');

//         // <<<--- ВОТ ИСПРАВЛЕНИЕ: Объявляем и проверяем port, dbName, authSource --->>>
//         const port = configService.get<string>('MONGO_PORT');
//         if (!port) throw new Error('[ChatService] MONGO_PORT is not defined');

//         const dbName = configService.get<string>('MONGO_DB_NAME');
//         if (!dbName) throw new Error('[ChatService] MONGO_DB_NAME is not defined');

//         const authSource = configService.get<string>('MONGO_AUTH_SOURCE');
//         if (!authSource) throw new Error('[ChatService] MONGO_AUTH_SOURCE is not defined');
//         // <<<----------------------------------------------------------------------->>>

//         let host: string;

//         if (nodeEnv === 'production') {
//           const prodHost = configService.get<string>('PROD_MONGO_HOST');
//           if (!prodHost) {
//             throw new Error('[ChatService] PROD_MONGO_HOST is not defined for production');
//           }
//           host = prodHost;
//         } else {
//           const devHost = configService.get<string>('DEV_MONGO_HOST');
//           if (!devHost) {
//             throw new Error('[ChatService] DEV_MONGO_HOST is not defined for development');
//           }
//           host = devHost;
//         }

//         const uri = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=${authSource}`;

//         console.log(`[ChatService] NODE_ENV: ${nodeEnv}`);
//         console.log(`[ChatService] Attempting to connect to MongoDB with URI: ${uri}`);

//         return {
//           uri: uri,
//           connectionFactory: (connection) => {
//             if (connection.readyState === 1) {
//               console.log('✅ [ChatService] MongoDB connected successfully on initial check!');
//             }
//             connection.on('connected', () => console.log('✅ [ChatService] MongoDB event: connected'));
//             connection.on('disconnected', () => console.log('❌ [ChatService] MongoDB event: disconnected'));
//             connection.on('error', (error: any) => console.log('❌ [ChatService] MongoDB event: error', error));
//             return connection;
//           }
//         };
//       },
//       inject: [ConfigService],
//     }),
//     MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
