import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  const result = await adminService.getAllAdminFromDB();
  res.status(200).json({
    success: true,
    message: "Admin info fetched",
    data: result,
  });
};

export const adminController = {
  getAllAdmin,
};
