import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'node:path';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { fastifyStatic } from '@fastify/static';
import { fileURLToPath, pathToFileURL } from 'node:url';

import cabinetPanels from './routes/panels/cabinetPanels.js';
import laundryPanels from './routes/panels/laundryPanels.js';
import homePanels from './routes/panels/homePanels.js';
import restaurantPanels from './routes/panels/restaurantPanels.js';

// Configs
dotenv.config();
const PORT = Number(process.env.PORT);
const fastify = Fastify();
await fastify.register(cors, {});
export const prisma = new PrismaClient();

// Client
const clientDir = fileURLToPath(pathToFileURL('./client'));
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

try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server started at port: ${PORT}`);
} catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
}
