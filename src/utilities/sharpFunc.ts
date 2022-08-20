import sharp from 'sharp';

export function crop(filename: string, width: number, height: number, outputname: string): void {
  sharp(`assets/full/${filename}`)
    .resize(width, height)
    .toFile(`assets/thumb/${outputname}`, function (err: Error) {
      if (err) {
        console.log(err);
      }
    });
}
