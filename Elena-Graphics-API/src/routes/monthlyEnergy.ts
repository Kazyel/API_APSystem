import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';
import { MonthlyData, MonthlyRequest } from '../utils/types.js';

const monthlyEnergyRoute = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/energy/monthly', async (req: MonthlyRequest) => {
        const { month, year } = req.query;

        if (month && month !== undefined) {
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

        if (year && year !== undefined) {
            const months = await prisma.daily_energy.findMany({
                distinct: 'month_ref',
                orderBy: [
                    {
                        month_ref: 'asc',
                    },
                    {
                        createdAt: 'desc',
                    },
                ],
            });

            const filteredMonths = months.filter((month) => {
                return month.month_ref?.slice(3) === year;
            });
            
            const monthlyProcessedData = [];

            for (const month in filteredMonths) {
                let energyAccumulated = 0;
                const dataArray = months[month].data as MonthlyData;

                for (const data in dataArray) {
                    energyAccumulated += Number(dataArray[data].energy);
                }

                monthlyProcessedData.push({
                    month: months[month].month_ref,
                    energy: energyAccumulated,
                });
            }

            return monthlyProcessedData;
        }

        return null
    });

    done();
};

export default monthlyEnergyRoute;
