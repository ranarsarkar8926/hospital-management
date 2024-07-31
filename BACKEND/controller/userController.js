import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import {User} from '../models/userSchema.js';
import {generateToken} from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

export const patientRegister = catchAsyncErrors(async (req,res,next)=>{
    const{firstName,lastName,email,phone,password,gender,dob,aadhaar,role}=req.body;
    if(!firstName|| !lastName|| !email|| !phone|| !password|| !gender|| !dob|| !aadhaar|| !role){
        return next(new ErrorHandler("Fill the full form",400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already registered",400));
    }
    user = await User.create({firstName,lastName,email,phone,password,gender,dob,aadhaar,role});
    generateToken(user,"User registered",200,res);
    // res.status(200).json({
    //     success: true,
    //     message: "User registered!",
    // });
});

export const login = catchAsyncErrors(async(req,res,next)=>{
    const{email,password,confirmPassword,role} = req.body;
    if(!email|| !password|| !confirmPassword|| !role){
        return next(new ErrorHandler("Provide all details",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords do not match",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found",400));
    }

    generateToken(user,"User logged in successfully",200,res);

    // res.status(200).json({
    //     success: true,
    //     message: "User logged in successfully",
    // });
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const{firstName,lastName,email,phone,password,gender,dob,aadhaar}=req.body;
    if(!firstName|| !lastName|| !email|| !phone|| !password|| !gender|| !dob|| !aadhaar){
        return next(new ErrorHandler("Fill the full form",400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists`));
    }

    const admin = await User.create({firstName,lastName,email,phone,password,gender,dob,aadhaar,role:"Admin",});
    res.status(200).json({
        success: true,
        message: "New admin registered",
    });
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success:true,
        doctors
    });
});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken",null,{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "Admin logout successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken",null,{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "Patient logout successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      aadhaar,
      dob,
      gender,
      password,
      doctorDepartment,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !aadhaar ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment ||
      !docAvatar
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler("Doctor With This Email Already Exists!", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      aadhaar,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  });