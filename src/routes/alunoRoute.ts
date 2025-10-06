import { Router } from "express";

import {
  getAlunos,
  getAluno,
  createAluno,
  updateAluno,
  deleteAluno,
} from "src\controller\alunoController.ts";

const router = Router();

router.get("/", getAlunos);
router.get("/:id", getAluno);
router.post("/", createAluno);
router.put("/:id", updateAluno);
router.delete("/:id", deleteAluno);

export default router;