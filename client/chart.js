const hourlyEnergy = async () => {
    const res = await fetch("/api/hourly-energy")
    const hourlyEnergy = await res.json()

    const ctx = document.getElementById('hourlyChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hourlyEnergy.labels,
            datasets: [{
                label: '# Hourly Energy Generated',
                data: hourlyEnergy.energy,
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

const dailyEnergy = async () => {
    const res = await fetch("/api/power-in-day")
    const ctx = document.getElementById('powerDayChart');
    const dailyPower = await res.json()

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dailyPower.labels,
            datasets: [{
                label: '# Power in Day Generated',
                data: dailyPower.power,
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

const periodEnergy = async () => {

}

dailyEnergy()
hourlyEnergy()
