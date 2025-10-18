import { Injectable, NotFoundException } from '@nestjs/common';

import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'ecommerce/products' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return cloudinary.uploader.destroy(
        publicId,
        { invalidate: true },
        (error, result: any) => {
          if (error) return reject(error);

          if (result.result === 'not found') {
            const ErrorMessage = `Image with id ${publicId} not found`;
            return reject(new NotFoundException(ErrorMessage));
          }

          resolve(result);
        },
      );
    });
  }
}
