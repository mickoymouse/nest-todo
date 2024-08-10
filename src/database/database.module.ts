import { Module } from '@nestjs/common';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  providers: [...DrizzleProvider],
  exports: [...DrizzleProvider],
})
export class DatabaseModule {}
