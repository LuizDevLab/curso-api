import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { RawQueryArgs } from "@prisma/client/runtime/library";
  
export const createAluno = async (req: Request, res: Response) => {
  const { nome, matricula, email, curso_id, curso } = req.body;
  try {
    const curso = await Prisma.curso.findUnique({ where: { id: curso_id } });
    if (!curso)
      return res.status(400).json({ error: "Curso não encontrado." });

    const novoAluno = await Prisma.aluno.create({
      data: { nome, matricula, email, curso_id, curso },
    });
    return res.status(201).json(novoAluno);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export const getAlunos = async (req: Request, res: Response) => {

}

export const getAluno = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
    const aluno = await Prisma.aluno.findUnique({
      where: { id: Number(id) },
      include: { curso: true },
    });
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });
    return res.json(aluno);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar aluno." });
  }
}

export const updateAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, matricula, email, curso_id, curso } = req.body;

    try {
        const aluno = await Prisma.aluno.update({
      where: { id: Number(id) },
      data: { nome, matricula, email, curso_id },
    });
    return res.json(aluno);
    } catch (error: any) {
    return res.status(400).json({ error: "Erro ao atualizar aluno." });
  }
}

export const deleteAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        await Prisma.aluno.delete({ where: { id: Number(id) } });
        return res.status(204).send();
    } catch {
        return res.status(400).json({ error: "Erro ao excluir aluno." });
    }
}