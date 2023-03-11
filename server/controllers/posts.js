import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, title, description, hashtags, specs, picturePath, city, country, price, category } = req.body;
        console.log(req.body)
        
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            userPicturePath: user.picturePath,
            title,
            description,
            hashtags,
            specs,
            picturePath,
            location: { city, country },
            price,
            share: `http://loclahost:3001/assets/${picturePath}`,
            likes: {},
            saved: {},
            category: category
        });

        let newRoomId
        const data = await newPost.save();
        newRoomId = data._id
        user.created.push(newRoomId)
        user.save();
        return res.status(201).json({ success: 'Post added successfully!' });

        // // Get All Posts
        // const post = await Post.find();
        // return res.status(201).json(post);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().populate('userId');

        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }, null, { sort: { 'createdAt': -1 } });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getUserSavedPosts = async (req, res) => {
    try {
        const { saved } = await User.findById(req.params.userId).populate('saved').sort({ 'createdAt': -1 });

        return res.status(200).json(saved);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        console.log(req.params, req.body)
        const { id } = req.params;
        const { userId } = req.body;

        // Get the Post
        const post = await Post.findById(id);
        // Check if the User has liked or not
        const isLiked = post.likes.get(userId);

        // Updating Likes on Post
        if(isLiked) {
            post.likes.delete(userId);
            await Post.findByIdAndUpdate(id, { impressions: post.impressions - 1 });
        } else {
            post.likes.set(userId, true);
            await Post.findByIdAndUpdate(id, { impressions: post.impressions + 1 });
        }

        // Save Updated Post
        await Post.findByIdAndUpdate(id, 
            { likes: post.likes },
            { new: true }       // this will return the updated document
            // By default it is false, which returns the non-updated document
        );

        return res.status(200).json({ success: 'Post successfully liked!' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const savePost = async (req, res) => {
    try {
        const { id:postId } = req.params;
        const { userId } = req.body;

        // Get the Post
        const user = await User.findById(userId);
        // Get the Post
        const post = await Post.findById(postId);
        // Check if the User has liked or not
        const isSaved = post.saved.get(userId);

        // Updating Likes on Post
        if(isSaved) {
            post.saved.delete(userId);
            await Post.findByIdAndUpdate(postId, { impressions: post.impressions - 5 });

            user.saved = user.saved.filter(id => id.toString() !== postId);
            await user.save();
        } else {
            post.saved.set(userId, true);
            await Post.findByIdAndUpdate(postId, { impressions: post.impressions + 5 });
            
            user.saved.push(postId);
            await user.save();
        }

        // Save Updated Post
        await Post.findByIdAndUpdate(postId, 
            { saved: post.saved },
            { new: true }       // this will return the updated document
            // By default it is false, which returns the non-updated document
        );

        return res.status(200).json({ saved: !isSaved });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const sharePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        post.impressions += 10;
        await post.save();

        return res.status(200).json({ success: 'Post successfully shared!' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}