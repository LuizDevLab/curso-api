import { Request, Response } from "express";
import { cursoService } from "../services/cursoService";

export const cursoController = {
  // Lista todos os cursos
  async listar(req: Request, res: Response) {
    try {
      const cursos = await cursoService.listar();
      return res.status(200).json(cursos);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao listar cursos", error: error.message });
    }
  },

  // Cria um novo curso
  async criar(req: Request, res: Response) {
    try {
      const { nome, descricao, cargaHoraria } = req.body;

      if (!nome || !descricao || !cargaHoraria) {
        return res.status(400).json({ message: "Campos obrigatórios: nome, descricao, cargaHoraria" });
      }

      const novoCurso = await cursoService.criar({ nome, descricao, cargaHoraria });
      return res.status(201).json(novoCurso);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao criar curso", error: error.message });
    }
  },

  // Atualiza um curso existente
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, cargaHoraria } = req.body;

      const cursoAtualizado = await cursoService.atualizar(Number(id), { nome, descricao, cargaHoraria });
      return res.status(200).json(cursoAtualizado);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao atualizar curso", error: error.message });
    }
  },

  // Exclui um curso
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await cursoService.deletar(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao deletar curso", error: error.message });
    }
  }
};
