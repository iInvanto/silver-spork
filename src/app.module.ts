import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { DbModule } from "./database/database.module";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.local", ".env.production"],
      load: [configuration],
      isGlobal: true,
    }),
    DbModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "users", method: RequestMethod.GET });
  }
}
