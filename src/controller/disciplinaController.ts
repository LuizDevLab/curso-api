import { Request, Response } from "express";
import { getAllDisciplinas, getDisciplinaById, createDisciplina, updateDisciplina, deleteDisciplina } from "../services/disciplinaService";

export async function getAll(_req: Request, res: Response) {
  const disciplinas = await getAllDisciplinas();
  res.json(disciplinas);
}

export async function getById(req: Request, res: Response) {
  const disciplina = await getDisciplinaById(Number(req.params.id));
  if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrada" });
  res.json(disciplina);
}

export async function create(req: Request, res: Response) {
  const nova = await createDisciplina(req.body);
  res.status(201).json(nova);
}

export async function update(req: Request, res: Response) {
  const atualizada = await updateDisciplina(Number(req.params.id), req.body);
  res.json(atualizada);
}

export async function remove(req: Request, res: Response) {
  await deleteDisciplina(Number(req.params.id));
  res.status(204).send();
}
