import { FastifyInstance } from 'fastify';
import { DayRequest } from '../utils/types.js';
import { prisma } from '../index.js';
import { getAvailableDates, limitDate } from '../utils/helpers.js';

const getHourlyEnergy = async (initialDate: string) => {
    const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
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

    const latestEntry = hourlyEnergy[0];

    let labels: string[] = [];
    for (let i = 0; i < (latestEntry.energy as []).length; i++) {
        labels.push(String(i));
    }

    const data = {
        energy: latestEntry.energy,
        labels: labels,
    };

    return data;
};

const hourlyRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/hourly-energy', async (req: DayRequest) => {
        const { day } = req.query;

        if (day) {
            return await getHourlyEnergy(new Date(day).toISOString());
        }

        const datesList = await prisma.hourly_energy_in_day.groupBy({
            by: 'createdAt',
        });

        return { availableDates: getAvailableDates(datesList) };
    });

    done();
};
export default hourlyRoute;
