import { Router } from "express";
import { cursoController } from "../controller/cursoController";

const router = Router();

router.get("/", cursoController.listar);
router.post("/", cursoController.criar);
router.put("/:id", cursoController.atualizar);
router.delete("/:id", cursoController.deletar);

export default router;
