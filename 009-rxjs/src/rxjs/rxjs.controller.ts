import { Controller, Get, Query } from "@nestjs/common";
import { RxjsService } from "./rxjs.service";
import { IParamText } from "./interfaces/text-param";

@Controller("rxjs")
export class RxjsController {
  constructor(private rxjsService: RxjsService) {}

  @Get("repositories/")
  async repositories(@Query() { text }: IParamText) {
    return await this.rxjsService.searchBothPlatforms(text);
  }
}
