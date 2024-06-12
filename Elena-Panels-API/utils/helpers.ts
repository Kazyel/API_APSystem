import { Prisma } from '@prisma/client';

// export const getAvailableDates = (dates) => {
//     const availableDates: string[] = [];

//     dates.map((date) => {
//         const dateString = date.createdAt?.toISOString().slice(0, 10);

//         if (!availableDates.includes(dateString!)) {
//             availableDates.push(dateString!);
//         }
//     });

//     return availableDates;
// };

export const limitDate = (day: string) => {
    const baseDate = new Date(day);
    const maxDate = baseDate.setHours(
        baseDate.getHours() + (23 - new Date().getTimezoneOffset() / 60),
        59
    );
    const isoString = new Date(maxDate).toISOString();

    return isoString;
};
