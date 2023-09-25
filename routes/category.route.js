var express = require("express");
const {
  getAllCategories,
  getOneCategory,
  postCreateCategory,
  putEditCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { errorAsyncHandler } = require("../middlewares/errorHandler.middleware");
var router = express.Router();
const validator = require("../middlewares/validaterHandler.middleware");

router.get(
  "/",
  authMiddleware(["Administrador", "Moderador"]),
  errorAsyncHandler(getAllCategories)
);

router.get(
  "/:id/single",
  authMiddleware(["Administrador", "Moderador"]),
  errorAsyncHandler(getOneCategory)
);

router.post(
  "/create",
  authMiddleware(["Administrador", "Moderador"]),
  validator("categorySchema"),
  errorAsyncHandler(postCreateCategory)
);

router.put(
  "/:id/update",
  authMiddleware(["Administrador", "Moderador"]),
  validator("categoryUpdateSchema"),
  errorAsyncHandler(putEditCategory)
);

router.delete(
  "/:id/delete",
  authMiddleware(["Administrador", "Moderador"]),
  errorAsyncHandler(deleteCategory)
);

module.exports = router;
