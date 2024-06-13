import path from 'node:path';
import Fastify from 'fastify';
import cors from '@fastify/cors';

import laundryPanels from './routes/laundryPanels.js';
import homePanels from './routes/homePanels.js';
import restaurantPanels from './routes/restaurantPanels.js';
import cabinetPanels from './routes/cabinetPanels.js';

import { fastifyStatic } from '@fastify/static';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const fastify = Fastify();
await fastify.register(cors, {});

// Client
const clientDir = fileURLToPath(pathToFileURL('./public'));
fastify.register(fastifyStatic, {
    root: path.join(clientDir),
});

fastify.get('/', function (_, reply) {
    reply.sendFile('./index.html');
});

// Panels routes
fastify.register(cabinetPanels);
fastify.register(restaurantPanels);
fastify.register(homePanels);
fastify.register(laundryPanels);
