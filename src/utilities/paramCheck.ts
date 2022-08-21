import fs from 'fs';

export function check(filename: string, width: number, height: number): boolean {
  if (!fs.existsSync(`assets/full/${filename}`)) {
    return false;
  }
  if (width < 1 || height < 1) {
    return false;
  }
  return true;
}
