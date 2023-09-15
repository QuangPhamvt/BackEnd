import { DocumentBuilder } from '@nestjs/swagger'

export const configDocumentation = new DocumentBuilder()
  .setTitle('Project')
  .setDescription('The Project API description')
  .setVersion('1.0')
  .addBearerAuth(
    {
      description: `Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'header',
    },
    'access-token',
  )
  .build()
