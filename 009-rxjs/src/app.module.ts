import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RxjsModule } from "./rxjs/rxjs.module";
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RxjsModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
