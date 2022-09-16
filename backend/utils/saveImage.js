



//=========================== MULTER ===============
//define multer storege
const Storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      cb(null, "./public/images/User-profile/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      //req.session.imgmessage = "Only JPEG OR PNG images";
    }
  };
  
  const upload = multer({
    storage: Storage,
    limits: {
      fieldSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
  });