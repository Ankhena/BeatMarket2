const myRenderGraph = document.querySelector("#stategyPromoChart");
const myRenderGraphCategories = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const myRenderShowYLine = true; // если нужен показ верт. линий в графе, ставим true

if (myRenderGraph !== null) {
    Highcharts.chart('stategyPromoChart', {
        chart: {
            type: 'spline',
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
        xAxis: {
            categories: myRenderGraphCategories,
            labels: {
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            gridLineWidth: (myRenderShowYLine ? 1 : 0)
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value / 1000) + 'к';
                },
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true,
            valueSuffix: '$'
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: 'transparent',
                    lineWidth: 1
                }
            }
        },
        series: [
    
            {
                name: 'Портфель',
                marker: {
                    symbol: 'circle'
                },
                data: [1500, 2100, 3500, 5500, 4200, 6500, 7200],
                color: "#3E54D8"
            },
            {
                name: 'S&P 500',
                marker: {
                    symbol: 'circle'
                },
                data: [2200, 2300, 5200, 3700, 4000, 7800, 3800],
                color: "#DE4355"
            },
            {
                name: 'Советник',
                marker: {
                    symbol: 'circle'
                },
                data: [4200, 3300, 1200, 7700, 2000, 5800, 1800],
                color: "#199F27"
            }
    
        ]
    });

    if (myRenderShowYLine) {
        let renderChartWidth = +document.querySelector(".stategyPromo-graph-chart .highcharts-plot-background").getAttributeNode("width").value;
        let renderChartOffsetX = (renderChartWidth / myRenderGraphCategories.length) / 2;
    
        document.querySelectorAll(".stategyPromo-graph-chart .highcharts-xaxis-grid .highcharts-grid-line").forEach(item => {
            item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
        });
    }
    
}