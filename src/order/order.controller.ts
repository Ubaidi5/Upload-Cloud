import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreateOrderDto } from './Order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-image')
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 52428800 }), // byte * kb * mb
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('fileName') fileName: string,
  ) {
    return this.orderService.uploadImage(fileName, file.buffer);
  }

  @Post('image')
  getImage(@Body('fileName') fileName: string, @Res() res: Response) {
    return this.orderService.getImage(fileName, (err: any, data: any) => {
      if (err) {
        res.status(404).json(err);
      }
      res.writeHead(200, {
        // 'Content-Type': 'image/jpeg',
        'Content-Length': data.ContentLength,
      });
      data.Body.transformToByteArray().then((buffer: Buffer) => {
        res.end(buffer);
      });
    });
  }

  // @Post('webhook')
  // async webhook(@Body() body: any, @Req() req: any) {
  //   const payload = this.orderService.webhook(req.digest);
  //   console.log('DATA:---->', payload);

  //   const store = await this.db.stores.findOne({ instanceId: payload.instanceId }).lean();
  //   console.log('Store:---->', store);

  //   const access_token = await this.storeService.get_access_token(store.refreshToken);
  //   console.log('access_token:---->', access_token);

  //   const { data } = await axios.get(`https://www.wixapis.com/stores/v2/orders/${payload.orderId}`, {
  //     headers: {
  //       Authorization: access_token,
  //     },
  //   });

  //   console.log(data);
  // }
}
