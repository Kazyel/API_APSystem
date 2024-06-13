import dotenv from 'dotenv';
import { fastify } from './src/server.js';
dotenv.config();

// Configs
const PORT = Number(process.env.PORT);

try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server started at port: ${PORT}`);
} catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
}
