import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message, MessageSchema } from './message.schema'; // <--- ДОБАВИТЬ ЭТОТ ИМПОРТ

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('CHAT_MONGODB_URI'),
        connectionFactory: (connection) => {
          if (connection.readyState === 1) {
            console.log('✅ MongoDB connected successfully for App!');
          }
          connection.on('connected', () => console.log('MongoDB App event: connected'));
          connection.on('disconnected', () => console.log('MongoDB App event: disconnected'));
          connection.on('error', (error: any) => console.log('MongoDB App event: error', error));
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]), // <--- ДОБАВИТЬ ЭТУ СТРОКУ
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
