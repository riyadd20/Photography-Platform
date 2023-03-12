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

        return res.status(200).json({posts:posts});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }





  const recommendations = async (req,res) => {
    try{
        const userId = req.query.id;
        // console.log(req.query)
        const user = await User.findById(userId)
        user.search.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0));
        const userTags = user.search.reverse().map( item => item.tag)
        const topFive = userTags.slice(0,5)
        const posts = await Post.find({hashtags: { $in: topFive }}).sort({impressions:-1}).populate('userId');
        
        const randomPosts = await Post.find({ hashtags: { $nin: userTags } }).sort({impressions:-1}).populate('userId')
        const totalPosts = posts.concat(randomPosts)
        return res.status(200).json({search:topFive,posts:totalPosts});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }






  const trending = async (req,res) => {
    try{
        //trending posts
        const posts = await Post.find({}).sort({impressions:-1})

        //trensing hashtags
        let topResults = []
        const users = await User.find({})
        users.map( user => {
            const results = user.search.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0)).reverse().slice(0,5)
            topResults.push(...results)
        } )

        let finalResults = []

        topResults.forEach( item => {
            let present = false
            finalResults.forEach( check => {
                if (check.tag == item.tag){
                    present = true
                    check.count = check.count + item.count
                }
            })
            !present && finalResults.push(item)
        })

        const finalTags = finalResults.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0)).reverse().map( item => item.tag)

        return res.status(200).json({trendingTags:finalTags,trendingPosts:posts});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }


  const random = async (req,res) => {
    try{
        //array randomizer helper function
        const getShuffledArr = arr => {
            const newArr = arr.slice()
            for (let i = newArr.length - 1; i > 0; i--) {
                const rand = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
            }
            return newArr
        };

        const posts = await Post.find({}).populate('userId')
        const finalRandomPosts = getShuffledArr(posts)
        return res.status(200).json({posts:finalRandomPosts});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }


  

  const categoryFilter = async (req,res) => {
    try{
        const type = req.params.type
        const posts = await Post.find({category:type}).populate('userId')
        return res.status(200).json({posts:posts});
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }





  export { search, recommendations, trending, random, categoryFilter };
