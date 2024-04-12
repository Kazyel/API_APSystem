import { FastifyInstance } from "fastify";
import { DayRequest } from "../utils/types.js";
import { getPowerDay } from "../utils/getPowerDay.js";
import { prisma } from "../index.js";
import { getAvailableDates } from "../utils/helpers.js";

const powerDayRoute = (
  fastify: FastifyInstance,
  options: never,
  done: () => void
) => {
  fastify.get("/api/daily-power", async (req: DayRequest) => {
    const { day } = req.query;

    if (day) {
      const initialDate = new Date(day).toISOString();
      return await getPowerDay(initialDate, day);
    }

    const datesList = await prisma.power_in_day.groupBy({
      by: "createdAt",
    });

    return await { availableDates: getAvailableDates(datesList) };
  });

  done();
};

export default powerDayRoute;
