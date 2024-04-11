import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";

const yearlyEnergy = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get("/api/yearly-energy", async () => {
        const yearlyEnergy = await prisma.yearly_energy_in_lifetime.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        const data = {
            energy: yearlyEnergy[0].energy,
            labels: yearlyEnergy[0].year,
        };

        return data;
    });

    done();
};

export default yearlyEnergy;
