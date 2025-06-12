// apps/chat/src/mongo-seed.ts
import * as dotenv from 'dotenv'; // ИСПРАВЛЕНО ЗДЕСЬ
import * as fs from 'fs';
import mongoose, { Model, connect, disconnect, model } from 'mongoose';
import { resolve } from 'path';

interface IMessageSeed {
  text: string;
  sender: string;
  roomId: string;
}
const MessageSchemaForSeed = new mongoose.Schema<IMessageSeed>(
  {
    text: { type: String, required: true },
    sender: { type: String, required: true, index: true },
    roomId: { type: String, index: true },
  },
  { timestamps: true },
);
const MessageModelForSeed: Model<IMessageSeed> = model<IMessageSeed>('Message', MessageSchemaForSeed);


async function seedDatabase() {
  const envPath = resolve(__dirname, '../.env');
  console.log(`ℹ️ Attempting to load .env file from: ${envPath}`);

  if (fs.existsSync(envPath)) {
    console.log(`✅ .env file found at: ${envPath}`);
    const envConfig = dotenv.config({ path: envPath }); // Теперь dotenv должен быть определен
    if (envConfig.error) {
      console.error('🔴 Error loading .env file:', envConfig.error);
    }
    if (envConfig.parsed) {
      console.log('📝 .env file parsed. Variables found:', Object.keys(envConfig.parsed));
    }
  } else {
    console.error(`🔴 .env file NOT found at: ${envPath}`);
  }

  console.log(`Value of CHAT_MONGODB_URI from process.env: [${process.env.CHAT_MONGODB_URI}]`);

  const mongoUri = process.env.CHAT_MONGODB_URI;

  if (!mongoUri) {
    console.error('🔴 CHAT_MONGODB_URI is still not defined in process.env after dotenv.config()');
    process.exit(1);
  }

  try {
    await connect(mongoUri);
    console.log('✅ Connected to MongoDB for seeding');

    const existingMessages = await MessageModelForSeed.countDocuments();
    if (existingMessages === 0) {
      console.log('🌱 No messages found, seeding initial messages...');
      await MessageModelForSeed.create([
        { text: 'Seed: General Kenobi!', sender: 'SeedBot', roomId: 'general' },
        { text: 'Seed: Hello there!', sender: 'SeedBot', roomId: 'another_room' },
      ]);
      console.log('👍 Initial messages seeded!');
    } else {
      console.log(`ℹ️ ${existingMessages} messages already exist, skipping seeding.`);
    }
  } catch (error) {
    console.error('🔴 Error during MongoDB seeding:', error);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        await disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
  }
}

seedDatabase();
