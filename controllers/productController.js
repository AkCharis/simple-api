const APIFeatures = require("../utils/apifeautures.js");

const catchAsync = require("../utils/catchAsync.js");
const Product = require("../models/productModel.js");
const AppError = require("../utils/appError.js");

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.aliasTopProducts = (req, res, next) => {
//   req.query.sort = "-ratingsAverage,price";
//   req.query.limit = "5";
//   req.query.fields = "name,price,ratingsAverage,summary,difficulty";
//   next();
// };

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // const query = Tour.find().where("duration").equals(5).where("difficulty").equals(easy);
  features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // const id = req.params.id * 1;

  const product = await Product.findById(req.params.id);
  // Tour.findOne({_id: req.params.id})

  // const tour = tours.find((el) => el.id === id);

  if (!product) {
    return new AppError("No tour found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour: newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return new AppError("No product found with that ID", 404);
  }

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return new AppError("No product found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: product,
  });
});

