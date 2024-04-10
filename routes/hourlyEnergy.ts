import { FastifyInstance, FastifyRequest } from "fastify";
import { getHourlyEnergy } from "../utils/getHourlyEnergy.js";

type DayRequest = FastifyRequest<{
  Querystring: { day: string };
}>;

const hourlyRoute = (
  fastify: FastifyInstance,
  options: never,
  done: () => void
) => {
  fastify.get("/api/hourly-energy", async (req: DayRequest) => {
    const { day } = req.query;

    if (day) {
      const initialDate = new Date(day).toISOString();
      return await getHourlyEnergy(initialDate, day);
    }

    return await getHourlyEnergy();
  });

  done();
};
export default hourlyRoute;
