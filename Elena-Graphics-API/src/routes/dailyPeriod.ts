import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';
import { DayRequest } from '../utils/types.js';
import { limitDate } from '../utils/helpers.js';

const dailyPeriodRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/energy/daily', async (req: DayRequest) => {
        const { day } = req.query;
        limitDate(day);

        const dailyEnergy = await prisma.daily_energy_in_period.findMany();

        return dailyEnergy;
    });

    done();
};

export default dailyPeriodRoute;
