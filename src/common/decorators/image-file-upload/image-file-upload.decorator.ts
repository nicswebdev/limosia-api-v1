import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface Options {
  destination?: string;
}

export const ImageFileUploadInterceptor = (options: Options) => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: options.destination ?? './public/uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;

            cb(null, filename);
          },
        }),
      }),
    ),
  );
};
