import { prisma } from "../index.js";
import { limitDate } from "./helpers.js";

export const getPowerDay = async (initialDate: string, day: string) => {
    if (initialDate && day) {
        const powerInDay = await prisma.power_in_day.findMany({
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

        const mostRecent = powerInDay[0];

        let labels: string[] = [];
        let startHour = 5;
        let startMinutes = 30;

        (mostRecent.power as []).forEach(() => {
            startMinutes = startMinutes + 5;

            if (startMinutes === 60) {
                startMinutes = 0;
                startHour++;
                labels.push(`${startHour}:${startMinutes}0`);
            } else if (startMinutes === 5) {
                labels.push(`${startHour}:0${startMinutes}`);
            } else {
                labels.push(`${startHour}:${startMinutes}`);
            }
        });

        const data = {
            power: mostRecent.power,
            labels: labels,
        };

        return data;
    }
};
