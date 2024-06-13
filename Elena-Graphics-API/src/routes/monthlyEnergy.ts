import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';
import { MonthlyData, MonthRequest } from '../utils/types.js';

const monthlyEnergyRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/energy/monthly', async (req: MonthRequest) => {
        const { month } = req.query;

        if (month) {
            const monthlyEnergy = await prisma.daily_energy.findFirst({
                where: {
                    month_ref: month,
                },

                orderBy: {
                    createdAt: 'desc',
                },
            });

            if (monthlyEnergy !== null) {
                const monthlyDataArray = monthlyEnergy.data as MonthlyData;
                const monthlyProcessedData = [];

                for (let i = 0; i < monthlyDataArray.length; i++) {
                    monthlyProcessedData.push({
                        label: monthlyDataArray[i].date,
                        energy: monthlyDataArray[i].energy,
                    });
                }

                return monthlyProcessedData;
            }
        }

        const months = await prisma.daily_energy.findMany({
            distinct: 'month_ref',
        });

        const monthData = [];

        for (const month in months) {
            let energyAccumulated = 0;
            const dataArray = months[month].data as MonthlyData;

            for (const data in dataArray) {
                energyAccumulated += Number(dataArray[data].energy);
            }

            monthData.push({
                month: months[month].month_ref,
                energy: energyAccumulated,
            });
        }

        return monthData;
    });

    done();
};

export default monthlyEnergyRoute;
