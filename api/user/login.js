import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { login } from "../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *   tags: ["user"]
 *   summary: user login api
 *   description: api used to login users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *    description: success
 */

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  password: Joi.string()
    .required()
    .label("Password")
});

app.post(
  "/user/login",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  login
);

export default app;
