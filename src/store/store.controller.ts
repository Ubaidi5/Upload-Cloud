import { Controller, Get, Post } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('')
  create_store() {}

  @Get('instance')
  get_store_instance() {}
}
