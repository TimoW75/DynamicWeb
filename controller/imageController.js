const fs = require('fs');


const getImages = async (req, res) => {
    fs.readdir('dist/assets/img', (err, files) => { 
        if (err) 
          console.log(err); 
        else { 
            res.json(files);
        } 
    }) 
}

const postImage = async (req, res) => {
    return res.json({succes: true})
}

const deleteImage = async (req, res) => {
    let imgName = req.body.name
    fs.unlink(`dist/assets/img/${imgName}`, (err) => { 
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.json({succes: true})
        }
    })
}

// uploading image  using express-fileupload  


module.exports = {
    getImages: getImages,
    postImage: postImage,
    deleteImage: deleteImage
};
