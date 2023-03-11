import lemmatizer from 'node-lemmatizer'


const search = async (req,res) => {
    try{
        let tags = req.body.tags
        const tagsArray = tags.split(',').map(tag => tag.slice(1))
        return res.status(200).json({tags:tagsArray});
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
  }

  export { search };
