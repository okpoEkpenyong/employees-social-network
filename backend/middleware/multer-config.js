const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const Datauri  = require('datauri');
const path = require('path');
const dUri = new Datauri();

//const uploader = require('./cloudinaryConfig').uploader;
//const cloudinaryConfig = require('./cloudinaryConfig').cloudinaryConfig;
//const dataUri = require('./middlewares/multerUploads').dataUri;
//const multerUploads = require('./middlewares/multerUploads').multerUploads;



const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
module.exports = { multerUploads, dataUri };
//module.exports = multer({storage: storage}).single('image');