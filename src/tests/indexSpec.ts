import app from '../index';
import fs from 'fs';
import supertest from 'supertest';
import { Request } from 'express';
const request = supertest(app);
import { crop } from '../utilities/sharpFunc.js';

describe('I- test my working endpoint', (): void => {
  it('1. tests the api endpoint', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('2. tests successful access to the api endpoint ', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status === 400).toBeFalsy();
  });
});

describe("II- Tests application's functionality", (): void => {
  it('1. tests the availability of the thumbnail image in the thumb folder', () => {
    expect(
      app.get('/images', (req: Request): string[] =>
        fs.readdirSync(
          `./assets/thumb/${req.query.filename}_thumb` + '_' + req.query.width + 'x' + req.query.height + '.jpg',
        ),
      ),
    ).toBeTruthy();
  });
  it('2. tests the resizing of the thumbnail image', (): void => {
    app.get('/images', function testImg(req: Request): void {
      const thumbProps: fs.Stats = fs.statSync(
        `./assets/thumb/${req.query.filename}_thumb` + '-' + req.query.width + 'x' + req.query.height + '.jpg',
      );
      const thumbSize: number = thumbProps.size;
      const imgProps: fs.Stats = fs.statSync(`./assets/images/${req.query.filename}.jpg`);
      const imgSize: number = imgProps.size;
      expect(imgSize).toBeGreaterThan(thumbSize);
    });
  });
  it('3. tests image resizing', (): void => {
    const testFilePath = 'fjord' + '.jpg';
    const testWidth = 600;
    const testHeight = 600;
    const testThumbPath = 'fjord' + '_thumb' + '_' + testWidth + 'x' + testHeight + '.jpg';
    expect(async () => {
      await crop(testFilePath, testWidth, testHeight, testThumbPath);
    }).not.toThrow();
  });
});
