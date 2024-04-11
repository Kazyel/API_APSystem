export const hourlyEnergy = async () => {
    const today = new Date().toISOString().slice(0, 10)

    const res = await fetch(`/api/hourly-energy?day=${today}`)
    const hourlyEnergy = await res.json()

    const ctx = document.getElementById('hourlyChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hourlyEnergy.labels,
            datasets: [{
                label: '# Energia Gerada por hora',
                data: hourlyEnergy.energy,
                borderColor: '#00AAFF',
                borderWidth: 1,
                backgroundColor: '#00bbFF',

            }]
        },
        options: {
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
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            return "Hora: " + context[0].label
                        }
                    }
                },
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
