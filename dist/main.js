"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    setupSwagger(app);
    await app.listen(3000);
}
function setupSwagger(app) {
    const builder = new swagger_1.DocumentBuilder();
    const config = builder
        .setTitle('SMMS MES API Document')
        .setDescription('Base URL: localhost:3000/api')
        .setVersion('1.0')
        .addApiKey(null, "token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const options = {
        explorer: true,
    };
    swagger_1.SwaggerModule.setup('api', app, document, options);
}
bootstrap();
//# sourceMappingURL=main.js.map