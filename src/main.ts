import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
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
}

bootstrap(); // Without clustering

/*
Clustering in nest js will not add significant benefit for the application
You can refer this blog : https://medium.com/deno-the-complete-reference/the-benefits-of-clustering-nestjs-app-in-node-js-hello-world-case-85ad53b61d90#:~:text=The%20cluster%20module%20allows%20easy,and%20scalable%20server%2Dside%20applications.
*/
// ClusterService.clusterize(bootstrap); // start application using clustering

