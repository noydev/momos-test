import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaController } from './media.controller';
import { Media } from './media.entity';
import { MediaProcessor } from './media.processor';
import { MediaService } from './media.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    BullModule.registerQueue({
      name: 'media',
    }),
  ],
  providers: [MediaService, MediaProcessor],
  controllers: [MediaController],
})
export class MediaModule {}
