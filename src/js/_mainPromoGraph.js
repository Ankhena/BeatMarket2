function mainPromoGraph() {

    const banchGraphData = { // общие данные для промо графика (линейного и столбчатого)
        names: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        plots: [
            {
                name: 'Портфель',
                marker: {
                    symbol: 'circle'
                },
                data: [32.56, 4.44, 6.18, -10.22, 10.23, 12.22, 32.56],
                color: "#3E54D8"
            },
            {
                name: 'S&P 500',
                marker: {
                    symbol: 'circle'
                },
                data: [-12.22, 5.12, -5.22, -7.22, 16.23, -12.22, 18.56],
                color: "#DE4355"
            },
            {
                name: 'Советник',
                marker: {
                    symbol: 'circle'
                },
                data: [5.12, -7.22, -12.22, -5.15, 2.77, 4.18, 15.22],
                color: "#199F27"
            }
        ]
    }

    // ЛИНЕЙНЫЙ ГРАФИК

    function fillLinearGraphInfo(name, id) {
        let sum = banchGraphData.plots[id].data.reduce((item, accum) => item + accum).toFixed(2);
        let className = sum > 0 ? "success" : "error";
        return `${name} <span class="legendPercent ${className}">${sum}%</span>`
    }

    function renderLinearGraph(graphName, renderShowYLine) { // params: [string: id графика линейного, boolean: рисовать верт. линии]
        let myRenderGraph = document.querySelector(`#${graphName}`);

        if (myRenderGraph !== null) {
            Highcharts.chart(graphName, {
                chart: {
                    type: 'spline',
                    style: { "fontFamily": "Montserrat" },
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    verticalAlign: 'top',
                    align: 'left',
                    useHTML: true,
                    symbolWidth: 6,
                    itemDistance: 35,
                    itemMarginBottom: 20,
                    itemMarginTop: 10,
                    width: "80%",
                    labelFormatter: function () {
                        //console.log(this);
                        return fillLinearGraphInfo(this.name, this.index);
                        //return `<div class="asdsad">${this.name} ${this.index} (click to hide)</div>`;
                    }
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: banchGraphData.names,
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
                            return (this.value / 1) + '%';
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
                    valueSuffix: '%'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 5,
                            lineColor: 'transparent',
                            lineWidth: 2
                        }
                    }
                },
                series: banchGraphData.plots
            });
        
            if (renderShowYLine) {
                let renderChartWidth = +document.querySelector(`#${graphName} .highcharts-plot-background`).getAttributeNode("width").value;
                let renderChartOffsetX = (renderChartWidth / banchGraphData.names.length) / 2;
            
                document.querySelectorAll(`#${graphName} .highcharts-xaxis-grid .highcharts-grid-line`).forEach(item => {
                    item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
                });
            }
    
            banchGraphData.plots.forEach((item, id) => {
                let elem = myRenderGraph.querySelector(`.highcharts-series-${id}`);
                elem.setAttribute("style", `-webkit-filter: drop-shadow(0px 2px 2px ${item.color});`);
            });
            
        }
    }

    renderLinearGraph("mainPromoGraph", true);

    ///////////////////////////////


    // СТОЛБЧАТЫЙ ГРАФИК

    let graphBarWidth = 80;
    let graphBarSizeCoef = (graphBarWidth / (banchGraphData.plots.length * 1.6));
    let graphBarContent = document.querySelector(".promoGraphArea__graphBar .banchGraph-content");

    if (graphBarContent === null) {
        return false;
    }

    function fillDescrItems() {
        const items = document.querySelector(".promoGraphArea__graphBar .banchGraph-descr-items");

        banchGraphData.plots.forEach(item => {
            let elem = document.createElement("span");
            elem.classList.add("banchGraph-descr-items-item");
            elem.innerHTML = item.name;
            elem.style.setProperty('--background_label', item.color);
            items.appendChild(elem);
        });
    }

    function fillDescrSummaryContent() {
        const content = document.querySelector(".promoGraphArea__graphBar .banchGraph-descr-summary-content");

        banchGraphData.plots.forEach(item => {
            let elem = document.createElement("span");
            let summary = item.data.reduce((accum, value) => accum + value).toFixed(2);
            elem.innerHTML = summary + "%";
            elem.classList.add(summary > 0 ? "success" : "error");
            elem.style.setProperty('--background_label', item.color);
            content.appendChild(elem);
        });
    }

    function getAbsBanchData() {
        let absValues = [];
        banchGraphData.plots.forEach(item => {
            absValues.push(Math.abs(...item.data));
        });
        return Math.max(...absValues);
    }

    function getSeries(id) {
        let data = [];
        banchGraphData.plots.forEach(item => {
            data.push({
                name: item.name,
                data: [item.data[id]],
                color: item.color,
                borderRadiusTopLeft: item.data[id] > 0 ? (graphBarSizeCoef / 6) : 0,
                borderRadiusTopRight: item.data[id] > 0 ? (graphBarSizeCoef / 6) : 0,
                borderRadiusBottomLeft: item.data[id] < 0 ? (graphBarSizeCoef / 6) : 0,
                borderRadiusBottomRight: item.data[id] < 0 ? (graphBarSizeCoef / 6) : 0,
            });
        });
        return data;
    }

    function renderBanchHTML(id) {
        let item = document.createElement("div");
        item.classList.add("banchGraph-content-item");

        let itemGraph = document.createElement("div");
        itemGraph.classList.add("banchGraph-content-item-graph");
        itemGraph.setAttribute("id", "banchGraphModernBar-" + id)

        // date

        let itemDate = document.createElement("div");
        itemDate.classList.add("banchGraph-content-item-date");

        let itemDateSpan = document.createElement("span");
        itemDateSpan.innerHTML = banchGraphData.names[id];
        itemDate.appendChild(itemDateSpan);

        // /date

        // stat

        let itemStat = document.createElement("div");
        itemStat.classList.add("banchGraph-content-item-stat");

        banchGraphData.plots.forEach(elem => {
            let itemStatSpan = document.createElement("span");
            itemStatSpan.innerHTML = elem.data[id] + "%";

            if (elem.data[id] > 0) {
                itemStatSpan.classList.add("success");
            }
            if (elem.data[id] < 0) {
                itemStatSpan.classList.add("error");
            }

            itemStat.appendChild(itemStatSpan);
        });

        // /stat

        item.appendChild(itemGraph);
        item.appendChild(itemDate);
        item.appendChild(itemStat);

        graphBarContent.appendChild(item);
    }

    function renderBanchGraph(id) {
        Highcharts.chart('banchGraphModernBar-' + id, {
            chart: {
                type: 'column',
                borderRadius: 6
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [banchGraphData.names[id]],
                labels: {
                    enabled: false
                },
                lineWidth: 0
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: false
                },
                title: {
                    enabled: false
                },
                min: -1 * getAbsBanchData(),
                max: getAbsBanchData()

            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointWidth: graphBarSizeCoef,
                    groupPadding: 0,
                    borderWidth: 0,
                    enableMouseTracking: false,
                }
            },
            series: getSeries(id)
        });
    }

    fillDescrSummaryContent()
    fillDescrItems()

    banchGraphData.names.forEach((elem, i) => {
        renderBanchHTML(i);
        renderBanchGraph(i);
    });

    //////////////////////
    
}

mainPromoGraph();
