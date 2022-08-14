import { error } from "console";
import express from "express";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    "in order to proccess an image change the url to the following structure":
      "/images?filename=image_name&width=width&height=height",
  });
});

app.get(
  "/images",
  async (req: { query: { filename: any; width: any; height: any } }, res) => {
    //checks if all paramteres are given in the url
    if (
      req.query &&
      req.query.filename &&
      req.query.width &&
      req.query.height
    ) {
      let filename: string = (req.query as any).filename + ".jpg";
      let width: number = +(req.query as any).width;
      let heigth: number = +(req.query as any).height;
      let outputname: string =
        (req.query as any).filename +
        "_thumb" +
        "_" +
        width +
        "x" +
        heigth +
        ".jpg";

      //checks if thumb exists for image
      if (fs.existsSync(`./assets/thumb/${outputname}`)) {
        //if yes
        res.sendFile(path.resolve(`assets/thumb/${outputname}`));
        console.log("thumb already created for this file");
      } else {
        //if no creates one
        console.log("proccessing image");
        setTimeout(() => {
          sharp(`./assets/full/${filename}`)
            .resize(width, heigth)
            .toFile(`./assets/thumb/${outputname}`, function (err: any) {
              if (err) {
                console.log(err);
              }
            });
        }, 0);
        setTimeout(() => {
          res.sendFile(path.resolve(`assets/thumb/${outputname}`));
        }, 3000);
      }
    } else {
      res.json("missing url params");
    }
  }
);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

export default app;
