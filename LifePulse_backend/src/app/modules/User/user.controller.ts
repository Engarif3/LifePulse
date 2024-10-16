import { Request, response, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userService.createAdminToDB();
  res.send(result);
};

export const userController = {
  createAdmin,
};
