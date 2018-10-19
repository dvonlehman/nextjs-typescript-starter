import * as Router from "nextjs-dynamic-routes";

const router = new Router();

router.add({ name: "home", pattern: "/" });
router.add({ name: "laureate", pattern: "/laureate/:id" });
router.add({ name: "prizes", pattern: "/prizes/:year" });

export default router;
export const Link = router.Link;
