import { PrismaClient } from "@prisma/client";
import { fastifyStatic } from "@fastify/static";
import { fileURLToPath, pathToFileURL } from "node:url";
import Fastify from "fastify";
import dotenv from "dotenv";
import path from "node:path";
import hourlyRoute from "./routes/hourlyEnergy.js";
import powerDayRoute from "./routes/powerDay.js";
import dailyPeriod from "./routes/dailyPeriod.js";
import monthlyEnergy from "./routes/monthlyEnergy.js";
import yearlyEnergy from "./routes/yearlyEnergy.js";

// Configs
dotenv.config();
export const prisma = new PrismaClient();
const PORT = Number(process.env.PORT);
const fastify = Fastify();

const clientDir = fileURLToPath(pathToFileURL("./client"));
fastify.register(fastifyStatic, {
    root: path.join(clientDir),
});

// Routes
fastify.get("/", function (_, reply) {
    reply.sendFile("./index.html");
});
fastify.register(hourlyRoute);
fastify.register(powerDayRoute);
fastify.register(dailyPeriod);
fastify.register(monthlyEnergy);
fastify.register(yearlyEnergy);

try {
    await fastify.listen({ port: PORT });
    console.log(`Server started at port: ${PORT}`);
} catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
}
