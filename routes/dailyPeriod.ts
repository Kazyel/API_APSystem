import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";
import { limitDate } from "../utils/getHourlyEnergy.js";
import { DayRequest } from "../utils/types.js";

const dailyPeriod = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get("/api/daily-period", async (req: DayRequest) => {
        const { day } = req.query;
        limitDate(day);

        const dailyEnergy = await prisma.daily_energy_in_period.findMany();

        return dailyEnergy;
    });

    done();
};

export default dailyPeriod;
