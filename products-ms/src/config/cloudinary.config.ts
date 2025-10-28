import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { envConfig } from './env.config';

@Injectable()
export class CloudinaryProvider {
  static init() {
    return {
      provide: 'CLOUDINARY',
      useFactory: this.cloudinaryConfigFactory,
    };
  }

  private static cloudinaryConfigFactory() {
    return cloudinary.config({
      cloud_name: envConfig.CLOUDINARY_NAME,
      api_key: envConfig.CLOUDINARY_API_KEY,
      api_secret: envConfig.CLOUDINARY_API_SECRET,
    });
  }
}
