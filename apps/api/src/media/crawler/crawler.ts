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
    // const url = response.url();
    if (response.request().resourceType() === 'image') {
      console.log(response.request().url());
      listMediaDto.push({
        type: 'image',
        url: response.request().url(),
        origin: crawlUrl,
      });
    } else if (response.request().resourceType() === 'media') {
      console.log(response.request().url());
      listMediaDto.push({
        type: 'video',
        url: response.request().url(),
        origin: crawlUrl,
      });
    }
  });
  await page.goto(crawlUrl);
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
