import { Prisma } from "@prisma/client";

export const listarAlunos = async () => {
  return Prisma.aluno.findMany({
    include: { curso: true },
  });
};

export const buscarAlunoPorId = async (id: number) => {
  return Prisma.aluno.findUnique({
    where: { id },
    include: { curso: true },
  });
};

export const criarAluno = async (data: {
  nome: string;
  matricula: string;
  email: string;
  curso_id: number;
}) => {
  
  const curso = await Prisma.curso.findUnique({ // Verifica se o curso existe
    where: { id: data.curso_id },
  });
  if (!curso) {
    throw new Error("Curso não encontrado.");
  }

  return Prisma.aluno.create({
    data,
  });
};

export const atualizarAluno = async (
  id: number,
  data: {
    nome?: string;
    matricula?: string;
    email?: string;
    curso_id?: number;
  }
) => {
  const aluno = await Prisma.aluno.findUnique({ where: { id } });
  if (!aluno) {
    throw new Error("Aluno não encontrado.");
  }

  return Prisma.aluno.update({
    where: { id },
    data,
  });
};

export const deletarAluno = async (id: number) => {
  const aluno = await Prisma.aluno.findUnique({ where: { id } });
  if (!aluno) {
    throw new Error("Aluno não encontrado.");
  }

  await Prisma.aluno.delete({ where: { id } });
  return { message: "Aluno removido com sucesso." };
};
