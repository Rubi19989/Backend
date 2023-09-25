const { Product, Brands, Categories, Users } = require("../models");

const allProducts = async (host, page = 1) => {
  const offset = (10*page ) - 10;
  const limit = 10;
  const currentPage = (offset * 0.1) + 1;

  const products = await Product.findAndCountAll({
    limit: limit,
    offset: offset,
    include: [Brands, Categories, Users],
  });

  const { rows, count } = products;
  const totalPage = Math.ceil(count / limit);

  const paginate = {
    totalPage: totalPage,
    currentPage: currentPage,
    totalItems: limit,
    next: currentPage < totalPage ? `${host}/?page=${currentPage+1}` : null,
    last: currentPage > 0 ? `${host}/?page=${currentPage-1}` : null,
    data: rows,
  };

  return paginate;
};

const oneProduct = async (id) => {
  const product = await Product.findByPk(id);
  return product;
};

const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

const updateProduct = async (body, id) => {
  const product = await Product.update(body, {
    where: {
      id: id,
    },
  });
  return product;
};

const deleteProductServices = async (id) => {
  const product = await Product.destroy({
    where: {
      id: id,
    },
  });
  return product;
};

module.exports = {
  allProducts,
  oneProduct,
  createProduct,
  updateProduct,
  deleteProductServices,
};
