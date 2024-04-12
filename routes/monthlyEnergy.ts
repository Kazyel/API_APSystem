import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";

const monthlyEnergyRoute = (
  fastify: FastifyInstance,
  options: never,
  done: () => void
) => {
  fastify.get("/api/monthly-energy", async () => {
    const monthlyEnergy = await prisma.monthly_energy_in_year.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const energy: string[] = [];
    (monthlyEnergy[0].o as []).map((month: string) => {
      energy.push(month);
    });

    const data = {
      energy: energy,
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
    };

    return data;
  });

  done();
};

export default monthlyEnergyRoute;
