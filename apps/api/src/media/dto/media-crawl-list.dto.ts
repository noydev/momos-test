import { IsNotEmpty } from 'class-validator';

export class CrawlListMediaDto {
  @IsNotEmpty()
  list: string[];
}
