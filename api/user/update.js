import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateUser } from "../../controllers/user";
import { ROLE } from "../../utilities/constants";
import { checkToken } from "../../utilities/universal";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user:
 *  put:
 *   tags: ["user"]
 *   summary: user info update api
 *   description: api used to update users info
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: update users info.
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           userId:
 *             type: string
 *             required:
 *           firstName:
 *             type: string
 *             required:
 *           lastName:
 *             type: string
 *           role:
 *             type: integer
 *             required:
 *   responses:
 *    '200':
 *    description: success
 */

const userSchema = Joi.object({
  userId: Joi.string()
    .required()
    .label("User Id"),
  firstName: Joi.string()
    .required()
    .label("First name"),
  lastName: Joi.string()
    .optional()
    .allow("")
    .label("Last name"),
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
  updateUser
);

export default app;
