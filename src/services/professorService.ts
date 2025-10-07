import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllProfessores() {
  return await prisma.professor.findMany({ include: { disciplinas: true } });
}

export async function getProfessorById(id: number) {
  return await prisma.professor.findUnique({ where: { id }, include: { disciplinas: true } });
}

export async function createProfessor(data: any) {
  return await prisma.professor.create({ data });
}

export async function updateProfessor(id: number, data: any) {
  return await prisma.professor.update({ where: { id }, data });
}

export async function deleteProfessor(id: number) {
  return await prisma.professor.delete({ where: { id } });
}
