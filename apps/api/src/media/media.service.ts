import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaResponseDto } from './dto/media-response.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>
  ) {}

  create(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = new Media();

    media.type = createMediaDto.type;
    media.url = createMediaDto.url;
    media.origin = createMediaDto.origin;

    return this.mediaRepository.save(media);
  }

  async findAll(paginationDto: PaginationDto): Promise<MediaResponseDto> {
    const queryBuilder = this.mediaRepository.createQueryBuilder('media');

    queryBuilder.skip(paginationDto.skip).take(paginationDto.limit);

    const count = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const mediaRespons = new MediaResponseDto(entities, count);

    return mediaRespons;
  }

  findOne(id: string): Promise<Media> {
    return this.mediaRepository.findOne(id);
  }
}
