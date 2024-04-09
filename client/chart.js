async function hourlyEnergy() {
    const res = await fetch("/api/hourly-energy")
    const hourlyEnergyArray = await res.json()

    console.log(recentData = hourlyEnergyArray[0])

    let labels = [];
    for (let i = 0; i < recentData.energy.length; i++) {
        labels.push(i + 'hrs')
    }

    const ctx = document.getElementById('hourlyChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# Hourly Energy Generated',
                data: recentData.energy,
                borderWidth: 3,
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
                tension: 0.3
            }]
        },
        options: {
            elements: {
                point: {
                    radius: 6,
                    hitRadius: 15
                },
                line: {
                    borderColor: '#f44a54',
                }
            }
        }
    });
}

hourlyEnergy()

const dailyEnergy = async () => {
    const res = await fetch("/api/power-in-day")
    const dailyEnergyArray = await res.json()

    console.log(recentData = dailyEnergyArray[0])

    let labels = [];
    for (let i = 0; i < recentData.time.length; i++) {
        labels.push(new Date(recentData.time[i]).toLocaleString('pt-BR'))
    }

    const ctx = document.getElementById('powerDayChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# Power in Day Generated',
                data: recentData.energy,
                borderWidth: 3,
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
                tension: 0.3
            }]
        },
        options: {
            elements: {
                point: {
                    radius: 1,
                    hitRadius: 15
                },
                line: {
                    borderColor: '#f4a454',
                }
            }
        }
    })
}

dailyEnergy()
