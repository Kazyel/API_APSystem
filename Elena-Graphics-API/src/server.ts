import Fastify from 'fastify';
import path from 'node:path';
import cors from '@fastify/cors';

import { fastifyStatic } from '@fastify/static';
import { fileURLToPath, pathToFileURL } from 'node:url';

import hourlyRoute from './routes/hourlyEnergy.js';
import powerDayRoute from './routes/realtimeEnergy.js';
import monthlyEnergyRoute from './routes/monthlyEnergy.js';
import yearlyEnergyRoute from './routes/yearlyEnergy.js';

// Configs
export const fastify = Fastify();
await fastify.register(cors, {});

// Client
const clientDir = fileURLToPath(pathToFileURL('public'));
fastify.register(fastifyStatic, {
    root: path.join(clientDir),
});

fastify.get('/', function (_, reply) {
    reply.sendFile('./index.html');
});

// Energy Routes
fastify.register(hourlyRoute);
fastify.register(powerDayRoute);
fastify.register(monthlyEnergyRoute);
fastify.register(yearlyEnergyRoute);
