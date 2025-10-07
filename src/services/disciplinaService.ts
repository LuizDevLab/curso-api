import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllDisciplinas() {
  return await prisma.disciplina.findMany({ include: { curso: true, professor: true } });
}

export async function getDisciplinaById(id: number) {
  return await prisma.disciplina.findUnique({ where: { id }, include: { curso: true, professor: true } });
}

export async function createDisciplina(data: any) {
  return await prisma.disciplina.create({ data });
}

export async function updateDisciplina(id: number, data: any) {
  return await prisma.disciplina.update({ where: { id }, data });
}

export async function deleteDisciplina(id: number) {
  return await prisma.disciplina.delete({ where: { id } });
}
