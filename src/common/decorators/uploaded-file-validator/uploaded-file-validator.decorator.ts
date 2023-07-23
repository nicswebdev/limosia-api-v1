import { ParseFilePipeBuilder, UploadedFile } from '@nestjs/common';

interface Options {
  fileType?: string | RegExp;
  maxSize?: number;
  isRequired?: boolean;
}

export const UploadedFileValidator = (options?: Options) => {
  return UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: options?.fileType ?? /(jpg|jpeg|png)$/,
      })
      .addMaxSizeValidator({
        maxSize: (options?.maxSize ?? 2048) * 1000,
      })
      .build({
        fileIsRequired: options?.isRequired ?? true,
      }),
  );
};
