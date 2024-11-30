import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';

@Module({})
export class TopicsModule {
  imports: [ConfigModule];
}
