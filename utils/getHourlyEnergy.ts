import { prisma } from "../index.js";
import { limitDate } from "./helpers.js";

export const getHourlyEnergy = async (initialDate?: string, day?: string) => {
    if (day && initialDate) {
        const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
            where: {
                energy: {
                    not: null!,
                },
                createdAt: {
                    gte: initialDate,
                    lte: limitDate(day),
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const mostRecent = hourlyEnergy[0];

        let labels: string[] = [];
        if (mostRecent.energy) {
            for (let i = 0; i < (mostRecent.energy as []).length; i++) {
                labels.push(String(i));
            }
        }

        const data = {
            energy: mostRecent.energy,
            labels: labels,
        };

        return data;
    }
};
