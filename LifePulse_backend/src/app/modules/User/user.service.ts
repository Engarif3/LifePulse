import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdminToDB = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createAdmin = await transactionClient.admin.create({
      data: data.admin,
    });

    return createAdmin;
  });

  return result;
};

export const userService = {
  createAdminToDB,
};
