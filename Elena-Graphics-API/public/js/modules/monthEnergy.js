export const monthEnergy = async () => {
    const res = await fetch('/api/energy/monthly')
    const monthEnergy = await res.json()

    const ctx = document.getElementById('monthChart').getContext('2d');

    const months = []
    const energy = []

    for (const entry in monthEnergy) {
        let currEntry = monthEnergy[entry]

        months.push(currEntry.month)
        energy.push(currEntry.energy)
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: '# Energia Gerada Mensalmente',
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

