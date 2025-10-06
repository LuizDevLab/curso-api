import { Router } from "express";
import { disciplinaController } from "../controller/disciplinaController";

const router = Router();

router.post("/", disciplinaController.create);
router.get("/", disciplinaController.list);
router.get("/:id", disciplinaController.getById);
router.put("/:id", disciplinaController.update);
router.delete("/:id", disciplinaController.delete);

export default router;
