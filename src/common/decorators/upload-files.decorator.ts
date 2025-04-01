import { applyDecorators, ParseFilePipe, UploadedFile, } from "@nestjs/common";

export function uploadedOptionalFile(){
    return  UploadedFile(new ParseFilePipe(
            {fileIsRequired:false,
              validators:[]
            }
        ))
}