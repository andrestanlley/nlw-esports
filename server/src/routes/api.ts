import { Router } from "express";
import createAd from "../services/createAd";
import getAds from "../services/getAds";
import getDiscord from "../services/getDiscord";
import getGames from "../services/getGames";

const router = Router();

export default router
  .get("/games", getGames)
  .get("/games/:id/ads", getAds)
  .get("/ads/:id/discord", getDiscord)
  .post("/games/:id/ads", createAd);
