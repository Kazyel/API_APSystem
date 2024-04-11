import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";
import { DayRequest } from "../utils/types.js";
import { getPowerDay } from "../utils/getPowerDay.js";

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
    });

    done();
};

export default powerDayRoute;
