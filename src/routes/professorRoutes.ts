import { Router } from "express";
import { professorController } from "../controller/professorController";

const router = Router();

router.post("/", professorController.create);
router.get("/", professorController.list);
router.get("/:id", professorController.getById);
router.put("/:id", professorController.update);
router.delete("/:id", professorController.delete);

export default router;
