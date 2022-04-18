export class MediaResponseDto {
  constructor(data: Media[], count: number) {
    this.data = data;
    this.count = count;
  }
  data: Media[];
  count: number;
}

class Media {
  type: string;
  url: string;
  origin: string;
}
