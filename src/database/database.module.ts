import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DatabaseConfig } from "src/config/configuration";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const { database, host, port, username, password } =
          configService.get<DatabaseConfig>("database");

        return {
          type: "postgres",
          database,
          host,
          port,
          username,
          password,
          autoLoadEntities: true,
          synchronize: true, // This option should not be use in production
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
