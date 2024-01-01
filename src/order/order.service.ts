import { Injectable } from '@nestjs/common';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { DBService } from 'src/db/db.service';
import { CreateOrderDto } from './Order.dto';
import { StoreService } from 'src/store/store.service';
import axios from 'axios';

@Injectable()
export class OrderService {
  private readonly s3Client = new S3Client({
    region: this.config.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    private db: DBService,
    private config: ConfigService,
    private storeService: StoreService,
  ) {}

  async getStoreOrders(instanceId: string) {
    const orders = this.db.order.find({ instanceId: instanceId });
    return orders;
  }

  async createOrder(body: Partial<CreateOrderDto>) {
    const order = new this.db.order(body);
    await order.save();

    const store = await this.db.stores.findOne({ instanceId: body.instanceId }).lean();

    const access_token = await this.storeService.get_access_token(store.refreshToken);

    const { data } = await axios.get(`https://www.wixapis.com/stores/v2/orders/${body.orderId}`, {
      headers: {
        Authorization: access_token,
      },
    });

    console.log(data);

    order.orderNumber = data.order.number;
    order.lineItems = JSON.stringify(data.order.lineItems);
    order.buyerInfo = JSON.stringify(data.order.buyerInfo);

    await order.save();

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

  // private public_key = `-----BEGIN PUBLIC KEY-----
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkXNw04jMuANLBAwNvULm
  // dm+R9zD8ForzliMkTT23xAx/ppdbrkZMXXAM48mJdvqVKsDPgCafhZjQuVeqkm+3
  // /F80I5jOQkQymIx7JSDjUcuA+7p5NewPf5J3mMwU3Ghk6n8oW0w1Ji0pwCYGP3zm
  // c/J6m6rxbCVnAT//itOneEc1qCow4av87RUKszIoY1URQdJUq8B7zSD+Us4wp4Me
  // fdGTW+qMdnDZHG8WlnV5smtkJWsrY9XocYsX+AtkCFu1o5c4XSdr6ON/FF6E2eGP
  // mFvFT20SZ1S171qxEsk5uD+T1B1v8OiFse9PUis4Y+foBPIOJWpumpUnkOxr/134
  // IwIDAQAB
  // -----END PUBLIC KEY-----`;
  // webhook(jwt: string) {
  //   const result: any = jwtDecode(jwt);

  //   const parsedData = JSON.parse(result.data);

  //   const payload = JSON.parse(parsedData.data);

  //   return { instanceId: parsedData.instanceId, eventType: parsedData.eventType, ...payload };
  // }
}
