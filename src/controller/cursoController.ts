import { Request, Response } from "express";
import {getAllCursos, getCursoBydId, createCurso, updateCurso, deleteCurso} from "../services/cursoService";

export async function getAll(req: Request, res: Response) {
  const cursos = await getAllCursos()
  res.json()
}

export async function getById(req: Request, res: Response) {
  const curso = await getCursoBydId(Number(req.params.id))
}

export async function create(req: Request, res: Response) {
  const novo = await createCurso(req.body)
  res.status(201).json(novo)
}

export async function update(req: Request, res: Response) {
  const atualizado = await updateCurso(Number(req.params.id), req.body)
  res.json(atualizado)
}

export async function remove(req: Request, res: Response) {
  
}