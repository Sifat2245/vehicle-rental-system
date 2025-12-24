import { Request, Response } from "express";
import { authServices } from "./auth.service";

const userSignup = async (req: Request, res: Response) => {
  try {
    const {password} = req.body;

    if(!password || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long"
        })
    }

    const result = await authServices.userSignup(req.body);

    const userResponse = {
      id: result?.rows[0]?.id,
      name: result?.rows[0]?.name,
      email: result?.rows[0]?.email,
      phone: result?.rows[0]?.phone,
      role: result?.rows[0]?.role,
    };
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: userResponse,
    });
  } catch (err: any) {
    return res.status(406).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

const userSignin = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
      const result = await authServices.userSignin(email, password);

      const response = {
        token: result?.token,
        user: {
          id: result?.user?.id,
          name: result?.user?.name,
          email: result?.user?.email,
          phone: result?.user?.phone,
          role: result?.user?.role,
        },
      }
      if(result){
        return res.status(200).json({
          success: true,
          message: "Login successful",
          data: response
        })
      }
    }
    catch(err: any) {
      return res.status(406).json({
        success: false,
        message: err.message || "Something went wrong",
      })
    }
};

export const authController = {
  userSignup,
  userSignin,
};
