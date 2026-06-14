import app from "./app";
import cors from "cors";

app.use(cors({ origin: "http://localhost" }));

app.listen(`${process.env.PORT}`, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}.`);
});
