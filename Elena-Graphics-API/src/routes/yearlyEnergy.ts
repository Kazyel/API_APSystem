import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';

const yearlyEnergyRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/energy/yearly', async () => {
        const yearlyEnergy = await prisma.yearly_energy_in_lifetime.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (yearlyEnergy !== null) {
            const data = {
                energy: yearlyEnergy.energy,
                labels: yearlyEnergy.year,
            };

            return data;
        }
    });

    done();
};

export default yearlyEnergyRoute;
