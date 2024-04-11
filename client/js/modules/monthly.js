export const monthlyEnergy = async () => {
    const res = await fetch('/api/monthly-energy')
    const monthlyEnergy = await res.json()

    const ctx = document.getElementById('monthlyChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyEnergy.labels,
            datasets: [{
                label: '# Energia Gerada Mensalmente',
                data: monthlyEnergy.energy,
                borderColor: '#FFaa00',
                borderWidth: 1,
                backgroundColor: '#FFbb00',

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

