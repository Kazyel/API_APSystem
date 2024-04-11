export const yearlyEnergy = async () => {
    const res = await fetch('/api/yearly-energy')
    const yearlyEnergy = await res.json()

    const ctx = document.getElementById('yearlyChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearlyEnergy.labels,
            datasets: [{
                label: '# Energia Gerada Anualmente',
                data: yearlyEnergy.energy,
                borderColor: '#bb0000',
                borderWidth: 1,
                backgroundColor: '#AA0000',
                maxBarThickness: 100,

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
                },
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