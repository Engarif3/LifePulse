import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAllAdminFromDB = async (params: any) => {
  const andConditions: Prisma.AdminWhereInput[] = [];
  const searchingFields = ["name", "email"];

  if (params.searchTerm) {
    andConditions.push({
      OR: searchingFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const adminService = {
  getAllAdminFromDB,
};
