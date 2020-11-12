import swaggerJsDocs from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Parking management system apis",
      version: "1.0",
      description: "All api end points",
      contact: {
        name: "Pavittar Singh",
      },
      servers: ["http://localhost:3000"],
    },
    produces: ["application/json"],
  },
  apis: ["./api/user/*.js", "./api/parking-slot/*.js"],
};
export default swaggerJsDocs(swaggerOptions);
