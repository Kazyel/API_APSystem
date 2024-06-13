import { FastifyInstance } from 'fastify';
import { DayRequest } from '../utils/types.js';
import { prisma } from '../db.js';
import { getAvailableDates, limitDate } from '../utils/helpers.js';

const getHourlyEnergy = async (initialDate: string) => {
    const hourlyEnergy = await prisma.hourly_energy_in_day.findFirst({
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

    if (hourlyEnergy !== null) {
        let labels: string[] = [];
        for (let i = 0; i < (hourlyEnergy.energy as []).length; i++) {
            labels.push(String(i));
        }

        const data = {
            energy: hourlyEnergy.energy,
            labels: labels,
        };

        return data;
    }
};

const hourlyRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/energy/hourly', async (req: DayRequest) => {
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
