import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Media } from './media.entity';
import { MediaService } from './media.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CrawlListMediaDto } from './dto/media-crawl-list.dto';
import { PaginationDto } from './dto/pagination.dto';
import { MediaResponseDto } from './dto/media-response.dto';
import { QueryOptionDto } from './dto/query-option.dto';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    @InjectQueue('media') private readonly mediaQueue: Queue
  ) {}

  @Post()
  async create(@Body() crawlListMediaDto: CrawlListMediaDto) {
    const crawlList = crawlListMediaDto.list;
    if (!crawlListMediaDto || !crawlList || !Array.isArray(crawlList)) {
      throw new BadRequestException({}, 'empty body');
    }
    await Promise.all(
      crawlList.map(async (url) => {
        return await this.mediaQueue.add('crawler', url);
      })
    );
    return { status: 'ok' };
  }

  @Get()
  findAll(@Query() queryOptionDto: QueryOptionDto): Promise<MediaResponseDto> {
    return this.mediaService.findAll(queryOptionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Media> {
    return this.mediaService.findOne(id);
  }
}
