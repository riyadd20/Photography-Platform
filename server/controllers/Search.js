import User from '../models/User.js'


const search = async (req,res) => {
    try{
        const tags = req.body.tags
        const userId = req.body.id
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
            if(!present){
                user.search.push({tag: inputTag, count:1})
            }
        })
        user.save()
        

        
        return res.status(200).json({Done:"Done"});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }

  export { search };
