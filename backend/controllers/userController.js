const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const { sendOtp } = require("../utils/twilioOTP");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { findOne } = require("../models/userModel");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  console.log(req.file, "req.file");
  const { name, email, phone, password } = req.body;

  const isUser = await User.findOne({ email });
  if (isUser) {
    return next(new ErrorHander("User already exists", 403));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  const OtpRes = await sendOtp(user.phone);
  sendToken(user, 201, res);
});

// Verify OTP
exports.verifyRegisterOtp = catchAsyncError(async (req, res, next) => {
  try {
    const otp = req.body.otp;
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHander("Invalid User", 401));
    }

    const responce = await client.verify
      .services(serviceSid)
      .verificationChecks.create({
        to: `+91${user.phone}`,
        code: otp,
      })
      .then(async (response) => {
        if (response.status === "approved" && response.valid == true) {
          await User.findByIdAndUpdate(req.user.id, {
            $set: { "verified.phone": true },
          });

          res.status(200).json({
            success: true,
            message: `Your ${user.phone} verified successfully`,
          });
        } else {
          res.status(404).json({
            success: false,
            message: `Invalid OTP!!!!`,
          });
        }
      })
      .catch((err) => {
        console.log(err, "=== error");
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ verified: false, msg: "Something went wrong ...." });
  }
});

// Resend OTP
exports.resendOtp = catchAsyncError(async (req, res, next) => {
  // req.params.id
  const user = await User.findById(req.params.id, { phone: 1 });
  console.log(user);
  if (!user) {
    return next(new ErrorHander("Invalid User", 403));
  }
  let str = `${user.phone}` + "";
  var trailingCharsIntactCount = 4;

  str =
    new Array(str.length - trailingCharsIntactCount + 1).join("x") +
    str.slice(-trailingCharsIntactCount);

  const sendotpResponse = sendOtp(user.phone);

  res.status(200).json({
    success: true,
    message: `OTP Send to Your Phone Number ${str}`,
    user,
  });
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  //Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/user/password/reset/${resetToken}`;

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/user/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `${process.env.MY_SITE} Password Recovery`,
      message,
      resetPasswordUrl,
      hbs: "index",
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetpasswordToken = undefined;
    user.resetPaswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

//Reset Password
exports.ressetPassword = catchAsyncError(async (req, res, next) => {
  //Creating token hash
  const resetpasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetpasswordToken,
    resetPaswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset password Token is Invalid or has been expried",
        404
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match", 404));
  }

  user.password = req.body.password;
  user.resetpasswordToken = undefined;
  user.resetPaswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHander("Old Password is Incorrect", 400));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match", 400));
  }

  if (req.body.oldPassword === req.body.newPassword) {
    return next(
      new ErrorHander("Old Password and New Password cannot be same", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const isExist = await User.findById(req.user.id);
  if (!isExist) {
    return next(new ErrorHander(`User not found`, 400));
  }

  const oldPhone = isExist.phone;
  const newPhone = parseInt(req.body.phone);
  if (oldPhone !== newPhone) {
    await User.findByIdAndUpdate(req.user.id, {
      $set: { "verified.phone": false },
    });
  }

  //console.log(req.body.avatar,"==========req.body.avatar[0].public_id");
  if (req.body.avatar !== "undefined" && req.body.avatar) {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar[0].public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Updated Successfully",
  });
});

//Get all Users ---Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find().sort({ joinedOn: -1 });
  const usersCount = await User.find().count();

  if (!users) {
    return next(new ErrorHander(`NO Records found`, 400));
  }

  res.status(200).json({
    success: true,
    users,
    usersCount,
  });
});

//Get Single User Details ---Admin
exports.getSingleUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role  ---Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  console.log(req.body, "======== Update User Role");
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: `Role Successfully Updated as a ${req.body.role}`,
  });
});

//Delete User ---Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  //Remove from Cloudinary
  const imageId = user.avatar[0].public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: `User Deleted Successfully`,
  });
});

//Block  USER
//Unblock USER
