import { FastifyInstance } from 'fastify';
import { getHourlyEnergy } from '../utils/getHourlyEnergy.js';
import { DayRequest } from '../utils/types.js';
import { prisma } from '../index.js';
import { getAvailableDates } from '../utils/helpers.js';

const hourlyRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/hourly-energy', async (req: DayRequest) => {
        const { day } = req.query;

        if (day) {
            return await getHourlyEnergy(day);
        }

        const datesList = await prisma.hourly_energy_in_day.groupBy({
            by: 'createdAt',
        });

        return await { availableDates: getAvailableDates(datesList) };
    });

    done();
};
export default hourlyRoute;
