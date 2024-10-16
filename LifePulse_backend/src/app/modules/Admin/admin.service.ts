import { Prisma } from "@prisma/client";
import { searchingFields } from "./admin.constant";
import { pagination } from "../../../helpers/pagination";
import prisma from "../../../shared/prismaClient";

const getAllAdminFromDB = async (params: any, options: any) => {
  const { searchTerm, ...otherSearch } = params;
  const { page, limit, skip } = pagination.paginationCalculation(options);

  const andConditions: Prisma.AdminWhereInput[] = [];

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
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: "desc" },
  });

  const totalItems = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      totalItems,
    },
    data: result,
  };
};

export const adminService = {
  getAllAdminFromDB,
};
