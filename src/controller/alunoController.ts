import { Request, Response } from "express";
import { alunoService } from "../services/alunoService";

export const alunoController = {
  async create(req: Request, res: Response) {
    try {
      const novoAluno = await alunoService.create(req.body);
      return res.status(201).json({ success: true, data: novoAluno });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  async list(req: Request, res: Response) {
    const alunos = await alunoService.list();
    return res.json({ success: true, data: alunos });
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const aluno = await alunoService.getById(Number(id));
    if (!aluno)
      return res.status(404).json({ success: false, message: "Aluno não encontrado" });
    return res.json({ success: true, data: aluno });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const dados = req.body;
    const aluno = await alunoService.update(Number(id), dados);
    return res.json({ success: true, data: aluno });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await alunoService.delete(Number(id));
    return res.status(204).send();
  },
};
