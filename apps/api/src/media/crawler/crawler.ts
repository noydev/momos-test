import * as puppeteer from 'puppeteer';
import { CreateMediaDto } from '../dto/create-media.dto';

export default async function crawlMedia(
  crawlUrl: string
): Promise<CreateMediaDto[]> {
  if (!isValidHttpUrl(crawlUrl)) {
    throw new Error('Invalid Url');
  }

  const listMediaDto: CreateMediaDto[] = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('response', async (response) => {
    if (response.request().resourceType() === 'image') {
      response
        .buffer()
        .then((file) => {
          if (file.length > 2000) {
            listMediaDto.push({
              type: 'image',
              url: response.request().url(),
              origin: crawlUrl,
            });
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((err) => {});
    }
  });
  await page.goto(crawlUrl);
  const videoList = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('video'),
      (element) => element.currentSrc
    )
  );
  const videoDto = videoList.map((video) => {
    return {
      type: 'video',
      url: video,
      origin: crawlUrl,
    };
  });
  listMediaDto.push(...videoDto);
  await browser.close();
  return listMediaDto;
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
