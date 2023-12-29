import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { DBService } from 'src/db/db.service';
import { CreateOrderDto } from './Order.dto';
// AWS_ACCESS_KEY_ID
// AWS_ACCESS_KEY_SECRET
// AWS_S3_REGION
@Injectable()
export class OrderService {
  private readonly s3Client = new S3Client({
    region: this.config.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    private db: DBService,
    private config: ConfigService,
  ) {}

  async createOrder(body: Partial<CreateOrderDto>) {
    const order = new this.db.order(body);
    order.save();

    return order;
  }

  async uploadImage(fileName: string, file: Buffer) {
    const data = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'upload-cloud-images',
        Key: fileName,
        Body: file,
      }),
    );

    return data;
    // try {
    // } catch (err) {
    //   throw new BadRequestException(err);
    // }
  }

  async getImage(fileName: string, cb: (err: any, data: any) => any) {
    this.s3Client.send(
      new GetObjectCommand({
        Bucket: 'upload-cloud-images',
        Key: fileName,
      }),
      cb,
    );
  }
}
