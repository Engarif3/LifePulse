import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pickedQuery from "../../../shared/pickedQuery";
import { adminQueryFields, paginationFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pickedQuery(req.query, adminQueryFields);
    const options = pickedQuery(req.query, paginationFields);

    const result = await adminService.getAllAdminFromDB(filters, options);
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
