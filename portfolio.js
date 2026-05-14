document.addEventListener('DOMContentLoaded', () => {
    const totalInvestment = 400000;
    const years = 5;

    const projectedGrowthEl = document.getElementById('projected-growth');
    const totalValueEl = document.getElementById('total-value');

    const sliders = {
        stocks: document.getElementById('stocks'),
        bonds: document.getElementById('bonds'),
        realEstate: document.getElementById('real-estate'),
        crypto: document.getElementById('crypto')
    };

    const values = {
        stocks: document.getElementById('stocks-value'),
        bonds: document.getElementById('bonds-value'),
        realEstate: document.getElementById('real-estate-value'),
        crypto: document.getElementById('crypto-value')
    };

    // Hypothetical annual growth rates for each asset class
    const growthRates = {
        stocks: 0.10, // 10%
        bonds: 0.04,  // 4%
        realEstate: 0.06, // 6%
        crypto: 0.20 // 20%
    };

    let chart;

    function calculateAndDisplayPortfolio() {
        const allocation = {
            stocks: parseInt(sliders.stocks.value) / 100,
            bonds: parseInt(sliders.bonds.value) / 100,
            realEstate: parseInt(sliders.realEstate.value) / 100,
            crypto: parseInt(sliders.crypto.value) / 100
        };

        let totalAllocation = Object.values(allocation).reduce((sum, val) => sum + val, 0);

        if (totalAllocation > 1) {
            // Normalize if total exceeds 100%
            const excess = totalAllocation - 1;
            let totalToReduce = 1 - allocation[this.id];
            for (let key in allocation) {
                if (key !== this.id) {
                    allocation[key] -= excess * (allocation[key] / totalToReduce) 
                }
            }
        }

        // Recalculate portfolio with potentially normalized values
        let projectedValue = totalInvestment;
        const yearlyData = [totalInvestment];
        let weightedGrowthRate = 0;

        for (const asset in allocation) {
            weightedGrowthRate += allocation[asset] * growthRates[asset];
        }

        for (let i = 0; i < years; i++) {
            projectedValue *= (1 + weightedGrowthRate);
            yearlyData.push(projectedValue);
        }

        const finalGrowth = projectedValue - totalInvestment;
        projectedGrowthEl.textContent = `S$${finalGrowth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalValueEl.textContent = `S$${projectedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        updateChart(yearlyData);

    }

    function updateSliderValues() {
        for (const key in sliders) {
            values[key].textContent = `${sliders[key].value}%`;
        }
    }

    function handleSliderInput(e) {
        let total = 0;
        for (const key in sliders) {
            total += parseInt(sliders[key].value);
        }

        if (total > 100) {
            let excess = total - 100;
            let otherSlidersTotal = 0;
            for (const key in sliders) {
                if (sliders[key] !== e.target) {
                    otherSlidersTotal += parseInt(sliders[key].value);
                }
            }

            for (const key in sliders) {
                if (sliders[key] !== e.target) {
                    sliders[key].value = parseInt(sliders[key].value) - excess * (parseInt(sliders[key].value) / otherSlidersTotal);
                }
            }
        }
        
        updateSliderValues();
        calculateAndDisplayPortfolio();
    }

    for (const key in sliders) {
        sliders[key].addEventListener('input', handleSliderInput);
    }


    function updateChart(data) {
        const labels = ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];

        if(chart) {
            chart.data.datasets[0].data = data;
            chart.update();
        } else {
            const ctx = document.getElementById('growth-chart').getContext('2d');
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Portfolio Value',
                        data: data,
                        borderColor: '#0052cc',
                        backgroundColor: 'rgba(0, 82, 204, 0.1)',
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function(value, index, values) {
                                    return 'S$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    updateSliderValues();
    calculateAndDisplayPortfolio();
});
