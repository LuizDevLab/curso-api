import { prisma } from "../database/prismaClient";

export const cursoService = {
  listar: async () => {
    return prisma.curso.findMany();
  },

  criar: async (data: any) => {
    return prisma.curso.create({ data });
  },

  atualizar: async (id: number, data: any) => {
    return prisma.curso.update({
      where: { id },
      data
    });
  },

  deletar: async (id: number) => {
    return prisma.curso.delete({
      where: { id }
    });
  }
};
