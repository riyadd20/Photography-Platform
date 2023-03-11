import Post from '../models/Post.js'
import User from '../models/User.js'


const search = async (req,res) => {
    try{
        const userId = req.body.id
        const tags = req.body.tags
        const tagsArray = tags.split(',').map(tag => tag.slice(1))
        const user = await User.findById(userId)
        let present = false
    
        tagsArray.forEach(inputTag => {
            user.search.forEach( item => {
                if(item.tag == inputTag){
                    item.count = item.count + 1
                    present = true
                }
            })
            !present && user.search.push({tag: inputTag, count:1})
        })
        user.save()

        const posts = await Post.find({hashtags: { $in: tagsArray }})
        console.log(posts)

        return res.status(200).json({posts:posts});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }

  const recommendations = async (req,res) => {
    try{
        const userId = req.body.id
        const user = await User.findById(userId)
        user.search.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0));
        const userTags = user.search.reverse().map( item => item.tag)
        const topFive = userTags.slice(0,5)
        const posts = await Post.find({hashtags: { $in: topFive }}).sort({impressions:-1})
        
        const randomPosts = await Post.find({ hashtags: { $nin: userTags } }).sort({impressions:-1})
        const totalPosts = posts.concat(randomPosts)
        return res.status(200).json({search:topFive,totalPosts:totalPosts});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }




  const trending = async (req,res) => {
    try{
        const posts = await Post.find({}).sort({impressions:-1})
        let topResults = []
        const users = await User.find({})
        users.map( user => {
            const results = user.search.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0)).reverse().slice(0,5)
            topResults.push(...results)
        } )

        // topResults,
        // user.search.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0));
        // const userTags = user.search.reverse().map( item => item.tag)
        // const topFive = userTags.slice(0,5)
        // const posts = await Post.find({hashtags: { $in: topFive }}).sort({impressions:-1})
        
        // const randomPosts = await Post.find({ hashtags: { $nin: userTags } }).sort({impressions:-1})
        // const totalPosts = posts.concat(randomPosts)
        return res.status(200).json({posts:topResults});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }

  export { search, recommendations, trending };
