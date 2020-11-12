import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { add } from "../../controllers/parking-slot";
import { checkToken } from "../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /api/v1/parking-slot:
 *  post:
 *   tags: ["parking slot"]
 *   summary: add parking slot api
 *   description: api used to add parking slot
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The user to add parking slot.
 *        schema:
 *         type: object
 *         required:
 *          - parking slot add
 *         properties:
 *           slot:
 *             type: number
 *             required:
 *   responses:
 *    '200':
 *    description: success
 */
const parkingSlotSchema = Joi.object({
  slot: Joi.number().required().label("Parking Slot"),
});

app.post(
  "/parking-slot",
  validator.body(parkingSlotSchema, {
    joi: { convert: true, allowUnknown: false },
  }),
  checkToken,
  add
);

export default app;
