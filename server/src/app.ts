import express from "express";
import analistasRouter from "./routers/analistasRouter";
import prioridadeChamadosRouter from "./routers/prioridadeChamadosRouter";
import statusChamadosRouter from "./routers/statusChamadosRouter";
import chamadosRouter from "./routers/chamadosRouter";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use("/analistas", analistasRouter);
app.use("/prioridade_chamados", prioridadeChamadosRouter);
app.use("/status_chamados", statusChamadosRouter);
app.use("/chamados", chamadosRouter);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

export default app;
