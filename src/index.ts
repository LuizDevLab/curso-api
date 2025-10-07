import express from "express";
import cors from "cors";
import alunoRoute from "./routes/alunoRoute";
import cursoRoute from "./routes/cursoRoute";
import professorRoute from "./routes/professorRoute";
import disciplinaRoute from "./routes/disciplinaRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/alunos", alunoRoute);
app.use("/cursos", cursoRoute);
app.use("/professores", professorRoute);
app.use("/disciplinas", disciplinaRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
