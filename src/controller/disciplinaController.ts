import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Disciplina } from "../entities/Disciplina";
import { Professor } from "../entities/Professor";

const disciplinaRepository = AppDataSource.getRepository(Disciplina);
const professorRepository = AppDataSource.getRepository(Professor);

export const disciplinaController = {
  // Criar uma nova disciplina
  async create(req: Request, res: Response) {
    try {
      const { nome, cargaHoraria, professorId } = req.body;

      if (!nome || !cargaHoraria || !professorId) {
        return res.status(400).json({
          success: false,
          message: "Nome, carga horária e professorId são obrigatórios",
        });
      }

      const professor = await professorRepository.findOneBy({ id: professorId });
      if (!professor) {
        return res
          .status(404)
          .json({ success: false, message: "Professor não encontrado" });
      }

      const disciplina = disciplinaRepository.create({
        nome,
        cargaHoraria,
        professor,
      });

      await disciplinaRepository.save(disciplina);

      return res.status(201).json({ success: true, data: disciplina });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao criar disciplina" });
    }
  },

  // Listar todas as disciplinas
  async list(req: Request, res: Response) {
    try {
      const disciplinas = await disciplinaRepository.find();
      return res.json({ success: true, data: disciplinas });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao listar disciplinas" });
    }
  },

  // Buscar disciplina por ID
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const disciplina = await disciplinaRepository.findOneBy({ id });

      if (!disciplina) {
        return res
          .status(404)
          .json({ success: false, message: "Disciplina não encontrada" });
      }

      return res.json({ success: true, data: disciplina });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao buscar disciplina" });
    }
  },

  // Atualizar disciplina
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nome, cargaHoraria, professorId } = req.body;

      const disciplina = await disciplinaRepository.findOneBy({ id });
      if (!disciplina) {
        return res
          .status(404)
          .json({ success: false, message: "Disciplina não encontrada" });
      }

      // Atualiza campos
      if (nome) disciplina.nome = nome;
      if (cargaHoraria) disciplina.cargaHoraria = cargaHoraria;

      if (professorId) {
        const professor = await professorRepository.findOneBy({ id: professorId });
        if (!professor) {
          return res
            .status(404)
            .json({ success: false, message: "Professor não encontrado" });
        }
        disciplina.professor = professor;
      }

      await disciplinaRepository.save(disciplina);

      return res.json({ success: true, data: disciplina });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao atualizar disciplina" });
    }
  },

  // Deletar disciplina
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const disciplina = await disciplinaRepository.findOneBy({ id });

      if (!disciplina) {
        return res
          .status(404)
          .json({ success: false, message: "Disciplina não encontrada" });
      }

      await disciplinaRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao excluir disciplina" });
    }
  },
};
