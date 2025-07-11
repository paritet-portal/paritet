import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    NEXT_PUBLIC_API_URL: z.string().url({ message: 'NEXT_PUBLIC_API_URL must be a valid URL' }).optional(),
});
const envObject = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};
console.log('[DEBUG] env vars passed to Zod:', envObject);
const parsedEnv = envSchema.safeParse(envObject);

// if (!parsedEnv.success) {
//     console.error('❌ Invalid environment variables:', parsedEnv.error.format());
//     throw new Error('❌ Failed to parse environment variables.');
// }
if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:', parsedEnv.error.format());
    console.warn('process.env:', process.env); // тимчасово
    throw new Error('❌ Failed to parse environment variables. Check .env.local or .env file');
}

export const env = parsedEnv.data;
export const API_BASE_URL = env.NEXT_PUBLIC_API_URL;
