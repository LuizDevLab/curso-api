import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source"; 
import { Professor } from "../entities/Professor";

const professorRepository = AppDataSource.getRepository(Professor);

export const professorController = {
  // Criar professor
  async create(req: Request, res: Response) {
    try {
      const { nome, email, disciplina } = req.body;

      if (!nome || !email || !disciplina) {
        return res
          .status(400)
          .json({ success: false, message: "Nome, email e disciplina são obrigatórios" });
      }

      const novoProfessor = professorRepository.create({ nome, email, disciplina });
      await professorRepository.save(novoProfessor);

      return res.status(201).json({ success: true, data: novoProfessor });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Erro ao criar professor" });
    }
  },

  // Listar todos
  async list(req: Request, res: Response) {
    try {
      const professores = await professorRepository.find();
      return res.json({ success: true, data: professores });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Erro ao listar professores" });
    }
  },

  // Buscar por ID
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const professor = await professorRepository.findOneBy({ id });

      if (!professor) {
        return res
          .status(404)
          .json({ success: false, message: "Professor não encontrado" });
      }

      return res.json({ success: true, data: professor });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Erro ao buscar professor" });
    }
  },

  // Atualizar professor
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nome, email, disciplina } = req.body;

      const professor = await professorRepository.findOneBy({ id });
      if (!professor) {
        return res
          .status(404)
          .json({ success: false, message: "Professor não encontrado" });
      }

      professor.nome = nome || professor.nome;
      professor.email = email || professor.email;
      professor.disciplina = disciplina || professor.disciplina;

      await professorRepository.save(professor);

      return res.json({ success: true, data: professor });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Erro ao atualizar professor" });
    }
  },

  // Deletar professor
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const professor = await professorRepository.findOneBy({ id });

      if (!professor) {
        return res
          .status(404)
          .json({ success: false, message: "Professor não encontrado" });
      }

      await professorRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Erro ao excluir professor" });
    }
  },
};
