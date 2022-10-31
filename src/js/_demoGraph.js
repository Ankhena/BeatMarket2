function initDemoGraph() {
    const graphs = ["demoGraph-1", "demoGraph-2", "demoGraph-3", "demoGraph-4", "demoGraph-5", "demoGraph-6"];

    const myRenderGraphCategories = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const myRenderShowYLine = true; // если нужен показ верт. линий в графе, ставим true

    graphs.forEach(item => {
        let myRenderGraph = document.querySelector(`#${item}`);

        if (myRenderGraph !== null) {
            Highcharts.chart(item, {
                chart: {
                    type: "spline",
                    style: { "fontFamily": "" },
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false,
    
                    useHTML: true,
                    align: "left",
                    verticalAlign: "top",
                    itemStyle: {"fontSize": "0.85rem", "fontWeight": "400", "paddingLeft": "0.5rem"},
                    x: -8,
                    margin: 35,
                    symbolWidth: 0,
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
                        name: 'VIAC',
                        marker: {
                            symbol: 'circle'
                        },
                        data: [1500, 2100, 3500, 5500, 4200, 6500, 7200],
                        color: "#3E54D8"
                    }
            
                ]
            });
        
            if (myRenderShowYLine) {
                let renderChartWidth = +document.querySelector(`#${item} .highcharts-plot-background`).getAttributeNode("width").value;
                let renderChartOffsetX = (renderChartWidth / myRenderGraphCategories.length) / 2;
            
                document.querySelectorAll(`#${item} .highcharts-xaxis-grid .highcharts-grid-line`).forEach(item => {
                    item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
                });
            }
            
        }
    });
    
}

initDemoGraph();