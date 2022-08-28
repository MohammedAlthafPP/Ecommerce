const Product = require('../models/productModels');
const ErrorHander = require('../utils/errorhandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require('../utils/apifeatures');




//Create product
exports.createProduct = catchAsyncErrors( async (req,res,next)=>{
        
        req.body.seller = req.user.id;
        const product = await Product.create(req.body);
       
        res.status(201).json({
                success:true,
                product
        })
});

//Get All Products
exports.getAllproducts = catchAsyncErrors( async (req,res,next)=>{

        
        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();
        const apifeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        // .pagination(resultPerPage);
        // const products = await apifeatures.query;
//======================================================
        let products = await apifeatures.query;
        let filteredProductsCount = products.length;
        apifeatures.pagination(resultPerPage)
        products = await apifeatures.query.clone();
        res.status(200).json({
                success:true,
                products,
                productsCount,
                resultPerPage,
                filteredProductsCount
                
        })
});

//Get Product Details
exports.getProductDetails =catchAsyncErrors( async (req,res,next)=>{
        
        const product = await Product.findById(req.params.id);

        if(!product){
                return next(new ErrorHander("Product not found",404))
        }

        res.status(200).json({
                success:true,
                product
        })
});

//Update Product --Admin
exports.updateProduct = catchAsyncErrors( async (req,res,next)=>{

        let product = await Product.findById(req.params.id);

        if(!product){
                return next(new ErrorHander("Product not found",404))
        }

        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
                new:true,
                runValidators:true,
                useFindAndModify:false
        });

        res.status(200).json({
                success:true,
                product,
                message:"Product Updated Successfully"
        })
});

//Delete Products ---Admin
exports.deleteProduct = catchAsyncErrors( async(req,res,next)=>{

        const product = await Product.findById(req.params.id);
        
        if(!product){
                return next(new ErrorHander("Product not found",404))
        }

        await product.remove();

        res.status(200).json({
                success:true,
                message: "Product Deleted Successfully"
        })
});


//Create New Review Or Update Review
exports.createPruductReview = catchAsyncErrors( async(req,res,next)=>{
       
        const {rating,comment,productId} = req.body
        const review = {
                user:req.user._id,
                name: req.user.name,
                rating: Number(rating),
                comment,
        };

        
        const product = await Product.findById(productId);
        const isReviewed = product.reviews.find((rev ) => rev.user.toString() === req.user._id.toString())

        if(isReviewed){
                product.reviews.forEach((rev) => {
                        if(rev.user.toString() === req.user._id.toString()) 
                                (rev.rating = rating),
                                (rev.comment = comment)       
                })

        } else {
                product.reviews.push(review);
                product.numOfReviews = product.reviews.length
        }

        let avg = 0;
       product.reviews.forEach((rev) =>{
                avg += rev.rating;
                return avg
        }) 
        product.ratings = avg /product.reviews.length
       
        await product.save({validateBeforeSave:false});

        res.status(200).json({
                success : true,
        })

});


// GET ALL Reviews of a product
exports.getPruductReviews = catchAsyncErrors( async(req,res,next)=>{
        const product = await Product.findById(req.query.id);

        if(!product){
                return next(new ErrorHander("Product Reviews not found",404));
        }

        res.status(200).json({
                success : true,
                reviews : product.reviews,
        })

});


//Delete Review 
exports.deletePruductReview = catchAsyncErrors( async(req,res,next)=>{
        const product = await Product.findById(req.query.productId);

        if(!product){
                return next(new ErrorHander("Product Reviews not found",404));
        }

        const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

        let avg = 0;
        reviews.forEach((rev) =>{
                avg += rev.rating;
                return avg
        }) 
        const ratings = avg / reviews.length;

        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(
                req.query.productId,
        {
                reviews,
                ratings,
                numOfReviews,
        },{
                new:true,
                runValidators: true,
                useFindAndModify: false,
        })

        res.status(200).json({
                success : true,
                
        })

})




