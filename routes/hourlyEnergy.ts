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

        const mostRecent = hourlyEnergy[0];

        let labels = [];
        if (mostRecent.energy) {
            for (let i = 0; i < (mostRecent.energy as []).length; i++) {
                labels.push(i + "hrs");
            }
        }

        const data = {
            energy: mostRecent.energy,
            labels: labels,
        };

        return data;
    });

    done();
};
export default hourlyRoute;
