import { Request, Response } from "express";
import { userServices } from "./users.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Users not fetched",
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await userServices.getSingleUser(id);
    const response = {
      id: result?.rows[0]?.id,
      name: result?.rows[0]?.name,
      email: result?.rows[0]?.email,
      phone: result?.rows[0]?.phone,
      role: result?.rows[0]?.role,
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data:response
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not fetched",
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateUser(
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.role,
      Number(req.params.id)
    );
    const response = {
      id: result?.rows[0]?.id,
      name: result?.rows[0]?.name,
      email: result?.rows[0]?.email,
      phone: result?.rows[0]?.phone,
      role: result?.rows[0]?.role,
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: response
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not updated",
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(Number(req.params.id));
    if (result) {
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows[0],
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not deleted",
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const usersController = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
