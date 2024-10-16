import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pickedQuery from "../../../shared/pickedQuery";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pickedQuery(req.query, [
      "searchTerm",
      "name",
      "email",
      "contactNumber",
    ]);
    const result = await adminService.getAllAdminFromDB(filters);
    res.status(200).json({
      success: true,
      message: "Admin info fetched",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

export const adminController = {
  getAllAdmin,
};
