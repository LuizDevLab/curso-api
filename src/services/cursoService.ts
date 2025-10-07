import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllCursos() {
  return await prisma.curso.findMany({
    include: { alunos: true, disciplinas: true },
  });
}

export async function getCursoBydId(id: number) {
  return await prisma.curso.findUnique({
    where: { id },
    include: { alunos: true, disciplinas: true },
  });
}

export async function createCurso(data: any) {
  return await prisma.curso.create({ data })
}

export async function updateCurso(id: number, data: any) {
  return await prisma.curso.update({ where: { id }, data });
}

export async function deleteCurso(id: number) {
  return await prisma.curso.delete({ where: { id } });
}
