import express from "express";
import { list } from "../../controllers/parking-slot";
import { checkToken } from "../../utilities/universal";

const app = express();
/**
 * @swagger
 * /api/v1/parking-slot:
 *  get:
 *   tags: ["parking slot"]
 *   summary: parking slot list api
 *   description: api used to parking slot list
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *    description: success
 */

app.get("/parking-slot", checkToken, list);

export default app;
