var express = require("express");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

const {
  getAllProducts,
  getOneProduct,
  postCreateProduct,
  deleteProduct,
  putEditProduct,
} = require("../controllers/products.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { errorAsyncHandler } = require("../middlewares/errorHandler.middleware");
var router = express.Router();
const validator = require("../middlewares/validaterHandler.middleware");

// const upload = multer({ dest: 'files/' })

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.get(
  "/",
  // authMiddleware(["Administrador"]),
  errorAsyncHandler(getAllProducts)
);

router.get(
  "/:id/single",
  authMiddleware(["Administrador"]),
  errorAsyncHandler(getOneProduct)
);

router.post(
  "/create",
  [upload.single("image"), validator("productSchema")],
  errorAsyncHandler(postCreateProduct)
);

router.put(
  "/:id/update",
  authMiddleware(["Administrador"]),
  validator("productUpdateSchema"),
  errorAsyncHandler(putEditProduct)
);

router.delete(
  "/:id/delete",
  authMiddleware(["Administrador"]),
  errorAsyncHandler(deleteProduct)
);

module.exports = router;
