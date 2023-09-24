import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";

import cluster, { Worker } from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";

const maxWorkers = Number(process.env.NODE_CLUSTER_MAX_WORKERS ?? "1");
const numCPUs = availableParallelism();
const numWorkers = Math.min(maxWorkers, numCPUs);

async function bootstrap() {
  if (cluster.isPrimary && numWorkers > 1) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker: Worker, code) => {
      console.error(`Worker ${worker.process.pid} exited with code ${code}`);
      console.log("Fork new worker!");
      cluster.fork();
    });
  } else {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle("Users CRUD")
      .setDescription("Learning Users CRUD in Nest.js")
      .setVersion("1.0")
      .addTag("users")
      .build();

    const options: SwaggerDocumentOptions = {
      deepScanRoutes: true,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup("swagger-api", app, document);

    const configService = app.get(ConfigService);
    const port = configService.get<number>("port");
    await app.listen(port);

    console.log(`Worker ${process.pid} started`);
  }
}

bootstrap();
