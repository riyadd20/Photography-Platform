import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    getUserSavedPosts,
    likePost,
    savePost,

} from '../controllers/posts.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.get('/:userId/saved-posts', verifyToken, getUserSavedPosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);
router.patch('/:id/save', verifyToken, savePost);

export default router;