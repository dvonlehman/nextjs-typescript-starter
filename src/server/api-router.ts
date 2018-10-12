import * as express from "express";
import api from "./api";

const router = express.Router();

router.get("/stories", async (req, res, next) => {
  let story;
  try {
    story = await api.getStoryByShortId(req.query.short_id);
  } catch (err) {
    return next(err);
  }

  res.json(story);
});

router.get("/stories/:storyId", async (req, res, next) => {
  let story;
  try {
    story = await api.getStoryById(req.params.storyId);
  } catch (err) {
    return next(err);
  }
  res.json(story);
});

export default router;
