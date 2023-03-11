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
        const topFive = user.search.reverse().slice(0,5).map( item => item.tag)
        const posts = await Post.find({hashtags: { $in: topFive }})
        return res.status(200).json({search:topFive,posts:posts});
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }

  export { search, recommendations };
