import { FastifyInstance } from 'fastify';
import { DayRequest } from '../utils/types.js';
import { prisma } from '../db.js';
import { getAvailableDates, limitDate } from '../utils/helpers.js';

const getPowerDay = async (initialDate: string) => {
    const powerInDay = await prisma.power_in_day.findFirst({
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

    let labels: string[] = [];
    let startHour = 6;
    let startMinutes = 0;

    if (powerInDay !== null) {
        (powerInDay.power as []).forEach(() => {
            if (startMinutes === 60) {
                startMinutes = 0;
                startHour++;
                labels.push(`${startHour}:${startMinutes}0`);
            } else if (startMinutes === 5) {
                labels.push(`${startHour}:0${startMinutes}`);
            } else if (startMinutes === 0) {
                labels.push(`${startHour}:${startMinutes}0`);
            } else {
                labels.push(`${startHour}:${startMinutes}`);
            }

            startMinutes = startMinutes + 5;
        });

        const data = {
            power: powerInDay.power,
            labels: labels,
        };

        return data;
    }
};

const powerDayRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/energy/realtime', async (req: DayRequest) => {
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
