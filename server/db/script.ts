import { prisma } from "./prisma";

async function main() {
  await prisma.analistas.createMany({
    data: [
      {
        nome: "Alice",
      },
      {
        nome: "Pedro",
      },
      {
        nome: "Lucas",
      },
    ],
  });

  await prisma.prioridadeChamados.createMany({
    data: [
      {
        descricao: "BAIXA",
      },
      {
        descricao: "MÉDIA",
      },
      {
        descricao: "ALTA",
      },
    ],
  });

  await prisma.statusChamados.createMany({
    data: [
      {
        descricao: "Em atendimento",
      },
      {
        descricao: "Resolvido",
      },
      {
        descricao: "Fechado",
      },
    ],
  });

  const todosAnalistas = await prisma.analistas.findMany({ take: 3 });
  console.log(
    "Todos os analistas criados:",
    JSON.stringify(todosAnalistas, null, 2),
  );

  const todosPrioridadeChamados = await prisma.prioridadeChamados.findMany({
    take: 3,
  });
  console.log(
    "Todas as prioridades de chamado criadas:",
    JSON.stringify(todosPrioridadeChamados, null, 2),
  );

  const todosStatusChamados = await prisma.statusChamados.findMany({ take: 3 });
  console.log(
    "Todos os stautus de chamado criados:",
    JSON.stringify(todosStatusChamados, null, 2),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
