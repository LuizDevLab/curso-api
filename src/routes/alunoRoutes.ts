import { Router } from "express";
import { alunoController } from "../controller/alunoController";

const router = Router();

router.post("/", alunoController.create);
router.get("/", alunoController.list);
router.get("/:id", alunoController.getById);
router.put("/:id", alunoController.update);
router.delete("/:id", alunoController.delete);

export default router;
