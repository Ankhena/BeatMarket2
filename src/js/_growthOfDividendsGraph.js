function initGrowthOfDividendsGraph() {
    let baseWidth = 14;
    let chartDataLabels = ["Янв.", "Фев.", "Март", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сен.", "Окт.", "Нояб.", "Дек."];
    let chartDataNames = ["TSLA", "FBA", "DPD", "OQER", "TSLA", "FBA", "DPD", "OQER", "TSLA", "FBA", "DPD", "OQER"];
    let chartDataNamesFull = ["Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell"];
    let chartDataYears = [2021, 2020, 2019];
    let chartData = [
        [
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
        ],
        [
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
        ],
        [
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
        ]
    ];

    function generateDataObject(yearsArrayData, costArrayData) {
        let innerHTML = ``;
        yearsArrayData.forEach((data, i) => {
            innerHTML += `
            <div class="customTooltip__item">
                <span class="customTooltip__key">${yearsArrayData[i]}</span>
                <span class="customTooltip__value">${costArrayData[i]} $</span>
            </div>`
        });
        return innerHTML;
    }

    if (document.body.offsetWidth < 1500) {
        baseWidth = 12;
    }

    if (document.body.offsetWidth < 576) {
        baseWidth = 12;
    }

    if (document.querySelector("#growthOfDividendsGraph") === null) {
        return false;
    }

    Highcharts.chart('growthOfDividendsGraph', {
        chart: {
            type: 'column',
            style: { "fontFamily": "" },
        },
        credits: {
            enabled: false
        },
        legend: {
            //enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: chartDataLabels,
            crosshair: true,
            labels: {
                enabled: true,
                type: 'category',
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            visible: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value) + '%';
                },
                style: {
                    fontSize: "0.9rem",
                    color: "#373943"
                }
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true,
            formatter: function() {
                let index = this.points[0].point.index;
                //let costArrayData = chartData.map(item => item.point.cost);

                let costArrayData = chartData.map(item => item.filter((elem, i) => i === index).map(elem => elem.cost)[0]);
                let yearsArrayData = chartDataYears;

                return `
                    <div class="customTooltip">
                        <div class="customTooltip__grid">
                            ${generateDataObject(yearsArrayData, costArrayData)}
                        </div>
                    </div>
                `;
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth: baseWidth,
                borderRadiusTopLeft: baseWidth / 2,
                borderRadiusTopRight: baseWidth / 2,
            }
        },
        series: [
            {
                name: chartDataYears[0],
                states: { hover: { enabled: false } },
                data: chartData[0],
                color: "#3E54D8",
            },
            {
                name: chartDataYears[1],
                states: { hover: { enabled: false } },
                data: chartData[1],
                color: "#E46877",
            },
            {
                name: chartDataYears[2],
                states: { hover: { enabled: false } },
                data: chartData[2],
                color: "#46B151",
            },
        ]
    });
}

initGrowthOfDividendsGraph();