import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { parkSlot } from "../../controllers/parking-slot";
import { checkToken } from "../../utilities/universal";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/park-slot:
 *  put:
 *   tags: ["parking slot"]
 *   summary: update park slot info and status api
 *   description: api used to update park slot info and status
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: park slot
 *        description: update park slot status and info, and status should be 1 => start, 2 => hold, 3=> close, 4=> delete
 *        schema:
 *         type: object
 *         required:
 *          - update park slot info
 *         properties:
 *           id:
 *             type: string
 *             required: true
 *   responses:
 *    '200':
 *    description: success
 */
const parkingSlotSchema = Joi.object({
  id: Joi.string().trim().required().label("Parking Slot Id"),
});

app.put(
  "/park-slot",
  validator.body(parkingSlotSchema, {
    joi: { convert: true, allowUnknown: false },
  }),
  checkToken,
  parkSlot
);

export default app;
