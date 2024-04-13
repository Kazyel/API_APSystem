import { PrismaClient } from '@prisma/client';
import { fastifyStatic } from '@fastify/static';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'node:path';
import hourlyRoute from './routes/hourlyEnergy.js';
import powerDayRoute from './routes/powerDay.js';
import dailyPeriodRoute from './routes/dailyPeriod.js';
import monthlyEnergyRoute from './routes/monthlyEnergy.js';
import yearlyEnergyRoute from './routes/yearlyEnergy.js';
import cors from '@fastify/cors';

// Configs
dotenv.config();
export const prisma = new PrismaClient();
const PORT = Number(process.env.PORT);
const fastify = Fastify();

const clientDir = fileURLToPath(pathToFileURL('./client'));
fastify.register(fastifyStatic, {
    root: path.join(clientDir),
});

await fastify.register(cors, {});

// Routes
fastify.get('/', function (_, reply) {
    reply.sendFile('./index.html');
});
fastify.register(hourlyRoute);
fastify.register(powerDayRoute);
fastify.register(dailyPeriodRoute);
fastify.register(monthlyEnergyRoute);
fastify.register(yearlyEnergyRoute);

try {
    await fastify.listen({ port: PORT,  host: '0.0.0.0' });
    console.log(`Server started at port: ${PORT}`);
} catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
}


