import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";

const powerDayRoute = (
  fastify: FastifyInstance,
  options: never,
  done: () => void
) => {
  fastify.get("/api/power-in-day", async (req, res) => {
    const powerInDay = await prisma.power_in_day.findMany({
      orderBy: {
        duration: "desc",
      },
    });

    return powerInDay;
  });

  done();
};

export default powerDayRoute;
