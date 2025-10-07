import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getAllAlunos() {
  return await prisma.aluno.findMany({ include: { curso: true } })
}

export async function getAlunoById(id: number) {
  return await prisma.aluno.findUnique({
    where: {id},
    include: { curso: true }
  })
}

export async function createAluno(data: any) {
  return await prisma.aluno.create({ data })
}

export async function updateAluno(id: number, data: any) {
  return await prisma.aluno.update({where: {id}, data})
}

export async function deleteAluno(id: number) {
  return await prisma.aluno.delete({ where: { id } })
}