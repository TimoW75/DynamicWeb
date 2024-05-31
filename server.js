const express = require('express')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 8000
require('dotenv').config()
const bodyParser = require('body-parser')
const multer = require("multer");
/*********************************************/
/*Server enzo*/
/*********************************************/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/assets/img/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


app.use(bodyParser.json())


app.use(express.static(
  path.resolve(__dirname, 'dist'),
  {maxAge: '1y', etag: false}
))


// editor 
const getEditor = require('./controller/jsonEditor');
app.post('/api/addNewColumn', async (req, res) => {
  getEditor.addNewColumn(req, res);
});
app.post('/api/addNewRow', async (req, res) => {
  getEditor.addNewRow(req, res);
});


// image editor 
const imageEditor = require('./controller/imageController');
app.get('/api/images', async (req, res) => {
  imageEditor.getImages(req, res);
});

app.post('/api/images/add', upload.array("files", 2), async (req, res) => {
  imageEditor.postImage(req, res);
  console.log('adding image..')
});

app.post('/api/images/delete', async (req, res) => {
  imageEditor.deleteImage(req, res);
});




app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
});

app.listen(PORT, () => {
	console.log(`App listening on ${PORT}`);
});