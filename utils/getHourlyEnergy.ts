import { prisma } from "../index.js";

export const limitDate = (day: string) => {
  const baseDate = new Date(day);
  const maxDate = baseDate.setHours(baseDate.getHours() + 23, 59);
  const isoString = new Date(maxDate).toISOString();
  return isoString;
};

export const getHourlyEnergy = async (initialDate?: string, day?: string) => {
  // If the user is querying a specific date:
  if (day && initialDate) {
    const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
      where: {
        createdAt: {
          gte: initialDate,
          lte: limitDate(day),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mostRecent = hourlyEnergy[0];

    let labels = [];
    if (mostRecent.energy) {
      for (let i = 0; i < (mostRecent.energy as []).length; i++) {
        labels.push(i + "hrs");
      }
    }

    const data = {
      energy: mostRecent.energy,
      labels: labels,
    };

    return data;
  }

  // Getting the most recent data:
  const hourlyEnergy = await prisma.hourly_energy_in_day.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const mostRecent = hourlyEnergy[0];

  let labels = [];
  if (mostRecent.energy) {
    for (let i = 0; i < (mostRecent.energy as []).length; i++) {
      labels.push(i + "hrs");
    }
  }

  const data = {
    energy: mostRecent.energy,
    labels: labels,
  };

  return data;
};
