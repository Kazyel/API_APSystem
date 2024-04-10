import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";

const dailyPeriod = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get("/api/daily-period", async () => {
        const dailyEnergy = await prisma.daily_energy_in_period.findMany();

        return dailyEnergy;
    });

    done();
};

export default dailyPeriod;
