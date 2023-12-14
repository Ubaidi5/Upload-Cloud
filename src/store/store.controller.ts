import { Body, Controller, Get, Post } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('install')
  install(@Body() code: string) {
    return this.storeService.install(code);
  }

  @Get('load')
  async load_store(@Body() instanceId: string) {
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
      throw err;
    }
  }

  @Post('embed_script')
  async embed_script(@Body() instanceId: string) {
    // const access_token
  }
}
