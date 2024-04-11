import { Prisma } from "@prisma/client";

export const getAvailableDates = (
    dates: (Prisma.PickEnumerable<
        Prisma.Hourly_energy_in_dayGroupByOutputType,
        "createdAt"
    > & {})[]
) => {
    const availableDates: string[] = [];
    dates.map((dates) => {
        const yyyy_mm_dd = dates.createdAt?.toISOString().slice(0, 10);
        if (!availableDates.includes(yyyy_mm_dd!)) {
            availableDates.push(yyyy_mm_dd!);
        }
    });
    return availableDates;
};

export const limitDate = (day: string) => {
    const baseDate = new Date(day);
    const maxDate = baseDate.setHours(baseDate.getHours() + 23, 59);
    const isoString = new Date(maxDate).toISOString();
    return isoString;
};
