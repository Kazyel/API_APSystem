import { FastifyRequest } from 'fastify';

export type DayRequest = FastifyRequest<{
    Querystring: { day: string };
}>;

export type MonthRequest = FastifyRequest<{
    Querystring: { month: string };
}>;

export type MonthlyData = {"date": string, "energy": string}[]