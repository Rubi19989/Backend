var express = require("express");
const {
  getAllBrands,
  getOneBrand,
  postCreateBrand,
  putEditBrand,
  deleteBrand,
} = require("../controllers/brands.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { errorAsyncHandler } = require("../middlewares/errorHandler.middleware");
var router = express.Router();
const validator = require("../middlewares/validaterHandler.middleware");

router.get(
  "/",
  authMiddleware(["Administrador"]),
  errorAsyncHandler(getAllBrands)
);

router.get(
  "/:id/single",
  authMiddleware(["Administrador"]),
  errorAsyncHandler(getOneBrand)
);

router.post(
  "/create",
  authMiddleware(["Administrador"]),
  validator("brandSchema"),
  errorAsyncHandler(postCreateBrand)
);

router.put(
  "/:id/update",
  authMiddleware(["Administrador"]),
  validator("brandUpdateSchema"),
  errorAsyncHandler(putEditBrand)
);

router.delete(
  "/:id/delete",
  authMiddleware(["Administrador"]),
  errorAsyncHandler(deleteBrand)
);

module.exports = router;
