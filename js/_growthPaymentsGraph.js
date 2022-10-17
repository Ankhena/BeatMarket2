function initGrowthPaymentsGraph() {

    let colorPaybackDividends = "#47B252";
    let graphBgColor = "#F5F6FD";
    let widthGraphPoint = 75;
    let labelsStyle = {
        fontFamily: "Montserrat",
        fontWeight: "500",
        fontSize: '0.9rem'
    }

    if (document.body.offsetWidth < 1500) {
        widthGraphPoint = 55;
    }

    if (document.body.offsetWidth < 1200) {
        widthGraphPoint = 50;
    }

    // выплаченные дивиденды
    let data = [
        ['2007', 34.61, "rgba(25, 159, 39, 0.15)"],
        ['2008', 55.62, "rgba(25, 159, 39, 0.2)"],
        ['2009', 55.62, "rgba(25, 159, 39, 0.2)"],
        ['2010', 59.62, "rgba(25, 159, 39, 0.4)"],
        ['2011', 59.62, "rgba(25, 159, 39, 0.4)"],
        ['2012', 65.62, "rgba(25, 159, 39, 0.6)"],
        ['2013', 65.62, "rgba(25, 159, 39, 0.6)"],
        ['2014', 62.62, "rgba(25, 159, 39, 0.6)"],
        ['2015', 59.62, "rgba(25, 159, 39, 0.8)"],
        ['2016', 65.62, "rgba(25, 159, 39, 1)"],
        ['2017', 63.62, "rgba(25, 159, 39, 1)"],
        ['2018', 64.62, "rgba(222, 67, 85, 0.8)"],
        ['2019', 65.62, "rgba(222, 67, 85, 0.8)"],
        ['2020', 65.62, "rgba(222, 67, 85, 1)"],
        ['2021', 65.62, "rgba(222, 67, 85, 1)"]
    ];

    function getData(data) {
        return data.map(function (country, i) {
            return {
                name: country[0],
                y: country[1],
                color: country[2]
            };
        });
    }

    let elem = document.querySelector("#growthPaymentsGraph");
    if (elem !== null) {
        var chart = Highcharts.chart('growthPaymentsGraph', {
            chart: {
                type: 'column',
                backgroundColor: graphBgColor,
                height: 200
            },
            credits: {
                enabled: false
            },
            title: {
                text: '',
            },
            legend: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            xAxis: {
                type: 'category',
                labels: {
                    useHTML: true,
                    animate: true,
                    style: {
                        ...labelsStyle,
                        color: "#606371",
                    }
                }
            },
            yAxis: [{
                labels: {
                    enabled: false,
                },
                title: {
                    text: ''
                },
                showFirstLabel: false,
                gridLineWidth: 0,
            }],
            plotOptions: {
                series: {
                    grouping: false,
                    borderWidth: 0,
                },
                column: {
                    borderWidth: 0,
                    pointWidth: widthGraphPoint,
                    enableMouseTracking: false,
                    borderRadiusTopLeft: widthGraphPoint / 10,
                    borderRadiusTopRight: widthGraphPoint / 10,
                }
            },
            series: [
            {
                name: 'Выпл. дивиденды',
                borderColor: colorPaybackDividends,
                id: 'main',
                dataLabels: [{
                    enabled: true,
                    inside: true,
                    useHTML: true,
                    verticalAlign: "bottom",
                    style: {
                        ...labelsStyle,
                        color: "#24252E",
                    },
                    formatter: function(e) {
                        return data[this.x][1] + "$";
                    }
                }],
                data: getData(data).slice(),
            }],
            exporting: {
                allowHTML: true
            }
        });
    }
}

initGrowthPaymentsGraph()