import { FastifyInstance } from "fastify";
import { getHourlyEnergy } from "../utils/getHourlyEnergy.js";
import { DayRequest } from "../utils/types.js";

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
    });

    done();
};
export default hourlyRoute;
