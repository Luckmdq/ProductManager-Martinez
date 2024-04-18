export const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Desafio Martinez",
      description: "API de proyecto perteneciente a Martinez Luciano",
    },
  },
  apis: [`src/docs/**/*.yaml`],
};
