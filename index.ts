import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import dotenv from "dotenv";
import path from "node:path";
import { fastifyStatic } from "@fastify/static";
import { fileURLToPath, pathToFileURL } from "node:url";

// Configs
const PORT = Number(process.env.PORT);
const prisma = new PrismaClient();
const fastify = Fastify();
dotenv.config();

const clientDir = fileURLToPath(pathToFileURL("./client"));
fastify.register(fastifyStatic, {
    root: path.join(clientDir),
});

fastify.get("/", function (_, reply) {
    reply.sendFile("./index.html");
});

fastify.get("/api/hourly-energy", async () => {
    const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return hourlyEnergy;
});

// Getting the power generated on a daily basis
fastify.get("/api/power-in-day", async () => {
    const powerInDay = await prisma.power_in_day.findMany({
        orderBy: {
            duration: "desc",
        },
    });
    return powerInDay;
});

try {
    await fastify.listen({ port: PORT });
    console.log(`Server started at port: ${PORT}`);
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
