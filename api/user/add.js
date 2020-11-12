import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addUser } from "../../controllers/user";
import { ROLE } from "../../utilities/constants";
import { checkToken } from "../../utilities/universal";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user:
 *  post:
 *   tags: ["user"]
 *   summary: user add api
 *   description: api used to add users
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           firstName:
 *             type: string
 *             required:
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           role:
 *             type: integer
 *             default: 1
 *             required:
 *   responses:
 *    '200':
 *    description: success
 */

const userSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .label("First name"),
  lastName: Joi.string()
    .optional()
    .allow("")
    .label("Last name"),
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  password: Joi.string()
    .trim()
    .required()
    .label("Password"),
  role: Joi.number()
    .valid(ROLE.USER, ROLE.ADMIN)
    .required()
    .label("Role"),
});

app.post(
  "/user",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  addUser
);

export default app;
