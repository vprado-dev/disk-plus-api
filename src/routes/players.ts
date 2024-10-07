import { Router } from "express";
import { auth } from "../middlewares/auth";
import { body, params } from "../utils/requestsValidations";
import {
  playersGetOneParams,
  playersPatchOneBody,
  playersPostOneBody,
} from "../validations/players";
import PlayerController from "../controllers/PlayerController";

const router = Router();

/**
 * POST /players
 * @tag Players
 * @security BearerAuth
 * @bodyContent {PlayerPostBody} application/json
 * @response 201
 * @responseContent {Player} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post(
  "/players",
  auth,
  body(playersPostOneBody),
  PlayerController.playerPostOne,
);

/**
 * GET /players
 * @tag Players
 * @response 200
 * @responseContent {Player[]} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/players", PlayerController.playerGetMany);

/**
 * GET /players/{playerId}
 * @tag Players
 * @pathParam {string} playerId
 * @response 200
 * @responseContent {Player} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get(
  "/players/:playerId",
  params(playersGetOneParams),
  PlayerController.playerGetOne,
);

/**
 * PATCH /players/{playerId}
 * @tag Players
 * @security BearerAuth
 * @pathParam {integer} playerId
 * @bodyContent {PlayersPatchOneBody} application/json
 * @response 200
 * @responseContent {Player} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.patch(
  "/players/:playerId",
  auth,
  params(playersGetOneParams),
  body(playersPatchOneBody),
  PlayerController.playerPatchOne,
);

/**
 * DELETE /players/{playerId}
 * @tag Players
 * @security BearerAuth
 * @pathParam {integer} playerId
 * @response 204
 * @response default
 * @responseContent {Error} default.application/json
 */
router.delete(
  "/players/:playerId",
  auth,
  params(playersGetOneParams),
  PlayerController.playerDeleteOne,
);

export default router;
