import { Router } from "express";
import { listReviews, createReview, deleteReview } from "../controllers/reviewsController.js";

const router = Router();

router.get("/films/:id", listReviews);
router.post("/films/:id", createReview);
router.delete("/:id", deleteReview);

export default router;
