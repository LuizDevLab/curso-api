import { Request, Response } from "express";
import {
  getAllProfessores,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
} from "../services/professorService";

export async function getAll(req: Request, res: Response) {
  const professores = await getAllProfessores();
  res.json(professores);
}

export async function getById(req: Request, res: Response) {
  const professor = await getProfessorById(Number(req.params.id));
  if (!professor)
    return res.status(404).json({ error: "Professor não encontrado" });
  res.json(professor);
}

export async function create(req: Request, res: Response) {
  const novo = await createProfessor(req.body);
  res.status(201).json(novo);
}

export async function update(req: Request, res: Response) {
  const atualizado = await updateProfessor(Number(req.params.id), req.body);
  res.json(atualizado)
}

export async function remove(req: Request, res: Response) {
  await deleteProfessor(Number(req.params.id))
  res.status(204).send()
}