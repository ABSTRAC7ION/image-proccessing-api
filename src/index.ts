import express from 'express';
import path from 'path';
import fs from 'fs';
import { crop } from './utilities/sharpFunc.js';
import { check } from './utilities/paramCheck.js';

const app = express();
const port = 3000;

app.get('/', (_req: unknown, res): void => {
  res.status(200).json({
    'in order to proccess an image change the url to the following structure':
      '/images?filename=image_name&width=width&height=height',
  });
});

app.get('/images', async (req: { query: { filename: string; width: number; height: number } }, res) => {
  //checks if all paramteres are given in the url
  if (req.query && req.query.filename && req.query.width && req.query.height) {
    if (isNaN(Number(req.query.width)) || isNaN(Number(req.query.height))) {
      res.status(400).json('please enter a valid number in the width and height parameters');
    } else {
      const filename: string = (req.query as any).filename + '.jpg';
      const width: number = +(req.query as any).width;
      const height: number = +(req.query as any).height;
      const outputname: string = (req.query as any).filename + '_thumb' + '_' + width + 'x' + height + '.jpg';

      if (check(filename, width, height) === true) {
        //checks if thumb exists for image
        if (fs.existsSync(`./assets/thumb/${outputname}`)) {
          //if yes
          res.sendFile(path.resolve(`assets/thumb/${outputname}`));
          console.log('thumb already created for this file');
        } else {
          //if no creates one
          crop(filename, width, height, outputname);
          setTimeout(() => {
            res.sendFile(path.resolve(`assets/thumb/${outputname}`));
          }, 3000);
        }
      } else {
        res.status(400).json('invalid or missing url parameters');
      }
    }
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

export default app;
