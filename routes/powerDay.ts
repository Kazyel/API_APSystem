import { FastifyInstance } from 'fastify';
import { DayRequest } from '../utils/types.js';
import { prisma } from '../index.js';
import { getAvailableDates, limitDate } from '../utils/helpers.js';

const getPowerDay = async (initialDate: string) => {
    const powerInDay = await prisma.power_in_day.findMany({
        where: {
            energy: {
                not: null!,
            },
            createdAt: {
                gte: initialDate,
                lte: limitDate(initialDate),
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const latestEntry = powerInDay[0];

    let labels: string[] = [];
    let startHour = 5;
    let startMinutes = 30;

    for (const _ in latestEntry.power as []) {
        if (startMinutes === 60) {
            startMinutes = 0;
            startHour++;
            labels.push(`${startHour}:${startMinutes}0`);
        } else if (startMinutes === 5) {
            labels.push(`${startHour}:0${startMinutes}`);
        } else {
            labels.push(`${startHour}:${startMinutes}`);
        }

        startMinutes = startMinutes + 5;
    }

    const data = {
        power: latestEntry.power,
        labels: labels,
    };

    return data;
};

const powerDayRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/daily-power', async (req: DayRequest) => {
        const { day } = req.query;

        if (day) {
            return await getPowerDay(new Date(day).toISOString());
        }

        const datesList = await prisma.power_in_day.groupBy({
            by: 'createdAt',
        });

        return { availableDates: getAvailableDates(datesList) };
    });

    done();
};

export default powerDayRoute;
