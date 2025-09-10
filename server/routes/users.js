import express from "express";
import {
    getUser,
    getUserFollowers,
    getUserFollowing,
    addRemoveFollowing,
    updateProfileViews
} from '../controllers/users.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

/* READ */
// router.get('/:id', verifyToken, getUser);
router.get('/:id', getUser);

router.get('/:id/followers', verifyToken, getUserFollowers);
// router.get('/:id/followers', getUserFollowers);

router.get('/:id/followings', verifyToken, getUserFollowing);
// router.get('/:id/followings', getUserFollowing);

/* UPDATE */
router.patch('/:id/:followingId', verifyToken, addRemoveFollowing);
// router.patch('/:id/:followingId', addRemoveFollowing);

// router.patch('/:id', verifyToken, updateProfileViews);
router.patch('/:id', updateProfileViews);

export default router;