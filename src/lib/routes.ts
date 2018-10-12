import * as Router from "nextjs-dynamic-routes";

const router = new Router();

router.add({ name: "home", pattern: "/" });
router.add({ name: "story", pattern: "/s/:storyId" });

export default router;
export const Link = router.Link;
