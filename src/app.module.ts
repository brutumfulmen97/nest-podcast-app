import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { TopcisModule } from './topcis/topcis.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [EpisodesModule, TopcisModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
