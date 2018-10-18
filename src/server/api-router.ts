import * as express from "express";
import repository from "server/repository";

const router = express.Router();

router.get("/laureate/:id", async (req, res, next) => {
  try {
    res.json(await repository.getLaureateById(req.params.id));
  } catch (err) {
    return next(err);
  }
});

router.get("/prizes/:year", async (req, res, next) => {
  try {
    res.json(await repository.getPrizesByYear(req.params.year));
  } catch (err) {
    return next(err);
  }
});

router.get("/years", async ({}, res, next) => {
  try {
    res.json(await repository.getYears());
  } catch (err) {
    next(err);
  }
});

export default router;
