import fs from "fs";
import { resolve } from "path";

export function check(filename: string, width: any, height: any): boolean{
    if (!fs.existsSync(`assets/full/${filename}`)){
        return false
    }
    if (width < 1 || height < 1){
        return false
    }
    return true
}