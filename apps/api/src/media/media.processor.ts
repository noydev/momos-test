import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import crawlMedia from './crawler/crawler';
import { MediaService } from './media.service';

@Processor('media')
export class MediaProcessor {
  constructor(private readonly mediaService: MediaService) {}
  private readonly logger = new Logger(MediaProcessor.name);

  @Process('crawler')
  async handleTranscode(job: Job) {
    try {
      const crawledMedias = await crawlMedia(job.data);

      await Promise.all(
        crawledMedias.map(async (mediaDto) => {
          await this.mediaService.create(mediaDto);
        })
      );
      this.logger.debug(`Crawled ${job.data} completed`);
    } catch (error) {
      this.logger.error(`Error crawling  ${job.data} with ${error}`);
    }
  }
}
