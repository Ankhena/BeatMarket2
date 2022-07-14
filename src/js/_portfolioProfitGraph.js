function initPortfolioProfitGraph() {
    let baseWidth = 14;
    let chartDataNames = ["ERT", "QRT", "RTE", "ERT", "QRT", "RTE", "ERT", "QRT", "RTE", "ERT", "QRT", "RTE"];
    let chartData = [17, 14, 12, 8, 7, 6 , 5, 4, 3, 2, 1, 1];

    if (document.body.offsetWidth < 1500) {
        baseWidth = 12;
    }

    if (document.body.offsetWidth < 576) {
        baseWidth = 12;
    }

    if (document.querySelector("#portfolioProfitGraph") === null) {
        return false;
    }

    Highcharts.chart('portfolioProfitGraph', {
        chart: {
            type: 'column',
            style: { "fontFamily": "" },
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: chartDataNames,
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
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth: baseWidth,
                borderRadiusTopLeft: baseWidth / 2,
                borderRadiusTopRight: baseWidth / 2,
                enableMouseTracking: false,
            }
        },
        series: [
            {
                name: "data",
                states: { hover: { enabled: false } },
                data: chartData,
                color: "#46B151",
            },
        ]
    });
}

initPortfolioProfitGraph();