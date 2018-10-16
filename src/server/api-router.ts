import { NextFunction, Request, Response, Router } from "express";
import api from "./api";

const router = Router();

router.get(
  "/stories",
  async (req: Request, res: Response, next: NextFunction) => {
    let story;
    try {
      story = await api.getStoryByShortId(req.query.short_id);
    } catch (err) {
      return next(err);
    }

    res.json(story);
  }
);

router.get(
  "/stories/:storyId",
  async (req: Request, res: Response, next: NextFunction) => {
    let story;
    try {
      story = await api.getStoryById(req.params.storyId);
    } catch (err) {
      return next(err);
    }
    res.json(story);
  }
);

export default router;
