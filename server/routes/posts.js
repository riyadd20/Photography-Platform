import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  getUserSavedPosts,
  likePost,
  savePost,
  sharePost,
  getPost,
} from "../controllers/posts.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* READ */
// router.get('/', verifyToken, getFeedPosts);
router.get("/", getFeedPosts);

router.get("/:id", getPost);

// router.get('/:userId/posts', verifyToken, getUserPosts);
router.get("/:userId/posts", getUserPosts);

// router.get('/:userId/saved-posts', verifyToken, getUserSavedPosts);
router.get("/:userId/saved-posts", getUserSavedPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
// router.patch('/:id/like', likePost);

// router.patch('/:id/save', verifyToken, savePost);
router.patch("/:id/save", savePost);

router.patch("/:id/share", verifyToken, sharePost);
// router.patch('/:id/share', sharePost);

export default router;
