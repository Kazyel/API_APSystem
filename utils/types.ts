import { FastifyRequest } from "fastify";

export type DayRequest = FastifyRequest<{
    Querystring: { day: string };
}>;
