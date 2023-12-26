import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { GetProductDto, GetProductByIdDto } from './store.dto';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('install')
  install(@Body('code') code: string) {
    return this.storeService.install(code);
  }
  //
  @Get('load')
  async load_store(@Headers('X-InstanceId') instanceId: string) {
    // return this.storeService.load_store(instanceId);
    try {
      // get store
      const store = await this.storeService.get_store_by_instanceId(instanceId);

      // get access_token
      const access_token = await this.storeService.get_access_token(store.refreshToken);

      // get store instance
      const app = await this.storeService.get_app_instance(access_token);

      return {
        store,
        site: app.site,
        instance: app.instance,
      };
    } catch (err) {
      console.log({ message: 'Error on load API' });
      throw err;
    }
  }

  @Post('embed_script')
  async embed_script(
    @Body('instanceId') instanceId: string,
    @Headers('authorization') authorization: string,
  ) {
    const access_token = await this.storeService.get_access_token(authorization);

    return this.storeService.embed_script(instanceId, access_token);
  }

  @Post('product')
  async get_product_by_id(@Body() body: GetProductByIdDto) {
    try {
      // get store
      const store = await this.storeService.get_store_by_instanceId(body.instanceId);

      // get access_token
      const access_token = await this.storeService.get_access_token(store.refreshToken);

      // Get product data through wix
      const data = await this.storeService.get_product_by_id(body, access_token);

      return data.products[0] || {};
    } catch (err) {
      throw err;
    }
  }

  @Post('products')
  async get_products(@Body() body: GetProductDto, @Headers('authorization') authorization: string) {
    const access_token = await this.storeService.get_access_token(authorization);
    return this.storeService.get_products(body, access_token);
  }
}
