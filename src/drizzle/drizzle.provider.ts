import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schema';

export const DrizzleProvider: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      try {
        console.log(`Loading environment variables...`);
        dotenv.config();
        console.log(`Successfully loaded environment variables...`);

        console.log(`Connecting to the database...`);

        const client = postgres(
          `postgres://${process.env.POSTGRES_USER || 'postgres'}:${process.env.POSTGRES_PASSWORD || 'postgres'}@${process.env.POSTGRES_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'postgres'}`,
        );

        const db = drizzle(client, { schema });

        console.log(
          `Successfully connected to the database: ${process.env.POSTGRES_DB || 'postgres'} port: ${process.env.POSTGRES_PORT || 5432}`,
        );

        return db;
      } catch (error: any) {
        console.error('Error connecting to the database', error);
        throw error;
      }
    },
  },
];
