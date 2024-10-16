import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any) => {
  const { searchTerm, ...otherSearch } = params;
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

  if (Object.keys(otherSearch).length > 0) {
    andConditions.push({
      AND: Object.keys(otherSearch).map((field) => ({
        [field]: {
          equals: otherSearch[field],
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
