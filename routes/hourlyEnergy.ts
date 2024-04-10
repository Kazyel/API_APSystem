import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../index.js";

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
            const limitDate = () => {
                const baseDate = new Date(day);
                const maxDate = baseDate.setHours(baseDate.getHours() + 23, 59);
                const isoString = new Date(maxDate).toISOString();
                return isoString;
            };

            const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
                where: {
                    createdAt: {
                        gte: initialDate,
                        lte: limitDate(),
                    },
                },
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
        }

        const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
            where: {
                createdAt: {
                    // lte: date,
                },
            },
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
