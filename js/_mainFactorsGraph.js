function initMainFactorsGraph() {
    let baseWidth = 22;

    if (document.body.offsetWidth < 1500) {
        baseWidth = 10;
    }

    if (document.querySelector("#mainFactorsGraph") === null) {
        return false;
    }

    Highcharts.chart('mainFactorsGraph', {
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
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true,
            labels: {
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            visible: false
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
            valueSuffix: ' $'
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
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            color: "#3E54D8"
        }]
    });
}

initMainFactorsGraph()