import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";

const hourlyRoute = (
  fastify: FastifyInstance,
  options: never,
  done: () => void
) => {
  fastify.get("/api/hourly-energy", async (req, res) => {
    const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return hourlyEnergy;
  });

  done();
};
export default hourlyRoute;
