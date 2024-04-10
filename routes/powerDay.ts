import { FastifyInstance } from "fastify";
import { prisma } from "../index.js";

const powerDayRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get("/api/power-in-day", async () => {
        const powerInDay = await prisma.power_in_day.findMany();

        let labels: string[] = [];
        let power: string[] = [];

        powerInDay.map((entry, index) => {
            if (entry.createdAt && entry.power) {
                power.push((entry.power as string[])[index]);
                labels.push(
                    entry.createdAt.toLocaleTimeString("pt-BR", {
                        timeZone: "UTC",
                    })
                );
            }
            return;
        });

        const data = {
            power: power,
            labels: labels,
        };

        return data;
    });

    done();
};

export default powerDayRoute;
