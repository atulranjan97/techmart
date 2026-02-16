// Core modules
import path from "path";
import express from "express";
// External modules
import multer from "multer";

const router = express.Router();

// Multer configuration
// Describe where you want to store your image (which storage you wanna use, Amazon bucket or disk storage)
// we want disk storage because we want it to just be on the disk on the server
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // this function will describe where we want to save this,
    cb(null, "uploads/");
    // first argument is for error, which we don't have an error so we're gonna put null for that, second argument is where we actually want out uploads to go, which is going to be in a folder called `uploads` (we create it in our root directory)
    // in the root directory, create a folder called upload, don't put it in the backend or frontend folder,
    // any images that gets uploaded through our app will go in this folder
  },
  // we need to describe how we want our file names to be formatted
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// we don't want people to be able to upload like pdfs or exe file or anything like that
function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/; // this is regular expression of what we want to allow (here we allow only jpg, jpeg, png)
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase(),
  );
  const mimetype = fileTypes.test(file.mimetype);

  // Check if the extname and the mimetype is valid
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!"); // return error saying images only (first argument is for error)
  }
  // test is just to see if it's gonna match our regular expression, if it does we gonna return the callback with true as the second argument else we gonna return the callback with an error coz remember, the first argument is your error
}

// to do the actual upload
const upload = multer({
  storage,
  checkFileType,
});

// create the actual route
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded",
    image: `/${req.file.path}`,
  });
});
// `upload.single('image')` Multer ko bata raha hai ki form mein ek file field hai jiska naam `image` hai.
// Multer automatically `multipart/form-data` ko parse karega
// Text field(eg. username="atul") agar exist karta hai to use `req.body` mein daal dega
// File ko `uploads/` folder mein save karega aur uska info `req.file` mein daal dega

// upload.single('image') is the middleware we're using and we're using single because we only wanna allow single file. You can make it so that you can upload multiple files as an array, it's a little more advance but you can do that, but in this case we're only using a single image and we're calling it `image` but you can use anything here, this is the fieldname. so `file.fieldname` is going to be 'image'
// actual upload is handled by middleware( ie. upload.single('image') )


export default router;
