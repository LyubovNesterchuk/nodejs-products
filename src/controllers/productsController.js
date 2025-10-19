import createHttpError from "http-errors";
import { Product } from "../models/product.js";


export const getProducts = async(req,res) => {
const products = await Product.find({
  userId: req.user._id,
});

res.status(200).json(products);
};


export const getProductById = async(req, res, next) => {
  const { productId } = req.params;
  const product =await Product.findById({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    return next(createHttpError(404, "Product not found"));
  }

  res.status(200).json(product);
};


export const createProduct = async(req, res, next) => {
  const product = await Product.create({
    ...req.body,
    userId: req.user._id,
});

  res.status(201).json(product);
};


export const updateProduct = async(req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      userId: req.user._id,
    },
    req.body,
    {new: true},
  );

  if (!product) {
    return next(createHttpError(404, "Product not found"));
  }

  res.status(200).json(product);
};

export const deleteProduct = async(req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({
    _id: productId,
    userId: req.user._id,
  });

  if(!product){
    return next(createHttpError(404, "Product not found"));
  };

  res.status(200).json(product);
};
