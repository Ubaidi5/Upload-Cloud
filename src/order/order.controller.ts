import {
  Body,
  Controller,
  FileTypeValidator,
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
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
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
}
