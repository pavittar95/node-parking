import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { list } from "../../controllers/user";
import { checkToken } from "../../utilities/universal";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *   tags: ["user"]
 *   summary: user list api
 *   description: api used to users list
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: query
 *        name: pageNumber
 *      - in: query
 *        name: search
 *   responses:
 *    '200':
 *    description: success
 */

const userSchema = Joi.object({
  pageNumber: Joi.number()
    .optional()
    .allow("")
    .label("Page number"),
  search: Joi.string()
    .optional()
    .allow("")
    .label("Search text")
});

app.get(
  "/user",
  validator.query(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  list
);

export default app;
