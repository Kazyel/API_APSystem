export const dailyEnergy = async () => {
    const currentData = new Date()
    const currentMonthString = `0${currentData.getMonth() + 1}/${currentData.getFullYear()}`

    const res = await fetch(`/api/energy/monthly?month=${currentMonthString}`)
    const dailyEnergy = await res.json()

    const ctx = document.getElementById('dailyChart').getContext('2d');

    const days = []
    const energy = []

    for (const entry in dailyEnergy) {
        let currEntry = dailyEnergy[entry]
        let convertData = new Date(currEntry.label).toLocaleDateString("pt-BR")

        days.push(convertData)
        energy.push(currEntry.energy)
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: '# Energia Gerada Diariamente',
                data: energy,
                borderColor: '#FFaa00',
                backgroundColor: '#FFbb00',
                borderWidth: 1,
                maxBarThickness: 75,
            }]
        },
        options: {
            maintainAspectRatio: false,

            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Energy (kWh)',
                        font: {
                            family: "Open Sans",
                            weight: 'bold',
                            size: 16
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: "Open Sans",
                            size: 16,
                            weight: 'bold',
                        },
                    }
                }
            }
        }
    },

    );
}

