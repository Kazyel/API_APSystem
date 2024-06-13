import { FastifyRequest } from 'fastify';

export type DayRequest = FastifyRequest<{
    Querystring: { day: string };
}>;

export type MonthlyRequest = FastifyRequest<{
    Querystring: { month?: string; year?: string };
}>;

export type MonthlyData = { date: string; energy: string }[];
