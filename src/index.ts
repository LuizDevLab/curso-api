import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
// import alunoRoutes from "./routes/alunoRoutes";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// app.use("/alunos", alunoRoutes);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
