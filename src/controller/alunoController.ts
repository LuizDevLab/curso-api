import { Request, Response } from "express";
import {
  getAllAlunos,
  getAlunoById,
  createAluno,
  updateAluno,
  deleteAluno,
} from "../services/serviceAluno";

export async function getAll(req: Request, res: Response) {
  const alunos = await getAllAlunos();
  res.json(alunos);
}

export async function getById(req: Request, res: Response) {
  const aluno = await getAlunoById(Number(req.params.id));
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado!" });
  res.json(aluno);
}

export async function create(req: Request, res: Response) {
  const novo = await createAluno(req.body)
  res.status(201).json(novo)
}

export async function update(req: Request, res: Response) {
  const atualizado = await updateAluno(Number(req.params.id), req.body)
  res.json(atualizado)
}

export async function remove(req: Request, res: Response) {
  await deleteAluno(Number(req.params.id))
  res.status(204).send()
}