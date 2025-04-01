import { Request } from "express";
import { mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { BadRequestException } from "@nestjs/common";

export type CallbackDestination = (error: Error | null, destination: string) => void;
export type CallbackFileName = (error: Error | null, filename: string ) => void;
export type MulterFile = Express.Multer.File;

export function multerDestination(fieldName: string) {
    return function (req: Request, file: MulterFile, callback: CallbackDestination): void {
        const path = join("public", "uploads", fieldName);
        mkdirSync(path, { recursive: true });
        callback(null, path);
    };
}

export function multerFileName(req: Request, file: MulterFile, callback: CallbackFileName): void {
    const ext = extname(file.originalname).toLowerCase();
    if (!isValidFormat(ext)) {
        callback(new BadRequestException("Invalid Image Format"), "invalid-file")
    } else {
        const userId = req.user?.id;
        const fileName = `${userId}${ext}`
        callback(null, fileName)
    }
}


function isValidFormat(ext: string) {
    return [".png", ".jpg", ".jpeg"].includes(ext)
}

export function multerStorage(folderName: string) {
    return diskStorage({
        destination: multerDestination(folderName),
        filename: multerFileName,
    });
}
