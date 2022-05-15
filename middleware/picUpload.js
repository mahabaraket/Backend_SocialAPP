const multer = require('multer')

module.exports.uploadPic = () => {
    const pictureStorage = multer.diskStorage({
        destination : "../assets/images/pictures",
        filename : (req, file, cb) => req.params.carId,
    });

    const pictureFileFilter = (req, file, cb) =>{
        if(!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)){
            return cb(new Error('You can only upload image files!'),false);
        }
    }

    return multer({pictureFileFilter, pictureStorage});
}
;