import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getUserFollowers = async (req, res) => {
    try {
        const { followers } = await User.findById(req.params.id).populate('followers');

        // Format Friends
        const formattedFollowers = followers.map(
            ({ _id, firstName, lastName, location, picturePath }) => {
                return { _id, firstName, lastName, location, picturePath };
            }
        );

        return res.status(200).json(formattedFollowers);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getUserFollowing = async (req, res) => {
    try {
        const { following } = await User.findById(req.params.id).populate('following');

        // Format Friends
        const formattedFollowings = following.map(
            ({ _id, firstName, lastName, location, picturePath }) => {
                return { _id, firstName, lastName, location, picturePath };
            }
        );

        return res.status(200).json(formattedFollowings);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

/* UPDATE */
export const addRemoveFollowing = async (req, res) => {
    try {
        const { id: userId, followingId } = req.params;
        const user = await User.findById(userId);
        const friend = await User.findById(followingId);

        // Check Following List
        if(user.following.includes(followingId)) {       // Remove Following
            user.following = user.following.filter(id => id.toString() !== followingId);
            friend.followers = friend.followers.filter(id => id.toString() !== userId);
        } else {                                    // Add Following
            user.following.push(followingId);
            friend.followers.push(userId);
        }

        // Update the user and following document
        await user.save();
        await friend.save();

        // Send back the following list as a response
        const { following } = await user.populate('following');

        const formattedFollowings = following.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        return res.status(200).json({ follow: formattedFollowings.length ? true : false });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}