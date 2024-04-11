export const dailyPower = async () => {
    const today = new Date().toISOString().slice(0, 10)

    const res = await fetch(`/api/daily-power?day=${today}`)
    const dailyPower = await res.json()

    const ctx = document.getElementById('powerDayChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#f4a454');
    gradient.addColorStop(1, 'rgba(255,255,2555,0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dailyPower.labels,
            datasets: [{
                label: '# Energia Gerada no Dia',
                data: dailyPower.power,
                borderWidth: 3,
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
                backgroundColor: gradient,
                fill: true,
                lineTension: 0.2
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
            },

            interaction: {
                mode: "index",
                intersect: false,
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Power (w)',
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
                            return "Tempo: " + context[0].label
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
    })
}


